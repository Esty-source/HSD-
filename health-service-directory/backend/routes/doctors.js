const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken, authorize } = require('../middleware/auth');

// @route   GET /api/doctors
// @desc    Get all doctors with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { specialty, search } = req.query;
    let query = `
      SELECT id, full_name, email, phone, specialty, bio, 
             created_at, updated_at
      FROM users 
      WHERE role = 'doctor'
    `;
    
    const params = [];
    
    if (specialty) {
      query += ' AND specialty = ?';
      params.push(specialty);
    }
    
    if (search) {
      query += ' AND (full_name LIKE ? OR specialty LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }
    
    query += ' ORDER BY full_name';
    
    const [doctors] = await db.query(query, params);
    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctors/specialties
// @desc    Get all doctor specialties
// @access  Public
router.get('/specialties', async (req, res) => {
  try {
    const [specialties] = await db.query(
      'SELECT DISTINCT specialty FROM users WHERE role = "doctor" AND specialty IS NOT NULL ORDER BY specialty'
    );
    res.json(specialties.map(s => s.specialty));
  } catch (error) {
    console.error('Get specialties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctors/available-slots
// @desc    Get available time slots for a doctor on a specific date
// @access  Private
router.get('/available-slots', authenticateToken, async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    
    if (!doctorId || !date) {
      return res.status(400).json({ message: 'Doctor ID and date are required' });
    }

    // Get doctor's working hours (simplified - in a real app, this would come from a doctor_schedule table)
    const workingHours = {
      start: '09:00:00',
      end: '17:00:00',
      lunchStart: '12:00:00',
      lunchEnd: '13:00:00'
    };

    // Get booked appointments for the day
    const [bookedSlots] = await db.query(
      'SELECT time FROM appointments WHERE doctor_id = ? AND date = ? AND status != "cancelled"',
      [doctorId, date]
    );

    const bookedTimes = bookedSlots.map(slot => slot.time);
    
    // Generate all possible 30-minute slots
    const slots = [];
    const [startHour, startMinute] = workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = workingHours.end.split(':').map(Number);
    const [lunchStartHour, lunchStartMinute] = workingHours.lunchStart.split(':').map(Number);
    const [lunchEndHour, lunchEndMinute] = workingHours.lunchEnd.split(':').map(Number);

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      // Skip lunch break
      if (!(currentHour === lunchStartHour && currentMinute >= lunchStartMinute) ||
          (currentHour > lunchStartHour && currentHour < lunchEndHour) ||
          (currentHour === lunchEndHour && currentMinute >= lunchEndMinute)) {
        
        const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:00`;
        
        if (!bookedTimes.includes(timeString)) {
          slots.push({
            time: timeString,
            available: true
          });
        } else {
          slots.push({
            time: timeString,
            available: false,
            booked: true
          });
        }
      }

      // Increment time by 30 minutes
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }

    res.json({
      date,
      doctorId,
      slots
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [doctors] = await db.query(
      `SELECT id, full_name, email, phone, specialty, bio, 
              created_at, updated_at
       FROM users 
       WHERE id = ? AND role = 'doctor'`,
      [id]
    );

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctors[0]);
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/doctors/:id
// @desc    Update doctor profile
// @access  Private (Doctor or Admin)
router.put('/:id', authenticateToken, authorize('doctor', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone, specialty, bio } = req.body;

    // Check if the user is the doctor or admin
    if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update doctor profile
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
    if (specialty !== undefined) {
      updateFields.push('specialty = ?');
      updateValues.push(specialty);
    }
    if (bio !== undefined) {
      updateFields.push('bio = ?');
      updateValues.push(bio);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateValues.push(id);
    
    await db.query(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ? AND role = 'doctor'`,
      updateValues
    );

    // Get the updated doctor
    const [doctors] = await db.query(
      `SELECT id, full_name, email, phone, specialty, bio, 
              created_at, updated_at
       FROM users 
       WHERE id = ? AND role = 'doctor'`,
      [id]
    );

    res.json(doctors[0]);
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
