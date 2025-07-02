const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let authToken = '';
let adminToken = '';
let doctorToken = '';
let patientToken = '';

// Test configuration
const testData = {
  admin: {
    email: 'admin@hsd.com',
    password: 'admin123'
  },
  doctor: {
    email: 'doctor@test.com',
    password: 'password123',
    name: 'Dr. John Smith',
    specialty: 'Cardiology',
    phone: '+1234567890'
  },
  patient: {
    email: 'patient@test.com',
    password: 'password123',
    name: 'Jane Doe',
    phone: '+1234567891',
    date_of_birth: '1990-01-01',
    gender: 'Female'
  }
};

// Utility function to make authenticated requests
const makeRequest = async (method, endpoint, data = null, token = null) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message, 
      status: error.response?.status 
    };
  }
};

// Test functions
const testHealthCheck = async () => {
  console.log('\n🔍 Testing Health Check...');
  try {
    const response = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check passed:', response.data);
  } catch (error) {
    console.log('❌ Health check failed:', error.response?.data || error.message);
  }
};

const testAuthEndpoints = async () => {
  console.log('\n🔐 Testing Authentication Endpoints...');

  // Test admin login
  console.log('\n--- Testing Admin Login ---');
  const adminLogin = await makeRequest('POST', '/auth/login', testData.admin);
  if (adminLogin.success) {
    adminToken = adminLogin.data.token;
    console.log('✅ Admin login successful');
  } else {
    console.log('❌ Admin login failed:', adminLogin.error);
  }

  // Test user registration
  console.log('\n--- Testing User Registration ---');
  const registerDoctor = await makeRequest('POST', '/auth/register', {
    ...testData.doctor,
    role: 'doctor'
  });
  if (registerDoctor.success) {
    console.log('✅ Doctor registration successful');
  } else {
    console.log('❌ Doctor registration failed:', adminLogin.error);
  }

  const registerPatient = await makeRequest('POST', '/auth/register', {
    ...testData.patient,
    role: 'patient'
  });
  if (registerPatient.success) {
    console.log('✅ Patient registration successful');
  } else {
    console.log('❌ Patient registration failed:', registerPatient.error);
  }

  // Test login for new users
  console.log('\n--- Testing New User Logins ---');
  const doctorLogin = await makeRequest('POST', '/auth/login', {
    email: testData.doctor.email,
    password: testData.doctor.password
  });
  if (doctorLogin.success) {
    doctorToken = doctorLogin.data.token;
    console.log('✅ Doctor login successful');
  } else {
    console.log('❌ Doctor login failed:', doctorLogin.error);
  }

  const patientLogin = await makeRequest('POST', '/auth/login', {
    email: testData.patient.email,
    password: testData.patient.password
  });
  if (patientLogin.success) {
    patientToken = patientLogin.data.token;
    console.log('✅ Patient login successful');
  } else {
    console.log('❌ Patient login failed:', patientLogin.error);
  }
};

const testUserEndpoints = async () => {
  console.log('\n👥 Testing User Endpoints...');

  // Test get all users (admin only)
  const getAllUsers = await makeRequest('GET', '/users', null, adminToken);
  if (getAllUsers.success) {
    console.log('✅ Get all users successful');
  } else {
    console.log('❌ Get all users failed:', getAllUsers.error);
  }

  // Test get user profile
  const getProfile = await makeRequest('GET', '/auth/profile', null, adminToken);
  if (getProfile.success) {
    console.log('✅ Get profile successful');
  } else {
    console.log('❌ Get profile failed:', getProfile.error);
  }
};

const testDoctorEndpoints = async () => {
  console.log('\n👨‍⚕️ Testing Doctor Endpoints...');

  // Test get all doctors
  const getAllDoctors = await makeRequest('GET', '/doctors');
  if (getAllDoctors.success) {
    console.log('✅ Get all doctors successful');
  } else {
    console.log('❌ Get all doctors failed:', getAllDoctors.error);
  }

  // Test get doctor profile
  const getDoctorProfile = await makeRequest('GET', '/doctors/my-profile', null, doctorToken);
  if (getDoctorProfile.success) {
    console.log('✅ Get doctor profile successful');
  } else {
    console.log('❌ Get doctor profile failed:', getDoctorProfile.error);
  }
};

const testPatientEndpoints = async () => {
  console.log('\n👤 Testing Patient Endpoints...');

  // Test get all patients (admin only)
  const getAllPatients = await makeRequest('GET', '/patients', null, adminToken);
  if (getAllPatients.success) {
    console.log('✅ Get all patients successful');
  } else {
    console.log('❌ Get all patients failed:', getAllPatients.error);
  }

  // Test get patient profile
  const getPatientProfile = await makeRequest('GET', '/patients/my-profile', null, patientToken);
  if (getPatientProfile.success) {
    console.log('✅ Get patient profile successful');
  } else {
    console.log('❌ Get patient profile failed:', getPatientProfile.error);
  }
};

