const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get telemedicine sessions for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      let sessions = [];

      if (req.user.role === 'doctor') {
        // Get doctor's telemedicine sessions
        const [doctors] = await connection.execute(
          'SELECT id FROM doctors WHERE user_id = ?',
          [req.user.id]
        );

        if (doctors.length > 0) {
          const doctor_id = doctors[0].id;
          [sessions] = await connection.execute(`
            SELECT ts.*, a.appointment_date, a.appointment_time, a.reason,
                   p.name as patient_name, p.email as patient_email
            FROM telemedicine_sessions ts
            LEFT JOIN appointments a ON ts.appointment_id = a.id
            LEFT JOIN patients p ON a.patient_id = p.id
            LEFT JOIN profiles pp ON p.user_id = pp.user_id
            WHERE a.doctor_id = ?
            ORDER BY ts.created_at DESC
          `, [doctor_id]);
        }
      } else if (req.user.role === 'patient') {
        // Get patient's telemedicine sessions
        const [patients] = await connection.execute(
          'SELECT id FROM patients WHERE user_id = ?',
          [req.user.id]
        );

        if (patients.length > 0) {
          const patient_id = patients[0].id;
          [sessions] = await connection.execute(`
            SELECT ts.*, a.appointment_date, a.appointment_time, a.reason,
                   d.name as doctor_name, d.specialty as doctor_specialty
            FROM telemedicine_sessions ts
            LEFT JOIN appointments a ON ts.appointment_id = a.id
            LEFT JOIN doctors d ON a.doctor_id = d.id
            LEFT JOIN profiles dp ON d.user_id = dp.user_id
            WHERE a.patient_id = ?
            ORDER BY ts.created_at DESC
          `, [patient_id]);
        }
      }

      res.json({ sessions });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get telemedicine sessions error:', error);
    res.status(500).json({ error: 'Failed to get telemedicine sessions' });
  }
});

// Create telemedicine session
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { appointment_id, session_url, session_id, start_time, duration_minutes } = req.body;

    if (!appointment_id) {
      return res.status(400).json({ error: 'Appointment ID is required' });
    }

    const connection = await pool.getConnection();

    try {
      // Check if appointment exists and user has access
      let appointmentQuery = '';
      let appointmentParams = [appointment_id];

      if (req.user.role === 'doctor') {
        const [doctors] = await connection.execute(
          'SELECT id FROM doctors WHERE user_id = ?',
          [req.user.id]
        );
        if (doctors.length > 0) {
          appointmentQuery = 'AND doctor_id = ?';
          appointmentParams.push(doctors[0].id);
        }
      } else if (req.user.role === 'patient') {
        const [patients] = await connection.execute(
          'SELECT id FROM patients WHERE user_id = ?',
          [req.user.id]
        );
        if (patients.length > 0) {
          appointmentQuery = 'AND patient_id = ?';
          appointmentParams.push(patients[0].id);
        }
      }

      const [appointments] = await connection.execute(
        `SELECT id FROM appointments WHERE id = ? ${appointmentQuery}`,
        appointmentParams
      );

      if (appointments.length === 0) {
        return res.status(404).json({ error: 'Appointment not found or access denied' });
      }

      // Check if session already exists
      const [existingSessions] = await connection.execute(
        'SELECT id FROM telemedicine_sessions WHERE appointment_id = ?',
        [appointment_id]
      );

      if (existingSessions.length > 0) {
        return res.status(400).json({ error: 'Telemedicine session already exists for this appointment' });
      }

      // Create telemedicine session
      const session_id_db = uuidv4();
      await connection.execute(`
        INSERT INTO telemedicine_sessions (
          id, appointment_id, session_url, session_id, start_time, duration_minutes
        ) VALUES (?, ?, ?, ?, ?, ?)
      `, [session_id_db, appointment_id, session_url, session_id, start_time, duration_minutes]);

      res.status(201).json({
        message: 'Telemedicine session created successfully',
        session_id: session_id_db
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Create telemedicine session error:', error);
    res.status(500).json({ error: 'Failed to create telemedicine session' });
  }
});

