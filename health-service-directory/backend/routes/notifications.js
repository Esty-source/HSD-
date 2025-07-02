const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get notifications for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [notifications] = await connection.execute(`
        SELECT * FROM notifications 
        WHERE user_id = ? 
        ORDER BY created_at DESC
        LIMIT 50
      `, [req.user.id]);

      res.json({ notifications });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to get notifications' });
  }
});

// Get notifications for current user (alias for frontend compatibility)
router.get('/my-notifications', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [notifications] = await connection.execute(`
        SELECT * FROM notifications 
        WHERE user_id = ? 
        ORDER BY created_at DESC
        LIMIT 50
      `, [req.user.id]);

      res.json({ notifications });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to get notifications' });
  }
});

// Mark notification as read
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      await connection.execute(`
        UPDATE notifications 
        SET is_read = TRUE 
        WHERE id = ? AND user_id = ?
      `, [id, req.user.id]);

      res.json({ message: 'Notification marked as read' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
});

// Mark all notifications as read
router.put('/read-all', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      await connection.execute(`
        UPDATE notifications 
        SET is_read = TRUE 
        WHERE user_id = ?
      `, [req.user.id]);

      res.json({ message: 'All notifications marked as read' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Mark all notifications read error:', error);
    res.status(500).json({ error: 'Failed to mark notifications as read' });
  }
});

// Delete notification
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      await connection.execute(`
        DELETE FROM notifications 
        WHERE id = ? AND user_id = ?
      `, [id, req.user.id]);

      res.json({ message: 'Notification deleted successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

// Create notification (admin/system only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { user_id, title, message, type, related_id } = req.body;

    if (!user_id || !title || !message || !type) {
      return res.status(400).json({ error: 'User ID, title, message, and type are required' });
    }

    const connection = await pool.getConnection();

    try {
      const notification_id = uuidv4();
      await connection.execute(`
        INSERT INTO notifications (id, user_id, title, message, type, related_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [notification_id, user_id, title, message, type, related_id || null]);

      res.status(201).json({ 
        message: 'Notification created successfully',
        notification_id 
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

module.exports = router; 