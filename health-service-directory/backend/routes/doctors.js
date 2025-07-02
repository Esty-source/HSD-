const express = require('express');
const { pool } = require('../config/database');
const { authenticateToken, requireDoctor } = require('../middleware/auth');

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [doctors] = await connection.execute(`
        SELECT 
          d.id, d.specialty, d.license_number, d.experience_years, d.consultation_fee, d.is_available,
          u.email, p.name, p.phone, p.gender, p.profile_image
        FROM doctors d
        JOIN users u ON d.user_id = u.id
        JOIN profiles p ON u.id = p.user_id
        WHERE u.is_active = TRUE
        ORDER BY p.name
      `);

      res.json({ doctors });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ error: 'Failed to get doctors' });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      const [doctors] = await connection.execute(`
        SELECT 
          d.*, u.email, p.name, p.phone, p.address, p.gender, p.profile_image
        FROM doctors d
        JOIN users u ON d.user_id = u.id
        JOIN profiles p ON u.id = p.user_id
        WHERE d.id = ? AND u.is_active = TRUE
      `, [id]);

      if (doctors.length === 0) {
        return res.status(404).json({ error: 'Doctor not found' });
      }

      res.json({ doctor: doctors[0] });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ error: 'Failed to get doctor' });
  }
});

// Update doctor profile (doctor only)
router.put('/profile', authenticateToken, requireDoctor, async (req, res) => {
  try {
    const { specialty, experience_years, education, certifications, consultation_fee, is_available } = req.body;

    const connection = await pool.getConnection();

    try {
      await connection.execute(`
        UPDATE doctors 
        SET specialty = ?, experience_years = ?, education = ?, certifications = ?, 
            consultation_fee = ?, is_available = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `, [specialty, experience_years, education, certifications, consultation_fee, is_available, req.user.id]);

      res.json({ message: 'Doctor profile updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update doctor profile error:', error);
    res.status(500).json({ error: 'Failed to update doctor profile' });
  }
});

module.exports = router; 