// Update telemedicine session
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, end_time, notes } = req.body;

    const connection = await pool.getConnection();

    try {
      // Check if session exists and user has access
      let sessionQuery = '';
      let sessionParams = [id];

      if (req.user.role === 'doctor') {
        const [doctors] = await connection.execute(
          'SELECT id FROM doctors WHERE user_id = ?',
          [req.user.id]
        );
        if (doctors.length > 0) {
          sessionQuery = `
            AND ts.appointment_id IN (
              SELECT id FROM appointments WHERE doctor_id = ?
            )
          `;
          sessionParams.push(doctors[0].id);
        }
      } else if (req.user.role === 'patient') {
        const [patients] = await connection.execute(
          'SELECT id FROM patients WHERE user_id = ?',
          [req.user.id]
        );
        if (patients.length > 0) {
          sessionQuery = `
            AND ts.appointment_id IN (
              SELECT id FROM appointments WHERE patient_id = ?
            )
          `;
          sessionParams.push(patients[0].id);
        }
      }

      const [sessions] = await connection.execute(
        `SELECT ts.id FROM telemedicine_sessions ts WHERE ts.id = ? ${sessionQuery}`,
        sessionParams
      );

      if (sessions.length === 0) {
        return res.status(404).json({ error: 'Telemedicine session not found or access denied' });
      }

      // Update session
      await connection.execute(`
        UPDATE telemedicine_sessions 
        SET status = ?, end_time = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [status, end_time, notes, id]);

      res.json({ message: 'Telemedicine session updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update telemedicine session error:', error);
    res.status(500).json({ error: 'Failed to update telemedicine session' });
  }
});

// Get telemedicine session by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      // Check if session exists and user has access
      let sessionQuery = '';
      let sessionParams = [id];

      if (req.user.role === 'doctor') {
        const [doctors] = await connection.execute(
          'SELECT id FROM doctors WHERE user_id = ?',
          [req.user.id]
        );
        if (doctors.length > 0) {
          sessionQuery = `
            AND ts.appointment_id IN (
              SELECT id FROM appointments WHERE doctor_id = ?
            )
          `;
          sessionParams.push(doctors[0].id);
        }
      } else if (req.user.role === 'patient') {
        const [patients] = await connection.execute(
          'SELECT id FROM patients WHERE user_id = ?',
          [req.user.id]
        );
        if (patients.length > 0) {
          sessionQuery = `
            AND ts.appointment_id IN (
              SELECT id FROM appointments WHERE patient_id = ?
            )
          `;
          sessionParams.push(patients[0].id);
        }
      }

      const [sessions] = await connection.execute(`
        SELECT ts.*, a.appointment_date, a.appointment_time, a.reason,
               p.name as patient_name, p.email as patient_email,
               d.name as doctor_name, d.specialty as doctor_specialty
        FROM telemedicine_sessions ts
        LEFT JOIN appointments a ON ts.appointment_id = a.id
        LEFT JOIN patients p ON a.patient_id = p.id
        LEFT JOIN doctors d ON a.doctor_id = d.id
        LEFT JOIN profiles pp ON p.user_id = pp.user_id
        LEFT JOIN profiles dp ON d.user_id = dp.user_id
        WHERE ts.id = ? ${sessionQuery}
      `, sessionParams);

      if (sessions.length === 0) {
        return res.status(404).json({ error: 'Telemedicine session not found or access denied' });
      }

      res.json({ session: sessions[0] });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get telemedicine session error:', error);
    res.status(500).json({ error: 'Failed to get telemedicine session' });
  }
});

// Delete telemedicine session
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      // Check if session exists and user has access (admin or doctor only)
      if (req.user.role !== 'admin' && req.user.role !== 'doctor') {
        return res.status(403).json({ error: 'Access denied' });
      }

      let sessionQuery = '';
      let sessionParams = [id];

      if (req.user.role === 'doctor') {
        const [doctors] = await connection.execute(
          'SELECT id FROM doctors WHERE user_id = ?',
          [req.user.id]
        );
        if (doctors.length > 0) {
          sessionQuery = `
            AND appointment_id IN (
              SELECT id FROM appointments WHERE doctor_id = ?
            )
          `;
          sessionParams.push(doctors[0].id);
        }
      }

      const [sessions] = await connection.execute(
        `SELECT id FROM telemedicine_sessions WHERE id = ? ${sessionQuery}`,
        sessionParams
      );

      if (sessions.length === 0) {
        return res.status(404).json({ error: 'Telemedicine session not found or access denied' });
      }

      // Delete session
      await connection.execute('DELETE FROM telemedicine_sessions WHERE id = ?', [id]);

      res.json({ message: 'Telemedicine session deleted successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Delete telemedicine session error:', error);
    res.status(500).json({ error: 'Failed to delete telemedicine session' });
  }
});

module.exports = router; 