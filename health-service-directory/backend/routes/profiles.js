const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

// @route   GET /api/profiles/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT id, email, full_name, role, phone, specialty, bio, 
              created_at, updated_at
       FROM users 
       WHERE id = ?`,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    
    // Add additional profile data based on user role
    if (user.role === 'doctor') {
      const [stats] = await db.query(
        `SELECT 
          (SELECT COUNT(*) FROM appointments WHERE doctor_id = ?) as total_appointments,
          (SELECT COUNT(*) FROM appointments WHERE doctor_id = ? AND status = 'completed') as completed_appointments`,
        [user.id, user.id]
      );
      
      user.stats = stats[0];
    } else if (user.role === 'patient') {
      const [stats] = await db.query(
        `SELECT 
          (SELECT COUNT(*) FROM appointments WHERE patient_id = ?) as total_appointments,
          (SELECT COUNT(*) FROM appointments WHERE patient_id = ? AND status = 'upcoming') as upcoming_appointments`,
        [user.id, user.id]
      );
      
      user.stats = stats[0];
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/profiles/me
// @desc    Update current user's profile
// @access  Private
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { full_name, phone, bio, currentPassword, newPassword } = req.body;
    
    // Start a transaction
    await db.query('START TRANSACTION');
    
    try {
      // Update password if currentPassword and newPassword are provided
      if (currentPassword && newPassword) {
        // Verify current password
        const [users] = await db.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
        
        if (users.length === 0) {
          await db.query('ROLLBACK');
          return res.status(404).json({ message: 'User not found' });
        }
        
        const user = users[0];
        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        
        if (!isMatch) {
          await db.query('ROLLBACK');
          return res.status(400).json({ message: 'Current password is incorrect' });
        }
        
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, req.user.id]);
      }
      
      // Update profile information
      const updateFields = [];
      const updateValues = [];
      
      if (full_name !== undefined) {
        updateFields.push('full_name = ?');
        updateValues.push(full_name);
      }
      if (phone !== undefined) {
        updateFields.push('phone = ?');
        updateValues.push(phone);
      }
      if (bio !== undefined) {
        updateFields.push('bio = ?');
        updateValues.push(bio);
      }
      
      if (updateFields.length > 0) {
        updateValues.push(req.user.id);
        await db.query(
          `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
          updateValues
        );
      }
      
      await db.query('COMMIT');
      
      // Get the updated profile
      const [users] = await db.query(
        `SELECT id, email, full_name, role, phone, specialty, bio, 
                created_at, updated_at
         FROM users 
         WHERE id = ?`,
        [req.user.id]
      );
      
      res.json(users[0]);
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/profiles/me/appointments
// @desc    Get current user's appointments
// @access  Private
router.get('/me/appointments', authenticateToken, async (req, res) => {
  try {
    let query = '';
    let params = [];
    
    if (req.user.role === 'doctor') {
      query = `
        SELECT a.*, p.full_name as patient_name, p.phone as patient_phone
        FROM appointments a
        JOIN users p ON a.patient_id = p.id
        WHERE a.doctor_id = ?
        ORDER BY a.date DESC, a.time DESC
      `;
      params = [req.user.id];
    } else {
      // For patients
      query = `
        SELECT a.*, d.full_name as doctor_name, d.specialty, d.phone as doctor_phone
        FROM appointments a
        JOIN users d ON a.doctor_id = d.id
        WHERE a.patient_id = ?
        ORDER BY a.date DESC, a.time DESC
      `;
      params = [req.user.id];
    }
    
    const [appointments] = await db.query(query, params);
    res.json(appointments);
  } catch (error) {
    console.error('Get user appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
