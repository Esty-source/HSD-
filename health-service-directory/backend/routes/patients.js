const express = require('express');
const { pool } = require('../config/database');
const { authenticateToken, requirePatient } = require('../middleware/auth');

const router = express.Router();

// Get all patients (admin/doctor only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [patients] = await connection.execute(`
        SELECT 
          p.id, p.blood_type, p.medical_history, p.allergies, p.emergency_contact,
          u.email, pr.name, pr.phone, pr.gender, pr.date_of_birth
        FROM patients p
        JOIN users u ON p.user_id = u.id
        JOIN profiles pr ON u.id = pr.user_id
        WHERE u.is_active = TRUE
        ORDER BY pr.name
      `);

      res.json({ patients });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ error: 'Failed to get patients' });
  }
});

// Get patient by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      const [patients] = await connection.execute(`
        SELECT 
          p.*, u.email, pr.name, pr.phone, pr.address, pr.gender, pr.date_of_birth, pr.profile_image
        FROM patients p
        JOIN users u ON p.user_id = u.id
        JOIN profiles pr ON u.id = pr.user_id
        WHERE p.id = ? AND u.is_active = TRUE
      `, [id]);

      if (patients.length === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      res.json({ patient: patients[0] });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({ error: 'Failed to get patient' });
  }
});

// Update patient profile (patient only)
router.put('/profile', authenticateToken, requirePatient, async (req, res) => {
  try {
    const { blood_type, medical_history, allergies, emergency_contact, insurance_info } = req.body;

    const connection = await pool.getConnection();

    try {
      await connection.execute(`
        UPDATE patients 
        SET blood_type = ?, medical_history = ?, allergies = ?, emergency_contact = ?, 
            insurance_info = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `, [blood_type, medical_history, allergies, emergency_contact, insurance_info, req.user.id]);

      res.json({ message: 'Patient profile updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update patient profile error:', error);
    res.status(500).json({ error: 'Failed to update patient profile' });
  }
});

module.exports = router; 