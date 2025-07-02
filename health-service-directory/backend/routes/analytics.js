const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Get admin dashboard analytics
router.get('/admin', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      // Get total users count
      const [totalUsers] = await connection.execute('SELECT COUNT(*) as count FROM users');
      
      // Get total doctors count
      const [totalDoctors] = await connection.execute('SELECT COUNT(*) as count FROM doctors');
      
      // Get total patients count
      const [totalPatients] = await connection.execute('SELECT COUNT(*) as count FROM patients');
      
      // Get total appointments count
      const [totalAppointments] = await connection.execute('SELECT COUNT(*) as count FROM appointments');
      
      // Get today's appointments
      const [todayAppointments] = await connection.execute(`
        SELECT COUNT(*) as count FROM appointments 
        WHERE DATE(appointment_date) = CURDATE()
      `);
      
      // Get pending appointments
      const [pendingAppointments] = await connection.execute(`
        SELECT COUNT(*) as count FROM appointments 
        WHERE status = 'scheduled'
      `);
      
      // Get total revenue
      const [totalRevenue] = await connection.execute(`
        SELECT SUM(amount) as total FROM billing WHERE status = 'completed'
      `);
      
      // Get monthly appointments trend
      const [monthlyAppointments] = await connection.execute(`
        SELECT DATE_FORMAT(appointment_date, '%Y-%m') as month, COUNT(*) as count
        FROM appointments 
        WHERE appointment_date >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(appointment_date, '%Y-%m')
        ORDER BY month DESC
      `);
      
      // Get appointments by status
      const [appointmentsByStatus] = await connection.execute(`
        SELECT status, COUNT(*) as count
        FROM appointments 
        GROUP BY status
      `);
      
      // Get top specialties
      const [topSpecialties] = await connection.execute(`
        SELECT specialty, COUNT(*) as count
        FROM doctors 
        GROUP BY specialty 
        ORDER BY count DESC 
        LIMIT 5
      `);
      
      // Get recent activities
      const [recentActivities] = await connection.execute(`
        SELECT 'appointment' as type, a.id, a.appointment_date, a.status,
               p.name as patient_name, d.name as doctor_name
        FROM appointments a
        LEFT JOIN patients p ON a.patient_id = p.id
        LEFT JOIN doctors d ON a.doctor_id = d.id
        LEFT JOIN profiles pp ON p.user_id = pp.user_id
        LEFT JOIN profiles dp ON d.user_id = dp.user_id
        ORDER BY a.created_at DESC
        LIMIT 10
      `);

      res.json({
        overview: {
          total_users: totalUsers[0].count,
          total_doctors: totalDoctors[0].count,
          total_patients: totalPatients[0].count,
          total_appointments: totalAppointments[0].count,
          today_appointments: todayAppointments[0].count,
          pending_appointments: pendingAppointments[0].count,
          total_revenue: totalRevenue[0]?.total || 0
        },
        trends: {
          monthly_appointments: monthlyAppointments,
          appointments_by_status: appointmentsByStatus,
          top_specialties: topSpecialties
        },
        recent_activities: recentActivities
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get admin analytics error:', error);
    res.status(500).json({ error: 'Failed to get admin analytics' });
  }
});

// Get doctor dashboard analytics
router.get('/doctor', authenticateToken, authorizeRoles(['doctor']), async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      // Get doctor ID for current user
      const [doctors] = await connection.execute(
        'SELECT id FROM doctors WHERE user_id = ?',
        [req.user.id]
      );

      if (doctors.length === 0) {
        return res.status(404).json({ error: 'Doctor profile not found' });
      }

      const doctor_id = doctors[0].id;

      // Get total patients
      const [totalPatients] = await connection.execute(`
        SELECT COUNT(DISTINCT patient_id) as count 
        FROM appointments 
        WHERE doctor_id = ?
      `, [doctor_id]);
      
      // Get today's appointments
      const [todayAppointments] = await connection.execute(`
        SELECT COUNT(*) as count 
        FROM appointments 
        WHERE doctor_id = ? AND DATE(appointment_date) = CURDATE()
      `, [doctor_id]);
      
      // Get pending appointments
      const [pendingAppointments] = await connection.execute(`
        SELECT COUNT(*) as count 
        FROM appointments 
        WHERE doctor_id = ? AND status = 'scheduled'
      `, [doctor_id]);
      
      // Get completed appointments this month
      const [monthlyCompleted] = await connection.execute(`
        SELECT COUNT(*) as count 
        FROM appointments 
        WHERE doctor_id = ? AND status = 'completed' 
        AND MONTH(appointment_date) = MONTH(CURDATE())
        AND YEAR(appointment_date) = YEAR(CURDATE())
      `, [doctor_id]);
      
      // Get patient demographics
      const [patientDemographics] = await connection.execute(`
        SELECT 
          CASE 
            WHEN TIMESTAMPDIFF(YEAR, pp.date_of_birth, CURDATE()) < 18 THEN 'Under 18'
            WHEN TIMESTAMPDIFF(YEAR, pp.date_of_birth, CURDATE()) < 30 THEN '18-29'
            WHEN TIMESTAMPDIFF(YEAR, pp.date_of_birth, CURDATE()) < 50 THEN '30-49'
            WHEN TIMESTAMPDIFF(YEAR, pp.date_of_birth, CURDATE()) < 65 THEN '50-64'
            ELSE '65+'
          END as age_group,
          COUNT(*) as count
        FROM appointments a
        LEFT JOIN patients p ON a.patient_id = p.id
        LEFT JOIN profiles pp ON p.user_id = pp.user_id
        WHERE a.doctor_id = ? AND pp.date_of_birth IS NOT NULL
        GROUP BY age_group
        ORDER BY age_group
      `, [doctor_id]);
      
      // Get appointments by type
      const [appointmentsByType] = await connection.execute(`
        SELECT type, COUNT(*) as count
        FROM appointments 
        WHERE doctor_id = ?
        GROUP BY type
      `, [doctor_id]);
      
      // Get recent patients
      const [recentPatients] = await connection.execute(`
        SELECT DISTINCT p.id, pp.name, pp.date_of_birth, a.appointment_date
        FROM appointments a
        LEFT JOIN patients p ON a.patient_id = p.id
        LEFT JOIN profiles pp ON p.user_id = pp.user_id
        WHERE a.doctor_id = ?
        ORDER BY a.appointment_date DESC
        LIMIT 5
      `, [doctor_id]);

      res.json({
        overview: {
          total_patients: totalPatients[0].count,
          today_appointments: todayAppointments[0].count,
          pending_appointments: pendingAppointments[0].count,
          monthly_completed: monthlyCompleted[0].count
        },
        demographics: {
          patient_demographics: patientDemographics,
          appointments_by_type: appointmentsByType
        },
        recent_patients: recentPatients
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get doctor analytics error:', error);
    res.status(500).json({ error: 'Failed to get doctor analytics' });
  }
});

