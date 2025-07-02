const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get health metrics for current patient
router.get('/', authenticateToken, async (req, res) => {
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

      // Get latest health metrics
      const [metrics] = await connection.execute(`
        SELECT * FROM health_metrics 
        WHERE patient_id = ? 
        ORDER BY recorded_date DESC, created_at DESC
        LIMIT 10
      `, [patient_id]);

      res.json({ metrics });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get health metrics error:', error);
    res.status(500).json({ error: 'Failed to get health metrics' });
  }
});

// Get latest health metrics for current patient
router.get('/latest', authenticateToken, async (req, res) => {
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

      // Get latest health metrics
      const [metrics] = await connection.execute(`
        SELECT * FROM health_metrics 
        WHERE patient_id = ? 
        ORDER BY recorded_date DESC, created_at DESC
        LIMIT 1
      `, [patient_id]);

      res.json({ metric: metrics[0] || null });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get latest health metrics error:', error);
    res.status(500).json({ error: 'Failed to get latest health metrics' });
  }
});

// Create new health metrics entry
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { 
      weight, height, blood_pressure_systolic, blood_pressure_diastolic, 
      heart_rate, blood_sugar, cholesterol_total, cholesterol_hdl, cholesterol_ldl,
      sleep_hours, daily_steps, recorded_date, notes 
    } = req.body;

    if (!recorded_date) {
      return res.status(400).json({ error: 'Recorded date is required' });
    }

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

      // Calculate BMI if weight and height are provided
      let bmi = null;
      if (weight && height) {
        const heightInMeters = height / 100;
        bmi = weight / (heightInMeters * heightInMeters);
      }

      // Create health metrics entry
      const metric_id = uuidv4();
      await connection.execute(`
        INSERT INTO health_metrics (
          id, patient_id, weight, height, blood_pressure_systolic, blood_pressure_diastolic,
          heart_rate, blood_sugar, cholesterol_total, cholesterol_hdl, cholesterol_ldl,
          sleep_hours, daily_steps, bmi, recorded_date, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        metric_id, patient_id, weight, height, blood_pressure_systolic, blood_pressure_diastolic,
        heart_rate, blood_sugar, cholesterol_total, cholesterol_hdl, cholesterol_ldl,
        sleep_hours, daily_steps, bmi, recorded_date, notes
      ]);

      res.status(201).json({ 
        message: 'Health metrics recorded successfully',
        metric_id 
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Create health metrics error:', error);
    res.status(500).json({ error: 'Failed to record health metrics' });
  }
});

// Update health metrics
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      weight, height, blood_pressure_systolic, blood_pressure_diastolic, 
      heart_rate, blood_sugar, cholesterol_total, cholesterol_hdl, cholesterol_ldl,
      sleep_hours, daily_steps, recorded_date, notes 
    } = req.body;

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

      // Check if metric belongs to current patient
      const [metrics] = await connection.execute(
        'SELECT id FROM health_metrics WHERE id = ? AND patient_id = ?',
        [id, patient_id]
      );

      if (metrics.length === 0) {
        return res.status(404).json({ error: 'Health metrics not found or access denied' });
      }

      // Calculate BMI if weight and height are provided
      let bmi = null;
      if (weight && height) {
        const heightInMeters = height / 100;
        bmi = weight / (heightInMeters * heightInMeters);
      }

      // Update health metrics
      await connection.execute(`
        UPDATE health_metrics 
        SET weight = ?, height = ?, blood_pressure_systolic = ?, blood_pressure_diastolic = ?,
            heart_rate = ?, blood_sugar = ?, cholesterol_total = ?, cholesterol_hdl = ?, 
            cholesterol_ldl = ?, sleep_hours = ?, daily_steps = ?, bmi = ?, 
            recorded_date = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
        weight, height, blood_pressure_systolic, blood_pressure_diastolic,
        heart_rate, blood_sugar, cholesterol_total, cholesterol_hdl, cholesterol_ldl,
        sleep_hours, daily_steps, bmi, recorded_date, notes, id
      ]);

      res.json({ message: 'Health metrics updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update health metrics error:', error);
    res.status(500).json({ error: 'Failed to update health metrics' });
  }
});

// Delete health metrics
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

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

      // Check if metric belongs to current patient
      const [metrics] = await connection.execute(
        'SELECT id FROM health_metrics WHERE id = ? AND patient_id = ?',
        [id, patient_id]
      );

      if (metrics.length === 0) {
        return res.status(404).json({ error: 'Health metrics not found or access denied' });
      }

      // Delete health metrics
      await connection.execute('DELETE FROM health_metrics WHERE id = ?', [id]);

      res.json({ message: 'Health metrics deleted successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Delete health metrics error:', error);
    res.status(500).json({ error: 'Failed to delete health metrics' });
  }
});

module.exports = router; 