const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../config.env' });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'health_service_directory',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'doctor', 'patient') NOT NULL DEFAULT 'patient',
        is_active BOOLEAN DEFAULT TRUE,
        email_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create profiles table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS profiles (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        date_of_birth DATE,
        gender ENUM('Male', 'Female', 'Other'),
        profile_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create doctors table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS doctors (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        specialty VARCHAR(255) NOT NULL,
        license_number VARCHAR(100) UNIQUE,
        experience_years INT DEFAULT 0,
        education TEXT,
        certifications TEXT,
        consultation_fee DECIMAL(10,2) DEFAULT 0.00,
        is_available BOOLEAN DEFAULT TRUE,
        hospital VARCHAR(255),
        rating DECIMAL(3,2) DEFAULT 0.00,
        total_ratings INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create patients table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS patients (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        blood_type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
        medical_history TEXT,
        allergies TEXT,
        emergency_contact VARCHAR(255),
        insurance_info TEXT,
        emergency_contact_name VARCHAR(255),
        emergency_contact_phone VARCHAR(20),
        emergency_contact_relationship VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create health_metrics table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS health_metrics (
        id VARCHAR(36) PRIMARY KEY,
        patient_id VARCHAR(36) NOT NULL,
        weight DECIMAL(5,2),
        height DECIMAL(5,2),
        blood_pressure_systolic INT,
        blood_pressure_diastolic INT,
        heart_rate INT,
        blood_sugar DECIMAL(5,2),
        cholesterol_total DECIMAL(5,2),
        cholesterol_hdl DECIMAL(5,2),
        cholesterol_ldl DECIMAL(5,2),
        sleep_hours DECIMAL(3,1),
        daily_steps INT,
        bmi DECIMAL(4,2),
        recorded_date DATE NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
      )
    `);

    // Create appointments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS appointments (
        id VARCHAR(36) PRIMARY KEY,
        patient_id VARCHAR(36) NOT NULL,
        doctor_id VARCHAR(36) NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        duration INT DEFAULT 30,
        status ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show') DEFAULT 'scheduled',
        type ENUM('in-person', 'telemedicine', 'follow-up') DEFAULT 'in-person',
        reason TEXT,
        notes TEXT,
        location VARCHAR(255),
        cancellation_reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
      )
    `);

    // Create medical_records table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS medical_records (
        id VARCHAR(36) PRIMARY KEY,
        patient_id VARCHAR(36) NOT NULL,
        doctor_id VARCHAR(36) NOT NULL,
        record_type ENUM('consultation', 'test_result', 'prescription', 'vaccination', 'surgery', 'other') NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        file_path VARCHAR(255),
        record_date DATE NOT NULL,
        facility VARCHAR(255),
        status ENUM('active', 'completed', 'archived') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
      )
    `);

    // Create prescriptions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS prescriptions (
        id VARCHAR(36) PRIMARY KEY,
        patient_id VARCHAR(36) NOT NULL,
        doctor_id VARCHAR(36) NOT NULL,
        appointment_id VARCHAR(36),
        medications JSON,
        dosage_instructions TEXT,
        duration VARCHAR(100),
        notes TEXT,
        prescribed_date DATE NOT NULL,
        status ENUM('active', 'completed', 'cancelled', 'expired') DEFAULT 'active',
        refills_remaining INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
        FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
      )
    `);

    // Create notifications table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type ENUM('appointment', 'medical_record', 'prescription', 'system', 'reminder', 'pharmacy', 'resource') NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        related_id VARCHAR(36),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create telemedicine_sessions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS telemedicine_sessions (
        id VARCHAR(36) PRIMARY KEY,
        appointment_id VARCHAR(36) NOT NULL,
        session_url VARCHAR(255),
        session_id VARCHAR(255),
        status ENUM('scheduled', 'active', 'completed', 'cancelled') DEFAULT 'scheduled',
        start_time TIMESTAMP NULL,
        end_time TIMESTAMP NULL,
        notes TEXT,
        duration_minutes INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
      )
    `);

    // Create billing table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS billing (
        id VARCHAR(36) PRIMARY KEY,
        patient_id VARCHAR(36) NOT NULL,
        doctor_id VARCHAR(36) NOT NULL,
        appointment_id VARCHAR(36),
        amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'USD',
        status ENUM('pending', 'completed', 'failed', 'cancelled', 'refunded') DEFAULT 'pending',
        payment_method ENUM('cash', 'credit_card', 'insurance', 'bank_transfer', 'mobile_money') DEFAULT 'cash',
        invoice_number VARCHAR(50) UNIQUE,
        description TEXT,
        payment_date TIMESTAMP NULL,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
        FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
      )
    `);

    // Create file_uploads table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS file_uploads (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_size INT NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        file_type ENUM('profile_image', 'medical_document', 'prescription', 'test_result', 'other') NOT NULL,
        related_id VARCHAR(36),
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create analytics table for dashboard metrics
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS analytics (
        id VARCHAR(36) PRIMARY KEY,
        metric_name VARCHAR(100) NOT NULL,
        metric_value DECIMAL(10,2) NOT NULL,
        metric_type ENUM('count', 'percentage', 'amount', 'average') NOT NULL,
        date_recorded DATE NOT NULL,
        user_id VARCHAR(36),
        related_entity VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create admin user if not exists
    const [adminUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      ['admin@hsd.com']
    );

    if (adminUsers.length === 0) {
      const bcrypt = require('bcryptjs');
      const adminPassword = await bcrypt.hash('admin123', 10);
      
      await connection.execute(`
        INSERT INTO users (id, email, password, role, is_active, email_verified) 
        VALUES (UUID(), ?, ?, 'admin', TRUE, TRUE)
      `, ['admin@hsd.com', adminPassword]);
      
      console.log('✅ Admin user created: admin@hsd.com / admin123');
    }

    connection.release();
    console.log('✅ Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
  initializeDatabase
}; 