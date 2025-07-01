import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  create: (appointmentData) => api.post('/appointments', appointmentData),
  update: (id, updateData) => api.put(`/appointments/${id}`, updateData),
  delete: (id) => api.delete(`/appointments/${id}`),
};

// Doctors API
export const doctorsAPI = {
  getAll: (params) => api.get('/doctors', { params }),
  getSpecialties: () => api.get('/doctors/specialties'),
  getAvailableSlots: (doctorId, date) => 
    api.get('/doctors/available-slots', { params: { doctorId, date } }),
  getById: (id) => api.get(`/doctors/${id}`),
  updateProfile: (id, profileData) => api.put(`/doctors/${id}`, profileData),
};

// Profiles API
export const profilesAPI = {
  getMyProfile: () => api.get('/profiles/me'),
  updateMyProfile: (profileData) => api.put('/profiles/me', profileData),
  getMyAppointments: () => api.get('/profiles/me/appointments'),
};

export default api;
