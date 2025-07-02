const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role = 'patient', phone, address, dateOfBirth, gender } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    if (!['patient', 'doctor'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be patient or doctor' });
    }

    const connection = await pool.getConnection();

    try {
      // Check if email already exists
      const [existingUsers] = await connection.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const userId = uuidv4();
      await connection.execute(
        'INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)',
        [userId, email, hashedPassword, role]
      );

      // Create profile
      const profileId = uuidv4();
      await connection.execute(
        'INSERT INTO profiles (id, user_id, name, phone, address, date_of_birth, gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [profileId, userId, name, phone || null, address || null, dateOfBirth || null, gender || null]
      );

      // Create role-specific record
      if (role === 'doctor') {
        const doctorId = uuidv4();
        await connection.execute(
          'INSERT INTO doctors (id, user_id, specialty, license_number) VALUES (?, ?, ?, ?)',
          [doctorId, userId, 'General Medicine', `LIC-${Date.now()}`]
        );
      } else if (role === 'patient') {
        const patientId = uuidv4();
        await connection.execute(
          'INSERT INTO patients (id, user_id) VALUES (?, ?)',
          [patientId, userId]
        );
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId, email, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: userId,
          email,
          role,
          name
        }
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const connection = await pool.getConnection();

    try {
      // Get user with profile
      const [users] = await connection.execute(`
        SELECT u.id, u.email, u.password, u.role, u.is_active, p.name
        FROM users u
        LEFT JOIN profiles p ON u.id = p.user_id
        WHERE u.email = ?
      `, [email]);

      if (users.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = users[0];

      if (!user.is_active) {
        return res.status(401).json({ error: 'Account is deactivated' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        }
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [users] = await connection.execute(`
        SELECT 
          u.id, u.email, u.role, u.is_active, u.email_verified, u.created_at,
          p.name, p.phone, p.address, p.date_of_birth, p.gender, p.profile_image
        FROM users u
        LEFT JOIN profiles p ON u.id = p.user_id
        WHERE u.id = ?
      `, [req.user.id]);

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
        message: 'Profile fetched successfully',
        user: {
          ...user,
          ...roleData
        }
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Duplicate handler for /profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [users] = await connection.execute(`
        SELECT 
          u.id, u.email, u.role, u.is_active, u.email_verified, u.created_at,
          p.name, p.phone, p.address, p.date_of_birth, p.gender, p.profile_image
        FROM users u
        LEFT JOIN profiles p ON u.id = p.user_id
        WHERE u.id = ?
      `, [req.user.id]);

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
        message: 'Profile fetched successfully',
        user: {
          ...user,
          ...roleData
        }
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { name, phone, address, dateOfBirth, gender } = req.body;

    const connection = await pool.getConnection();

    try {
      await connection.execute(`
        UPDATE profiles 
        SET name = ?, phone = ?, address = ?, date_of_birth = ?, gender = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `, [name, phone, address, dateOfBirth, gender, req.user.id]);

      res.json({ message: 'Profile updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Change password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    const connection = await pool.getConnection();

    try {
      // Get current password
      const [users] = await connection.execute(
        'SELECT password FROM users WHERE id = ?',
        [req.user.id]
      );

      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, users[0].password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await connection.execute(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, req.user.id]
      );

      res.json({ message: 'Password changed successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

module.exports = router; 