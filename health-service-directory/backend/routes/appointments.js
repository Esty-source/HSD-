const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all appointments for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      let appointments;
      
      if (req.user.role === 'patient') {
        // Get appointments for patient
        [appointments] = await connection.execute(`
          SELECT 
            a.*, 
            d.specialty, d.consultation_fee,
            p.name as patient_name, p.phone as patient_phone,
            dp.name as doctor_name, dp.phone as doctor_phone
          FROM appointments a
          JOIN patients pat ON a.patient_id = pat.id
          JOIN doctors d ON a.doctor_id = d.id
          JOIN profiles p ON pat.user_id = p.user_id
          JOIN profiles dp ON d.user_id = dp.user_id
          WHERE pat.user_id = ?
          ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `, [req.user.id]);
      } else if (req.user.role === 'doctor') {
        // Get appointments for doctor
        [appointments] = await connection.execute(`
          SELECT 
            a.*, 
            d.specialty, d.consultation_fee,
            p.name as patient_name, p.phone as patient_phone,
            dp.name as doctor_name, dp.phone as doctor_phone
          FROM appointments a
          JOIN patients pat ON a.patient_id = pat.id
          JOIN doctors d ON a.doctor_id = d.id
          JOIN profiles p ON pat.user_id = p.user_id
          JOIN profiles dp ON d.user_id = dp.user_id
          WHERE d.user_id = ?
          ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `, [req.user.id]);
      } else {
        // Admin - get all appointments
        [appointments] = await connection.execute(`
          SELECT 
            a.*, 
            d.specialty, d.consultation_fee,
            p.name as patient_name, p.phone as patient_phone,
            dp.name as doctor_name, dp.phone as doctor_phone
          FROM appointments a
          JOIN patients pat ON a.patient_id = pat.id
          JOIN doctors d ON a.doctor_id = d.id
          JOIN profiles p ON pat.user_id = p.user_id
          JOIN profiles dp ON d.user_id = dp.user_id
          ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `);
      }

      res.json({ appointments });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: 'Failed to get appointments' });
  }
});

// Create new appointment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { doctor_id, appointment_date, appointment_time, duration = 30, type = 'in-person', reason } = req.body;

    if (!doctor_id || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'Doctor ID, appointment date, and time are required' });
    }

    const connection = await pool.getConnection();

    try {
      // Get patient ID for current user
      const [patients] = await connection.execute(
        'SELECT id FROM patients WHERE user_id = ?',
        [req.user.id]
      );

      if (patients.length === 0) {
        return res.status(400).json({ error: 'Patient profile not found' });
      }

      const patient_id = patients[0].id;

      // Check if doctor exists and is available
      const [doctors] = await connection.execute(
        'SELECT id, is_available FROM doctors WHERE id = ?',
        [doctor_id]
      );

      if (doctors.length === 0) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      if (!doctors[0].is_available) {
        return res.status(400).json({ error: 'Doctor is not available' });
      }

      // Check for scheduling conflicts
      const [conflicts] = await connection.execute(`
        SELECT id FROM appointments 
        WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND status != 'cancelled'
      `, [doctor_id, appointment_date, appointment_time]);

      if (conflicts.length > 0) {
        return res.status(400).json({ error: 'Time slot is already booked' });
      }

      // Create appointment
      const appointment_id = uuidv4();
      await connection.execute(`
        INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, appointment_time, duration, type, reason)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [appointment_id, patient_id, doctor_id, appointment_date, appointment_time, duration, type, reason]);

      res.status(201).json({ 
        message: 'Appointment created successfully',
        appointment_id 
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Update appointment status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const connection = await pool.getConnection();

    try {
      // Check if user has permission to update this appointment
      let appointment;
      if (req.user.role === 'patient') {
        [appointment] = await connection.execute(`
          SELECT a.id FROM appointments a
          JOIN patients p ON a.patient_id = p.id
          WHERE a.id = ? AND p.user_id = ?
        `, [id, req.user.id]);
      } else if (req.user.role === 'doctor') {
        [appointment] = await connection.execute(`
          SELECT a.id FROM appointments a
          JOIN doctors d ON a.doctor_id = d.id
          WHERE a.id = ? AND d.user_id = ?
        `, [id, req.user.id]);
      } else {
        // Admin can update any appointment
        [appointment] = await connection.execute(
          'SELECT id FROM appointments WHERE id = ?',
          [id]
        );
      }

      if (appointment.length === 0) {
        return res.status(404).json({ error: 'Appointment not found or access denied' });
      }

      // Update status
      await connection.execute(
        'UPDATE appointments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [status, id]
      );

      res.json({ message: 'Appointment status updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update appointment status error:', error);
    res.status(500).json({ error: 'Failed to update appointment status' });
  }
});

// Delete appointment
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      // Check if user has permission to delete this appointment
      let appointment;
      if (req.user.role === 'patient') {
        [appointment] = await connection.execute(`
          SELECT a.id FROM appointments a
          JOIN patients p ON a.patient_id = p.id
          WHERE a.id = ? AND p.user_id = ?
        `, [id, req.user.id]);
      } else if (req.user.role === 'doctor') {
        [appointment] = await connection.execute(`
          SELECT a.id FROM appointments a
          JOIN doctors d ON a.doctor_id = d.id
          WHERE a.id = ? AND d.user_id = ?
        `, [id, req.user.id]);
      } else {
        // Admin can delete any appointment
        [appointment] = await connection.execute(
          'SELECT id FROM appointments WHERE id = ?',
          [id]
        );
      }

      if (appointment.length === 0) {
        return res.status(404).json({ error: 'Appointment not found or access denied' });
      }

      // Delete appointment
      await connection.execute('DELETE FROM appointments WHERE id = ?', [id]);

      res.json({ message: 'Appointment deleted successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

module.exports = router; 