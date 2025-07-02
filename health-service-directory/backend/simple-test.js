const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('Testing Backend API...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check:', healthResponse.data);

    // Test registration
    console.log('\n2. Testing registration...');
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'patient'
    };
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
      console.log('✅ Registration:', registerResponse.data);
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('⚠️ User already exists (expected for testing)');
      } else {
        console.log('❌ Registration error:', error.response?.data || error.message);
      }
    }

    // Test login
    console.log('\n3. Testing login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log('✅ Login successful');
    
    const token = loginResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };

    // Test profile endpoint
    console.log('\n4. Testing profile endpoint...');
    try {
      const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, { headers });
      console.log('✅ Profile:', profileResponse.data);
    } catch (error) {
      console.log('❌ Profile error:', error.response?.data || error.message);
    }

    // Test notifications endpoint
    console.log('\n5. Testing notifications endpoint...');
    try {
      const notificationsResponse = await axios.get(`${BASE_URL}/notifications/my-notifications`, { headers });
      console.log('✅ Notifications:', notificationsResponse.data);
    } catch (error) {
      console.log('❌ Notifications error:', error.response?.data || error.message);
    }

    // Test users endpoint
    console.log('\n6. Testing users endpoint...');
    try {
      const usersResponse = await axios.get(`${BASE_URL}/users`, { headers });
      console.log('✅ Users:', usersResponse.data);
    } catch (error) {
      console.log('❌ Users error:', error.response?.data || error.message);
    }

    console.log('\n🎉 API testing completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI(); 