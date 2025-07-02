const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get medical records for current user or patient
router.get('/', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      let records;
      
      if (req.user.role === 'patient') {
        // Get records for current patient
        [records] = await connection.execute(`
          SELECT 
            mr.*, 
            p.name as patient_name,
            d.specialty,
            dp.name as doctor_name
          FROM medical_records mr
          JOIN patients pat ON mr.patient_id = pat.id
          JOIN doctors d ON mr.doctor_id = d.id
          JOIN profiles p ON pat.user_id = p.user_id
          JOIN profiles dp ON d.user_id = dp.user_id
          WHERE pat.user_id = ?
          ORDER BY mr.record_date DESC
        `, [req.user.id]);
      } else if (req.user.role === 'doctor') {
        // Get records created by current doctor
        [records] = await connection.execute(`
          SELECT 
            mr.*, 
            p.name as patient_name,
            d.specialty,
            dp.name as doctor_name
          FROM medical_records mr
          JOIN patients pat ON mr.patient_id = pat.id
          JOIN doctors d ON mr.doctor_id = d.id
          JOIN profiles p ON pat.user_id = p.user_id
          JOIN profiles dp ON d.user_id = dp.user_id
          WHERE d.user_id = ?
          ORDER BY mr.record_date DESC
        `, [req.user.id]);
      } else {
        // Admin - get all records
        [records] = await connection.execute(`
          SELECT 
            mr.*, 
            p.name as patient_name,
            d.specialty,
            dp.name as doctor_name
          FROM medical_records mr
          JOIN patients pat ON mr.patient_id = pat.id
          JOIN doctors d ON mr.doctor_id = d.id
          JOIN profiles p ON pat.user_id = p.user_id
          JOIN profiles dp ON d.user_id = dp.user_id
          ORDER BY mr.record_date DESC
        `);
      }

      res.json({ records });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get medical records error:', error);
    res.status(500).json({ error: 'Failed to get medical records' });
  }
});

// Create new medical record (doctor only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { patient_id, record_type, title, description, record_date } = req.body;

    if (!patient_id || !record_type || !title || !record_date) {
      return res.status(400).json({ error: 'Patient ID, record type, title, and date are required' });
    }

    const connection = await pool.getConnection();

    try {
      // Get doctor ID for current user
      const [doctors] = await connection.execute(
        'SELECT id FROM doctors WHERE user_id = ?',
        [req.user.id]
      );

      if (doctors.length === 0) {
        return res.status(400).json({ error: 'Doctor profile not found' });
      }

      const doctor_id = doctors[0].id;

      // Check if patient exists
      const [patients] = await connection.execute(
        'SELECT id FROM patients WHERE id = ?',
        [patient_id]
      );

      if (patients.length === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      // Create medical record
      const record_id = uuidv4();
      await connection.execute(`
        INSERT INTO medical_records (id, patient_id, doctor_id, record_type, title, description, record_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [record_id, patient_id, doctor_id, record_type, title, description, record_date]);

      res.status(201).json({ 
        message: 'Medical record created successfully',
        record_id 
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Create medical record error:', error);
    res.status(500).json({ error: 'Failed to create medical record' });
  }
});

// Update medical record
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, record_date } = req.body;

    const connection = await pool.getConnection();

    try {
      // Check if user has permission to update this record
      let record;
      if (req.user.role === 'doctor') {
        [record] = await connection.execute(`
          SELECT mr.id FROM medical_records mr
          JOIN doctors d ON mr.doctor_id = d.id
          WHERE mr.id = ? AND d.user_id = ?
        `, [id, req.user.id]);
      } else {
        // Admin can update any record
        [record] = await connection.execute(
          'SELECT id FROM medical_records WHERE id = ?',
          [id]
        );
      }

      if (record.length === 0) {
        return res.status(404).json({ error: 'Medical record not found or access denied' });
      }

      // Update record
      await connection.execute(`
        UPDATE medical_records 
        SET title = ?, description = ?, record_date = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [title, description, record_date, id]);

      res.json({ message: 'Medical record updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update medical record error:', error);
    res.status(500).json({ error: 'Failed to update medical record' });
  }
});

// Delete medical record
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      // Check if user has permission to delete this record
      let record;
      if (req.user.role === 'doctor') {
        [record] = await connection.execute(`
          SELECT mr.id FROM medical_records mr
          JOIN doctors d ON mr.doctor_id = d.id
          WHERE mr.id = ? AND d.user_id = ?
        `, [id, req.user.id]);
      } else {
        // Admin can delete any record
        [record] = await connection.execute(
          'SELECT id FROM medical_records WHERE id = ?',
          [id]
        );
      }

      if (record.length === 0) {
        return res.status(404).json({ error: 'Medical record not found or access denied' });
      }

      // Delete record
      await connection.execute('DELETE FROM medical_records WHERE id = ?', [id]);

      res.json({ message: 'Medical record deleted successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Delete medical record error:', error);
    res.status(500).json({ error: 'Failed to delete medical record' });
  }
});

module.exports = router; 