const express = require('express');
const { pool } = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [users] = await connection.execute(`
        SELECT 
          u.id, u.email, u.role, u.is_active, u.email_verified, u.created_at,
          p.name, p.phone, p.gender
        FROM users u
        LEFT JOIN profiles p ON u.id = p.user_id
        ORDER BY u.created_at DESC
      `);

      res.json({ users });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Get user by ID (admin only)
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      const [users] = await connection.execute(`
        SELECT 
          u.id, u.email, u.role, u.is_active, u.email_verified, u.created_at,
          p.name, p.phone, p.address, p.date_of_birth, p.gender, p.profile_image
        FROM users u
        LEFT JOIN profiles p ON u.id = p.user_id
        WHERE u.id = ?
      `, [id]);

      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = users[0];

      // Get role-specific data
      let roleData = {};
      if (user.role === 'doctor') {
        const [doctors] = await connection.execute(
          'SELECT * FROM doctors WHERE user_id = ?',
          [user.id]
        );
        if (doctors.length > 0) {
          roleData = doctors[0];
        }
      } else if (user.role === 'patient') {
        const [patients] = await connection.execute(
          'SELECT * FROM patients WHERE user_id = ?',
          [user.id]
        );
        if (patients.length > 0) {
          roleData = patients[0];
        }
      }

      res.json({
        user: {
          ...user,
          roleData
        }
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Update user status (admin only)
router.put('/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const connection = await pool.getConnection();

    try {
      await connection.execute(
        'UPDATE users SET is_active = ? WHERE id = ?',
        [is_active, id]
      );

      res.json({ message: 'User status updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ error: 'Failed to update user status' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      // Check if user exists
      const [users] = await connection.execute(
        'SELECT id FROM users WHERE id = ?',
        [id]
      );

      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Delete user (cascade will handle related records)
      await connection.execute('DELETE FROM users WHERE id = ?', [id]);

      res.json({ message: 'User deleted successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router; 