// Get patient dashboard analytics
router.get('/patient', authenticateToken, async (req, res) => {
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

      // Get total appointments
      const [totalAppointments] = await connection.execute(`
        SELECT COUNT(*) as count FROM appointments WHERE patient_id = ?
      `, [patient_id]);
      
      // Get upcoming appointments
      const [upcomingAppointments] = await connection.execute(`
        SELECT COUNT(*) as count 
        FROM appointments 
        WHERE patient_id = ? AND appointment_date >= CURDATE() AND status = 'scheduled'
      `, [patient_id]);
      
      // Get completed appointments
      const [completedAppointments] = await connection.execute(`
        SELECT COUNT(*) as count 
        FROM appointments 
        WHERE patient_id = ? AND status = 'completed'
      `, [patient_id]);
      
      // Get total prescriptions
      const [totalPrescriptions] = await connection.execute(`
        SELECT COUNT(*) as count FROM prescriptions WHERE patient_id = ?
      `, [patient_id]);
      
      // Get active prescriptions
      const [activePrescriptions] = await connection.execute(`
        SELECT COUNT(*) as count 
        FROM prescriptions 
        WHERE patient_id = ? AND status = 'active'
      `, [patient_id]);
      
      // Get health metrics trend
      const [healthMetricsTrend] = await connection.execute(`
        SELECT recorded_date, weight, blood_pressure_systolic, blood_pressure_diastolic, heart_rate
        FROM health_metrics 
        WHERE patient_id = ?
        ORDER BY recorded_date DESC
        LIMIT 7
      `, [patient_id]);
      
      // Get recent medical records
      const [recentMedicalRecords] = await connection.execute(`
        SELECT mr.*, d.name as doctor_name
        FROM medical_records mr
        LEFT JOIN doctors d ON mr.doctor_id = d.id
        LEFT JOIN profiles dp ON d.user_id = dp.user_id
        WHERE mr.patient_id = ?
        ORDER BY mr.record_date DESC
        LIMIT 5
      `, [patient_id]);

      res.json({
        overview: {
          total_appointments: totalAppointments[0].count,
          upcoming_appointments: upcomingAppointments[0].count,
          completed_appointments: completedAppointments[0].count,
          total_prescriptions: totalPrescriptions[0].count,
          active_prescriptions: activePrescriptions[0].count
        },
        health_trends: {
          health_metrics_trend: healthMetricsTrend
        },
        recent_records: recentMedicalRecords
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get patient analytics error:', error);
    res.status(500).json({ error: 'Failed to get patient analytics' });
  }
});

// Record analytics metric
router.post('/record', authenticateToken, async (req, res) => {
  try {
    const { metric_name, metric_value, metric_type, date_recorded, related_entity } = req.body;

    if (!metric_name || !metric_value || !metric_type || !date_recorded) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const connection = await pool.getConnection();

    try {
      const metric_id = uuidv4();
      await connection.execute(`
        INSERT INTO analytics (
          id, metric_name, metric_value, metric_type, date_recorded, 
          user_id, related_entity
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [metric_id, metric_name, metric_value, metric_type, date_recorded, req.user.id, related_entity]);

      res.status(201).json({ 
        message: 'Analytics metric recorded successfully',
        metric_id 
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Record analytics error:', error);
    res.status(500).json({ error: 'Failed to record analytics metric' });
  }
});

module.exports = router; 