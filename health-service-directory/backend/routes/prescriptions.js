const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Get all prescriptions (admin only)
router.get('/', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [prescriptions] = await connection.execute(`
        SELECT p.*, 
               pt.name as patient_name, pt.email as patient_email,
               d.name as doctor_name, d.specialty as doctor_specialty,
               a.appointment_date, a.appointment_time
        FROM prescriptions p
        LEFT JOIN patients pt ON p.patient_id = pt.id
        LEFT JOIN doctors d ON p.doctor_id = d.id
        LEFT JOIN appointments a ON p.appointment_id = a.id
        LEFT JOIN profiles pp ON pt.user_id = pp.user_id
        LEFT JOIN profiles dp ON d.user_id = dp.user_id
        ORDER BY p.created_at DESC
      `);

      res.json({ prescriptions });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get prescriptions error:', error);
    res.status(500).json({ error: 'Failed to get prescriptions' });
  }
});

// Get prescriptions for current user (patient)
router.get('/my-prescriptions', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      // Get patient ID for current user
      const [patients] = await connection.execute(
        'SELECT id FROM patients WHERE user_id = ?',
        [req.user.id]
      );

      if (patients.length === 0) {
        return res.status(404).json({ error: 'Patient profile not found' });
      }

      const patient_id = patients[0].id;

      const [prescriptions] = await connection.execute(`
        SELECT p.*, 
               d.name as doctor_name, d.specialty as doctor_specialty,
               a.appointment_date, a.appointment_time
        FROM prescriptions p
        LEFT JOIN doctors d ON p.doctor_id = d.id
        LEFT JOIN appointments a ON p.appointment_id = a.id
        LEFT JOIN profiles dp ON d.user_id = dp.user_id
        WHERE p.patient_id = ?
        ORDER BY p.created_at DESC
      `, [patient_id]);

      res.json({ prescriptions });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get my prescriptions error:', error);
    res.status(500).json({ error: 'Failed to get prescriptions' });
  }
});

// Get prescriptions for doctor (doctor only)
router.get('/doctor-prescriptions', authenticateToken, authorizeRoles(['doctor']), async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      // Get doctor ID for current user
      const [doctors] = await connection.execute(
        'SELECT id FROM doctors WHERE user_id = ?',
        [req.user.id]
      );

      if (doctors.length === 0) {
        return res.status(404).json({ error: 'Doctor profile not found' });
      }

      const doctor_id = doctors[0].id;

      const [prescriptions] = await connection.execute(`
        SELECT p.*, 
               pt.name as patient_name, pt.email as patient_email,
               a.appointment_date, a.appointment_time
        FROM prescriptions p
        LEFT JOIN patients pt ON p.patient_id = pt.id
        LEFT JOIN appointments a ON p.appointment_id = a.id
        LEFT JOIN profiles pp ON pt.user_id = pp.user_id
        WHERE p.doctor_id = ?
        ORDER BY p.created_at DESC
      `, [doctor_id]);

      res.json({ prescriptions });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get doctor prescriptions error:', error);
    res.status(500).json({ error: 'Failed to get prescriptions' });
  }
});

// Get prescriptions for specific patient (doctor only)
router.get('/patient/:patientId', authenticateToken, authorizeRoles(['doctor']), async (req, res) => {
  try {
    const { patientId } = req.params;

    const connection = await pool.getConnection();

    try {
      // Get doctor ID for current user
      const [doctors] = await connection.execute(
        'SELECT id FROM doctors WHERE user_id = ?',
        [req.user.id]
      );

      if (doctors.length === 0) {
        return res.status(404).json({ error: 'Doctor profile not found' });
      }

      const doctor_id = doctors[0].id;

      const [prescriptions] = await connection.execute(`
        SELECT p.*, 
               pt.name as patient_name, pt.email as patient_email,
               a.appointment_date, a.appointment_time
        FROM prescriptions p
        LEFT JOIN patients pt ON p.patient_id = pt.id
        LEFT JOIN appointments a ON p.appointment_id = a.id
        LEFT JOIN profiles pp ON pt.user_id = pp.user_id
        WHERE p.patient_id = ? AND p.doctor_id = ?
        ORDER BY p.created_at DESC
      `, [patientId, doctor_id]);

      res.json({ prescriptions });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get patient prescriptions error:', error);
    res.status(500).json({ error: 'Failed to get prescriptions' });
  }
});

// Get prescription by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      let prescriptionQuery = '';
      let prescriptionParams = [id];

      if (req.user.role === 'doctor') {
        const [doctors] = await connection.execute(
          'SELECT id FROM doctors WHERE user_id = ?',
          [req.user.id]
        );
        if (doctors.length > 0) {
          prescriptionQuery = 'AND p.doctor_id = ?';
          prescriptionParams.push(doctors[0].id);
        }
      } else if (req.user.role === 'patient') {
        const [patients] = await connection.execute(
          'SELECT id FROM patients WHERE user_id = ?',
          [req.user.id]
        );
        if (patients.length > 0) {
          prescriptionQuery = 'AND p.patient_id = ?';
          prescriptionParams.push(patients[0].id);
        }
      }

      const [prescriptions] = await connection.execute(`
        SELECT p.*, 
               pt.name as patient_name, pt.email as patient_email,
               d.name as doctor_name, d.specialty as doctor_specialty,
               a.appointment_date, a.appointment_time
        FROM prescriptions p
        LEFT JOIN patients pt ON p.patient_id = pt.id
        LEFT JOIN doctors d ON p.doctor_id = d.id
        LEFT JOIN appointments a ON p.appointment_id = a.id
        LEFT JOIN profiles pp ON pt.user_id = pp.user_id
        LEFT JOIN profiles dp ON d.user_id = dp.user_id
        WHERE p.id = ? ${prescriptionQuery}
      `, prescriptionParams);

      if (prescriptions.length === 0) {
        return res.status(404).json({ error: 'Prescription not found or access denied' });
      }

      res.json({ prescription: prescriptions[0] });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get prescription error:', error);
    res.status(500).json({ error: 'Failed to get prescription' });
  }
});

