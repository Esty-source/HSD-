const axios = require('axios');

const BACKEND_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:5173';

async function testIntegration() {
  console.log('🔗 Testing Frontend-Backend Integration...\n');

  try {
    // Test 1: Backend Health Check
    console.log('1. Testing Backend Health...');
    const backendHealth = await axios.get('http://localhost:5000/health');
    console.log('✅ Backend is running:', backendHealth.data);

    // Test 2: Frontend Accessibility
    console.log('\n2. Testing Frontend Accessibility...');
    try {
      const frontendResponse = await axios.get(FRONTEND_URL, { timeout: 5000 });
      console.log('✅ Frontend is accessible (status:', frontendResponse.status + ')');
    } catch (error) {
      console.log('⚠️ Frontend may not be ready yet (this is normal during startup)');
    }

    // Test 3: User Registration
    console.log('\n3. Testing User Registration...');
    const testUser = {
      name: 'Integration Test User',
      email: 'integration@test.com',
      password: 'testpass123',
      role: 'patient'
    };

    try {
      const registerResponse = await axios.post(`${BACKEND_URL}/auth/register`, testUser);
      console.log('✅ Registration successful:', registerResponse.data.message);
      
      // Test 4: User Login
      console.log('\n4. Testing User Login...');
      const loginResponse = await axios.post(`${BACKEND_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ Login successful');
      
      const token = loginResponse.data.token;
      const headers = { Authorization: `Bearer ${token}` };

      // Test 5: Profile Access
      console.log('\n5. Testing Profile Access...');
      const profileResponse = await axios.get(`${BACKEND_URL}/auth/profile`, { headers });
      console.log('✅ Profile access successful');

      // Test 6: Notifications Access
      console.log('\n6. Testing Notifications Access...');
      const notificationsResponse = await axios.get(`${BACKEND_URL}/notifications/my-notifications`, { headers });
      console.log('✅ Notifications access successful');

      console.log('\n🎉 Integration Test Results:');
      console.log('✅ Backend API is working');
      console.log('✅ User registration works');
      console.log('✅ User login works');
      console.log('✅ Profile access works');
      console.log('✅ Notifications access works');
      console.log('✅ JWT authentication is working');
      console.log('\n📋 Next Steps:');
      console.log('1. Open http://localhost:5173 in your browser');
      console.log('2. Try registering a new user with role selection');
      console.log('3. Test login and dashboard access');
      console.log('4. Verify real-time data instead of mock data');

    } catch (error) {
      if (error.response?.status === 409) {
        console.log('⚠️ Test user already exists, trying login...');
        
        // Try login instead
        const loginResponse = await axios.post(`${BACKEND_URL}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        console.log('✅ Login successful with existing user');
      } else {
        console.log('❌ Registration/Login failed:', error.response?.data || error.message);
      }
    }

  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure backend is running: npm start (in backend directory)');
    console.log('2. Make sure frontend is running: npm run dev (in root directory)');
    console.log('3. Check that ports 5000 and 5173 are available');
  }
}

testIntegration(); 