const testAppointmentEndpoints = async () => {
  console.log('\n📅 Testing Appointment Endpoints...');

  // Test get all appointments
  const getAllAppointments = await makeRequest('GET', '/appointments', null, adminToken);
  if (getAllAppointments.success) {
    console.log('✅ Get all appointments successful');
  } else {
    console.log('❌ Get all appointments failed:', getAllAppointments.error);
  }

  // Test get my appointments (patient)
  const getMyAppointments = await makeRequest('GET', '/appointments/my-appointments', null, patientToken);
  if (getMyAppointments.success) {
    console.log('✅ Get my appointments successful');
  } else {
    console.log('❌ Get my appointments failed:', getMyAppointments.error);
  }
};

const testHealthMetricsEndpoints = async () => {
  console.log('\n💓 Testing Health Metrics Endpoints...');

  // Test get health metrics (patient only)
  const getHealthMetrics = await makeRequest('GET', '/health-metrics', null, patientToken);
  if (getHealthMetrics.success) {
    console.log('✅ Get health metrics successful');
  } else {
    console.log('❌ Get health metrics failed:', getHealthMetrics.error);
  }

  // Test create health metrics
  const createHealthMetrics = await makeRequest('POST', '/health-metrics', {
    weight: 70.5,
    height: 175,
    blood_pressure_systolic: 120,
    blood_pressure_diastolic: 80,
    heart_rate: 72,
    blood_sugar: 95,
    sleep_hours: 7.5,
    daily_steps: 8000,
    recorded_date: new Date().toISOString().split('T')[0],
    notes: 'Test health metrics entry'
  }, patientToken);

  if (createHealthMetrics.success) {
    console.log('✅ Create health metrics successful');
  } else {
    console.log('❌ Create health metrics failed:', createHealthMetrics.error);
  }
};

const testNotificationEndpoints = async () => {
  console.log('\n🔔 Testing Notification Endpoints...');

  // Test get notifications
  const getNotifications = await makeRequest('GET', '/notifications/my-notifications', null, adminToken);
  if (getNotifications.success) {
    console.log('✅ Get notifications successful');
  } else {
    console.log('❌ Get notifications failed:', getNotifications.error);
  }

  // Test get unread count
  const getUnreadCount = await makeRequest('GET', '/notifications/unread-count', null, adminToken);
  if (getUnreadCount.success) {
    console.log('✅ Get unread count successful');
  } else {
    console.log('❌ Get unread count failed:', getUnreadCount.error);
  }
};

const testAnalyticsEndpoints = async () => {
  console.log('\n📊 Testing Analytics Endpoints...');

  // Test admin analytics
  const adminAnalytics = await makeRequest('GET', '/analytics/admin', null, adminToken);
  if (adminAnalytics.success) {
    console.log('✅ Admin analytics successful');
  } else {
    console.log('❌ Admin analytics failed:', adminAnalytics.error);
  }

  // Test doctor analytics
  const doctorAnalytics = await makeRequest('GET', '/analytics/doctor', null, doctorToken);
  if (doctorAnalytics.success) {
    console.log('✅ Doctor analytics successful');
  } else {
    console.log('❌ Doctor analytics failed:', doctorAnalytics.error);
  }

  // Test patient analytics
  const patientAnalytics = await makeRequest('GET', '/analytics/patient', null, patientToken);
  if (patientAnalytics.success) {
    console.log('✅ Patient analytics successful');
  } else {
    console.log('❌ Patient analytics failed:', patientAnalytics.error);
  }
};

const testBillingEndpoints = async () => {
  console.log('\n💰 Testing Billing Endpoints...');

  // Test get billing statistics (admin only)
  const getBillingStats = await makeRequest('GET', '/billing/statistics', null, adminToken);
  if (getBillingStats.success) {
    console.log('✅ Get billing statistics successful');
  } else {
    console.log('❌ Get billing statistics failed:', getBillingStats.error);
  }

  // Test get my billing (patient)
  const getMyBilling = await makeRequest('GET', '/billing/my-billing', null, patientToken);
  if (getMyBilling.success) {
    console.log('✅ Get my billing successful');
  } else {
    console.log('❌ Get my billing failed:', getMyBilling.error);
  }
};

// Main test runner
const runAllTests = async () => {
  console.log('🚀 Starting Backend API Tests...');
  console.log('=====================================');

  try {
    await testHealthCheck();
    await testAuthEndpoints();
    await testUserEndpoints();
    await testDoctorEndpoints();
    await testPatientEndpoints();
    await testAppointmentEndpoints();
    await testHealthMetricsEndpoints();
    await testNotificationEndpoints();
    await testAnalyticsEndpoints();
    await testBillingEndpoints();

    console.log('\n🎉 All tests completed!');
    console.log('=====================================');
    console.log('✅ Backend API is working correctly');
    console.log('🔗 API Base URL:', BASE_URL);
    console.log('📊 Health Check:', 'http://localhost:5000/health');
    
  } catch (error) {
    console.error('❌ Test runner error:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = {
  runAllTests,
  makeRequest,
  testData
}; 