const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, authorize } = require('../middleware/auth');

// @route   GET /api/appointments
// @desc    Get all appointments (for admin) or user's appointments
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = '';
    let params = [];

    if (req.user.role === 'admin') {
      query = `
        SELECT a.*, 
               p1.full_name as patient_name, 
               p2.full_name as doctor_name
        FROM appointments a
        LEFT JOIN users p1 ON a.patient_id = p1.id
        LEFT JOIN users p2 ON a.doctor_id = p2.id
        ORDER BY a.date DESC, a.time DESC
      `;
    } else if (req.user.role === 'doctor') {
      query = `
        SELECT a.*, p.full_name as patient_name
        FROM appointments a
        LEFT JOIN users p ON a.patient_id = p.id
        WHERE a.doctor_id = ?
        ORDER BY a.date DESC, a.time DESC
      `;
      params = [req.user.id];
    } else {
      // For patients
      query = `
        SELECT a.*, u.full_name as doctor_name
        FROM appointments a
        LEFT JOIN users u ON a.doctor_id = u.id
        WHERE a.patient_id = ?
        ORDER BY a.date DESC, a.time DESC
      `;
      params = [req.user.id];
    }

    const [appointments] = await db.query(query, params);
    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Private
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { doctor_id, date, time, reason, notes } = req.body;
    const patient_id = req.user.id;

    // Basic validation
    if (!doctor_id || !date || !time) {
      return res.status(400).json({ message: 'Doctor, date and time are required' });
    }

    // Check if doctor exists
    const [doctors] = await db.query('SELECT * FROM users WHERE id = ? AND role = "doctor"', [doctor_id]);
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check for existing appointment at the same time
    const [existingAppointments] = await db.query(
      'SELECT * FROM appointments WHERE doctor_id = ? AND date = ? AND time = ?',
      [doctor_id, date, time]
    );

    if (existingAppointments.length > 0) {
      return res.status(400).json({ message: 'Appointment slot already taken' });
    }

    // Create appointment
    const [result] = await db.query(
      'INSERT INTO appointments (patient_id, doctor_id, date, time, reason, notes, status) VALUES (?, ?, ?, ?, ?, ?, "scheduled")',
      [patient_id, doctor_id, date, time, reason || null, notes || null]
    );

    // Get the created appointment with user details
    const [appointments] = await db.query(
      `SELECT a.*, u.full_name as doctor_name 
       FROM appointments a
       LEFT JOIN users u ON a.doctor_id = u.id
       WHERE a.id = ?`,
      [result.insertId]
    );

    res.status(201).json(appointments[0]);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/appointments/:id
// @desc    Update an appointment
// @access  Private
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { status, date, time, reason, notes } = req.body;
    const { id } = req.params;

    // Check if appointment exists and user has permission
    const [appointments] = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
    if (appointments.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const appointment = appointments[0];
    
    // Only the patient, doctor, or admin can update the appointment
    if (
      req.user.role !== 'admin' && 
      req.user.id !== appointment.patient_id && 
      req.user.id !== appointment.doctor_id
    ) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    // Update appointment
    const updateFields = [];
    const updateValues = [];

    if (status) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }
    if (date) {
      updateFields.push('date = ?');
      updateValues.push(date);
    }
    if (time) {
      updateFields.push('time = ?');
      updateValues.push(time);
    }
    if (reason !== undefined) {
      updateFields.push('reason = ?');
      updateValues.push(reason);
    }
    if (notes !== undefined) {
      updateFields.push('notes = ?');
      updateValues.push(notes);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateValues.push(id);
    
    await db.query(
      `UPDATE appointments SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get the updated appointment
    const [updatedAppointments] = await db.query(
      `SELECT a.*, 
              p.full_name as patient_name, 
              d.full_name as doctor_name
       FROM appointments a
       LEFT JOIN users p ON a.patient_id = p.id
       LEFT JOIN users d ON a.doctor_id = d.id
       WHERE a.id = ?`,
      [id]
    );

    res.json(updatedAppointments[0]);
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Delete an appointment
// @access  Private
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if appointment exists
    const [appointments] = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
    if (appointments.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const appointment = appointments[0];
    
    // Only admin, patient, or doctor can delete the appointment
    if (
      req.user.role !== 'admin' && 
      req.user.id !== appointment.patient_id && 
      req.user.id !== appointment.doctor_id
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this appointment' });
    }

    await db.query('DELETE FROM appointments WHERE id = ?', [id]);
    
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
