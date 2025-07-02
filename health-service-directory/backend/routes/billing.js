const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Get all billing records (admin only)
router.get('/', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [billing] = await connection.execute(`
        SELECT b.*, 
               p.name as patient_name, p.email as patient_email,
               d.name as doctor_name, d.specialty as doctor_specialty,
               a.appointment_date, a.appointment_time
        FROM billing b
        LEFT JOIN patients p ON b.patient_id = p.id
        LEFT JOIN doctors d ON b.doctor_id = d.id
        LEFT JOIN appointments a ON b.appointment_id = a.id
        LEFT JOIN profiles pp ON p.user_id = pp.user_id
        LEFT JOIN profiles dp ON d.user_id = dp.user_id
        ORDER BY b.created_at DESC
      `);

      res.json({ billing });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get billing error:', error);
    res.status(500).json({ error: 'Failed to get billing records' });
  }
});

// Get billing records for current user (patient)
router.get('/my-billing', authenticateToken, async (req, res) => {
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

      const [billing] = await connection.execute(`
        SELECT b.*, 
               d.name as doctor_name, d.specialty as doctor_specialty,
               a.appointment_date, a.appointment_time
        FROM billing b
        LEFT JOIN doctors d ON b.doctor_id = d.id
        LEFT JOIN appointments a ON b.appointment_id = a.id
        LEFT JOIN profiles dp ON d.user_id = dp.user_id
        WHERE b.patient_id = ?
        ORDER BY b.created_at DESC
      `, [patient_id]);

      res.json({ billing });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get my billing error:', error);
    res.status(500).json({ error: 'Failed to get billing records' });
  }
});

// Get billing records for doctor (doctor only)
router.get('/doctor-billing', authenticateToken, authorizeRoles(['doctor']), async (req, res) => {
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

      const [billing] = await connection.execute(`
        SELECT b.*, 
               p.name as patient_name, p.email as patient_email,
               a.appointment_date, a.appointment_time
        FROM billing b
        LEFT JOIN patients p ON b.patient_id = p.id
        LEFT JOIN appointments a ON b.appointment_id = a.id
        LEFT JOIN profiles pp ON p.user_id = pp.user_id
        WHERE b.doctor_id = ?
        ORDER BY b.created_at DESC
      `, [doctor_id]);

      res.json({ billing });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get doctor billing error:', error);
    res.status(500).json({ error: 'Failed to get billing records' });
  }
});

// Create new billing record
router.post('/', authenticateToken, authorizeRoles(['admin', 'doctor']), async (req, res) => {
  try {
    const { 
      patient_id, doctor_id, appointment_id, amount, currency, 
      payment_method, description, due_date 
    } = req.body;

    if (!patient_id || !doctor_id || !amount) {
      return res.status(400).json({ error: 'Patient ID, doctor ID, and amount are required' });
    }

    const connection = await pool.getConnection();

    try {
      // Generate invoice number
      const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Create billing record
      const billing_id = uuidv4();
      await connection.execute(`
        INSERT INTO billing (
          id, patient_id, doctor_id, appointment_id, amount, currency,
          payment_method, invoice_number, description, due_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        billing_id, patient_id, doctor_id, appointment_id, amount, 
        currency || 'USD', payment_method || 'cash', invoiceNumber, 
        description, due_date
      ]);

      res.status(201).json({ 
        message: 'Billing record created successfully',
        billing_id,
        invoice_number: invoiceNumber
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Create billing error:', error);
    res.status(500).json({ error: 'Failed to create billing record' });
  }
});

// Update billing status
router.put('/:id/status', authenticateToken, authorizeRoles(['admin', 'doctor']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, payment_date } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const connection = await pool.getConnection();

    try {
      // Update billing status
      await connection.execute(`
        UPDATE billing 
        SET status = ?, payment_date = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [status, payment_date, id]);

      res.json({ message: 'Billing status updated successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Update billing status error:', error);
    res.status(500).json({ error: 'Failed to update billing status' });
  }
});

// Get billing statistics
router.get('/statistics', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      // Get total revenue
      const [totalRevenue] = await connection.execute(`
        SELECT SUM(amount) as total FROM billing WHERE status = 'completed'
      `);

      // Get pending payments
      const [pendingPayments] = await connection.execute(`
        SELECT SUM(amount) as total FROM billing WHERE status = 'pending'
      `);

      // Get monthly revenue
      const [monthlyRevenue] = await connection.execute(`
        SELECT DATE_FORMAT(payment_date, '%Y-%m') as month, SUM(amount) as total
        FROM billing 
        WHERE status = 'completed' AND payment_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        GROUP BY DATE_FORMAT(payment_date, '%Y-%m')
        ORDER BY month DESC
      `);

      // Get payment methods distribution
      const [paymentMethods] = await connection.execute(`
        SELECT payment_method, COUNT(*) as count, SUM(amount) as total
        FROM billing 
        WHERE status = 'completed'
        GROUP BY payment_method
      `);

      res.json({
        total_revenue: totalRevenue[0]?.total || 0,
        pending_payments: pendingPayments[0]?.total || 0,
        monthly_revenue: monthlyRevenue,
        payment_methods: paymentMethods
      });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Get billing statistics error:', error);
    res.status(500).json({ error: 'Failed to get billing statistics' });
  }
});

// Delete billing record (admin only)
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    try {
      await connection.execute('DELETE FROM billing WHERE id = ?', [id]);

      res.json({ message: 'Billing record deleted successfully' });

    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Delete billing error:', error);
    res.status(500).json({ error: 'Failed to delete billing record' });
  }
});

module.exports = router; 