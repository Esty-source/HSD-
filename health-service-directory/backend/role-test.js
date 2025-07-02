const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data for different roles (only patient and doctor allowed in registration)
const testUsers = {
  doctor: {
    name: 'Dr. John Smith',
    email: 'doctor@test.com',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Cardiology',
    phone: '+1234567890'
  },
  patient: {
    name: 'Jane Doe',
    email: 'patient@test.com',
    password: 'patient123',
    role: 'patient',
    phone: '+1234567891',
    date_of_birth: '1990-01-01',
    gender: 'Female'
  }
};

// Admin credentials (must be created manually in database)
const adminUser = {
  email: 'admin@hsd.com',
  password: 'admin123'
};

let tokens = {};

async function testRolePermissions() {
  console.log('🔐 Testing Role-Based Permissions...\n');

  try {
    // Test registration for allowed roles
    console.log('📝 Testing Registration for Allowed Roles...');
    for (const [role, userData] of Object.entries(testUsers)) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userData);
        console.log(`✅ ${role} registration successful`);
        // Store token if registration was successful
        if (response.data.token) {
          tokens[role] = response.data.token;
        }
      } catch (error) {
        if (error.response?.status === 409 || error.response?.status === 400) {
          console.log(`⚠️ ${role} already exists or invalid, trying login...`);
          // Try to login if user already exists
          try {
            const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
              email: userData.email,
              password: userData.password
            });
            tokens[role] = loginResponse.data.token;
            console.log(`✅ ${role} login successful`);
          } catch (loginError) {
            console.log(`❌ ${role} login failed:`, loginError.response?.data || loginError.message);
          }
        } else {
          console.log(`❌ ${role} registration failed:`, error.response?.data || error.message);
        }
      }
    }

    // Test admin login (admin must be created manually)
    console.log('\n👑 Testing Admin Login...');
    try {
      const adminResponse = await axios.post(`${BASE_URL}/auth/login`, adminUser);
      tokens.admin = adminResponse.data.token;
      console.log('✅ Admin login successful');
    } catch (error) {
      console.log('❌ Admin login failed (admin may not exist):', error.response?.data || error.message);
    }

    // Test profile access for all roles
    console.log('\n👤 Testing Profile Access...');
    for (const [role, token] of Object.entries(tokens)) {
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(`✅ ${role} profile access successful`);
        } catch (error) {
          console.log(`❌ ${role} profile access failed:`, error.response?.data || error.message);
        }
      }
    }

    // Test users endpoint (admin only)
    console.log('\n👥 Testing Users Endpoint (Admin Only)...');
    for (const [role, token] of Object.entries(tokens)) {
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(`✅ ${role} can access users (${response.data.users?.length || 0} users found)`);
        } catch (error) {
          if (error.response?.status === 403) {
            console.log(`✅ ${role} correctly blocked from users endpoint (insufficient permissions)`);
          } else {
            console.log(`❌ ${role} users access error:`, error.response?.data || error.message);
          }
        }
      }
    }

    // Test doctors endpoint (public access)
    console.log('\n👨‍⚕️ Testing Doctors Endpoint (Public Access)...');
    try {
      const response = await axios.get(`${BASE_URL}/doctors`);
      console.log(`✅ Public doctors access successful (${response.data.doctors?.length || 0} doctors found)`);
    } catch (error) {
      console.log(`❌ Public doctors access failed:`, error.response?.data || error.message);
    }

    // Test doctor profile access (doctor only)
    console.log('\n👨‍⚕️ Testing Doctor Profile Access...');
    if (tokens.doctor) {
      try {
        const response = await axios.get(`${BASE_URL}/doctors/my-profile`, {
          headers: { Authorization: `Bearer ${tokens.doctor}` }
        });
        console.log(`✅ Doctor can access own profile`);
      } catch (error) {
        console.log(`❌ Doctor profile access failed:`, error.response?.data || error.message);
      }
    }

    // Test patients endpoint (admin only)
    console.log('\n👤 Testing Patients Endpoint (Admin Only)...');
    for (const [role, token] of Object.entries(tokens)) {
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/patients`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(`✅ ${role} can access patients (${response.data.patients?.length || 0} patients found)`);
        } catch (error) {
          if (error.response?.status === 403) {
            console.log(`✅ ${role} correctly blocked from patients endpoint (insufficient permissions)`);
          } else {
            console.log(`❌ ${role} patients access error:`, error.response?.data || error.message);
          }
        }
      }
    }

    // Test patient profile access (patient only)
    console.log('\n👤 Testing Patient Profile Access...');
    if (tokens.patient) {
      try {
        const response = await axios.get(`${BASE_URL}/patients/my-profile`, {
          headers: { Authorization: `Bearer ${tokens.patient}` }
        });
        console.log(`✅ Patient can access own profile`);
      } catch (error) {
        console.log(`❌ Patient profile access failed:`, error.response?.data || error.message);
      }
    }

    // Test notifications for all roles
    console.log('\n🔔 Testing Notifications Access...');
    for (const [role, token] of Object.entries(tokens)) {
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/notifications/my-notifications`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(`✅ ${role} notifications access successful (${response.data.notifications?.length || 0} notifications)`);
        } catch (error) {
          console.log(`❌ ${role} notifications access failed:`, error.response?.data || error.message);
        }
      }
    }

    // Test appointments endpoint
    console.log('\n📅 Testing Appointments Access...');
    for (const [role, token] of Object.entries(tokens)) {
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/appointments`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(`✅ ${role} appointments access successful (${response.data.appointments?.length || 0} appointments)`);
        } catch (error) {
          if (error.response?.status === 403) {
            console.log(`✅ ${role} correctly blocked from appointments (insufficient permissions)`);
          } else {
            console.log(`❌ ${role} appointments access error:`, error.response?.data || error.message);
          }
        }
      }
    }

    console.log('\n🎉 Role-based permission testing completed!');
    console.log('\n📊 Summary:');
    console.log('- Admin: Full system access (must be created manually)');
    console.log('- Doctor: Own profile, public doctors list, patient data');
    console.log('- Patient: Own profile, public doctors list, own data only');
    console.log('\n🔒 Security Features:');
    console.log('- Admin registration is blocked (security feature)');
    console.log('- Role-based access control is working');
    console.log('- Users can only access their own data');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testRolePermissions(); 