// Create new prescription
router.post('/', authenticateToken, authorizeRoles(['doctor']), async (req, res) => {
  try {
    const { 
      patient_id, appointment_id, medications, dosage_instructions, 
      duration, notes, prescribed_date 
    } = req.body;

    if (!patient_id || !medications || !prescribed_date) {
      return res.status(400).json({ error: 'Patient ID, medications, and prescribed date are required' });
    }

    const connection = await pool.getConnection();

    try {
      // Get doctor ID for current user
      const [doctors] = await connection.execute(
        'SELECT id FROM doctors WHERE user_id = ?',
        [req.user.id]
      );

      if (doctors.length === 0) {
        return res.status(404).json({ error: 'Doctor profile not found' });
      }

      const doctor_id = doctors[0].id;

      // Create prescription
      const prescription_id = uuidv4();
      await connection.execute(`
        INSERT INTO prescriptions (
          id, patient_id, doctor_id, appointment_id, medications,
          dosage_instructions, duration, notes, prescribed_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        prescription_id, patient_id, doctor_id, appointment_id, 
        JSON.stringify(medications), dosage_instructions, duration, 
        notes, prescribed_date
      ]);

      res.status(201).json({
        message: 'Prescription created successfully',
        prescription_id
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Create prescription error:', error);
    res.status(500).json({ error: 'Failed to create prescription' });
  }
});

// Update prescription
router.put('/:id', authenticateToken, authorizeRoles(['doctor']), async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      medications, dosage_instructions, duration, notes, 
      prescribed_date, status, refills_remaining 
    } = req.body;

    const connection = await pool.getConnection();

    try {
      // Get doctor ID for current user
      const [doctors] = await connection.execute(
        'SELECT id FROM doctors WHERE user_id = ?',
        [req.user.id]
      );

      if (doctors.length === 0) {
        return res.status(404).json({ error: 'Doctor profile not found' });
      }

      const doctor_id = doctors[0].id;

      // Check if prescription belongs to current doctor
      const [prescriptions] = await connection.execute(
        'SELECT id FROM prescriptions WHERE id = ? AND doctor_id = ?',
        [id, doctor_id]
      );

      if (prescriptions.length === 0) {
        return res.status(404).json({ error: 'Prescription not found or access denied' });
      }

      // Update prescription
      await connection.execute(`
        UPDATE prescriptions 
        SET medications = ?, dosage_instructions = ?, duration = ?, 
            notes = ?, prescribed_date = ?, status = ?, refills_remaining = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
        JSON.stringify(medications), dosage_instructions, duration,
        notes, prescribed_date, status, refills_remaining, id
      ]);

      res.json({ message: 'Prescription updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update prescription error:', error);
    res.status(500).json({ error: 'Failed to update prescription' });
  }
});

// Update prescription status
router.put('/:id/status', authenticateToken, authorizeRoles(['doctor', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const connection = await pool.getConnection();

    try {
      let prescriptionQuery = '';
      let prescriptionParams = [id];

      if (req.user.role === 'doctor') {
        const [doctors] = await connection.execute(
          'SELECT id FROM doctors WHERE user_id = ?',
          [req.user.id]
        );
        if (doctors.length > 0) {
          prescriptionQuery = 'AND doctor_id = ?';
          prescriptionParams.push(doctors[0].id);
        }
      }

      const [prescriptions] = await connection.execute(
        `SELECT id FROM prescriptions WHERE id = ? ${prescriptionQuery}`,
        prescriptionParams
      );

      if (prescriptions.length === 0) {
        return res.status(404).json({ error: 'Prescription not found or access denied' });
      }

      // Update prescription status
      await connection.execute(`
        UPDATE prescriptions 
        SET status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [status, id]);

      res.json({ message: 'Prescription status updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update prescription status error:', error);
    res.status(500).json({ error: 'Failed to update prescription status' });
  }
});

// Delete prescription
router.delete('/:id', authenticateToken, authorizeRoles(['doctor', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      let prescriptionQuery = '';
      let prescriptionParams = [id];

      if (req.user.role === 'doctor') {
        const [doctors] = await connection.execute(
          'SELECT id FROM doctors WHERE user_id = ?',
          [req.user.id]
        );
        if (doctors.length > 0) {
          prescriptionQuery = 'AND doctor_id = ?';
          prescriptionParams.push(doctors[0].id);
        }
      }

      const [prescriptions] = await connection.execute(
        `SELECT id FROM prescriptions WHERE id = ? ${prescriptionQuery}`,
        prescriptionParams
      );

      if (prescriptions.length === 0) {
        return res.status(404).json({ error: 'Prescription not found or access denied' });
      }

      // Delete prescription
      await connection.execute('DELETE FROM prescriptions WHERE id = ?', [id]);

      res.json({ message: 'Prescription deleted successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Delete prescription error:', error);
    res.status(500).json({ error: 'Failed to delete prescription' });
  }
});

module.exports = router; 