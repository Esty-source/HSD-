import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/me', profileData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (userData) => api.post('/users', userData),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  updateStatus: (id, status) => api.put(`/users/${id}/status`, { status }),
};

// Doctors API
export const doctorsAPI = {
  getAll: () => api.get('/doctors'),
  getById: (id) => api.get(`/doctors/${id}`),
  getBySpecialty: (specialty) => api.get(`/doctors/specialty/${specialty}`),
  create: (doctorData) => api.post('/doctors', doctorData),
  update: (id, doctorData) => api.put(`/doctors/${id}`, doctorData),
  delete: (id) => api.delete(`/doctors/${id}`),
  updateAvailability: (id, availability) => api.put(`/doctors/${id}/availability`, availability),
  getMyProfile: () => api.get('/doctors/my-profile'),
  updateMyProfile: (profileData) => api.put('/doctors/my-profile', profileData),
};

// Patients API
export const patientsAPI = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  create: (patientData) => api.post('/patients', patientData),
  update: (id, patientData) => api.put(`/patients/${id}`, patientData),
  delete: (id) => api.delete(`/patients/${id}`),
  getMyProfile: () => api.get('/patients/my-profile'),
  updateMyProfile: (profileData) => api.put('/patients/my-profile', profileData),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (appointmentData) => api.post('/appointments', appointmentData),
  update: (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData),
  delete: (id) => api.delete(`/appointments/${id}`),
  updateStatus: (id, status) => api.put(`/appointments/${id}/status`, { status }),
  getMyAppointments: () => api.get('/appointments/my-appointments'),
  getDoctorAppointments: () => api.get('/appointments/doctor-appointments'),
  getPatientAppointments: () => api.get('/appointments/patient-appointments'),
  getAvailableSlots: (doctorId, date) => api.get(`/appointments/available-slots/${doctorId}/${date}`),
};

// Medical Records API
export const medicalRecordsAPI = {
  getAll: () => api.get('/medical-records'),
  getById: (id) => api.get(`/medical-records/${id}`),
  create: (recordData) => api.post('/medical-records', recordData),
  update: (id, recordData) => api.put(`/medical-records/${id}`, recordData),
  delete: (id) => api.delete(`/medical-records/${id}`),
  getMyRecords: () => api.get('/medical-records/my-records'),
  getPatientRecords: (patientId) => api.get(`/medical-records/patient/${patientId}`),
  getDoctorRecords: () => api.get('/medical-records/doctor-records'),
};

// Prescriptions API
export const prescriptionsAPI = {
  getAll: () => api.get('/prescriptions'),
  getById: (id) => api.get(`/prescriptions/${id}`),
  create: (prescriptionData) => api.post('/prescriptions', prescriptionData),
  update: (id, prescriptionData) => api.put(`/prescriptions/${id}`, prescriptionData),
  delete: (id) => api.delete(`/prescriptions/${id}`),
  getMyPrescriptions: () => api.get('/prescriptions/my-prescriptions'),
  getPatientPrescriptions: (patientId) => api.get(`/prescriptions/patient/${patientId}`),
  getDoctorPrescriptions: () => api.get('/prescriptions/doctor-prescriptions'),
  updateStatus: (id, status) => api.put(`/prescriptions/${id}/status`, { status }),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  getById: (id) => api.get(`/notifications/${id}`),
  create: (notificationData) => api.post('/notifications', notificationData),
  update: (id, notificationData) => api.put(`/notifications/${id}`, notificationData),
  delete: (id) => api.delete(`/notifications/${id}`),
  getMyNotifications: () => api.get('/notifications/my-notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/mark-all-read'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
};

// Telemedicine API
export const telemedicineAPI = {
  getAll: () => api.get('/telemedicine'),
  getById: (id) => api.get(`/telemedicine/${id}`),
  create: (sessionData) => api.post('/telemedicine', sessionData),
  update: (id, sessionData) => api.put(`/telemedicine/${id}`, sessionData),
  delete: (id) => api.delete(`/telemedicine/${id}`),
  getMySessions: () => api.get('/telemedicine'),
  startSession: (id) => api.put(`/telemedicine/${id}/start`),
  endSession: (id) => api.put(`/telemedicine/${id}/end`),
};

// Health Metrics API
export const healthMetricsAPI = {
  getAll: () => api.get('/health-metrics'),
  getLatest: () => api.get('/health-metrics/latest'),
  create: (metricsData) => api.post('/health-metrics', metricsData),
  update: (id, metricsData) => api.put(`/health-metrics/${id}`, metricsData),
  delete: (id) => api.delete(`/health-metrics/${id}`),
  getTrends: (period) => api.get(`/health-metrics/trends/${period}`),
};

// Billing API
export const billingAPI = {
  getAll: () => api.get('/billing'),
  getById: (id) => api.get(`/billing/${id}`),
  create: (billingData) => api.post('/billing', billingData),
  update: (id, billingData) => api.put(`/billing/${id}`, billingData),
  delete: (id) => api.delete(`/billing/${id}`),
  getMyBilling: () => api.get('/billing/my-billing'),
  getDoctorBilling: () => api.get('/billing/doctor-billing'),
  updateStatus: (id, status) => api.put(`/billing/${id}/status`, { status }),
  getStatistics: () => api.get('/billing/statistics'),
};

// Analytics API
export const analyticsAPI = {
  getAdminAnalytics: () => api.get('/analytics/admin'),
  getDoctorAnalytics: () => api.get('/analytics/doctor'),
  getPatientAnalytics: () => api.get('/analytics/patient'),
  recordMetric: (metricData) => api.post('/analytics/record', metricData),
  getDashboardMetrics: (type) => api.get(`/analytics/dashboard/${type}`),
};

// File Upload API
export const uploadAPI = {
  uploadProfileImage: (file) => {
    const formData = new FormData();
    formData.append('profile_image', file);
    return api.post('/upload/profile-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  uploadMedicalDocument: (file, relatedId, description) => {
    const formData = new FormData();
    formData.append('medical_document', file);
    if (relatedId) formData.append('related_id', relatedId);
    if (description) formData.append('description', description);
    return api.post('/upload/medical-document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  uploadPrescription: (file, relatedId) => {
    const formData = new FormData();
    formData.append('prescription', file);
    if (relatedId) formData.append('related_id', relatedId);
    return api.post('/upload/prescription', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getMyFiles: () => api.get('/upload/my-files'),
  getFilesByType: (type) => api.get(`/upload/files/${type}`),
  deleteFile: (id) => api.delete(`/upload/${id}`),
  downloadFile: (id) => api.get(`/upload/download/${id}`, { responseType: 'blob' }),
};

// Mock data for development (when backend is not available)
export const mockData = {
  appointments: [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-03-20",
      time: "10:00 AM",
      status: "confirmed",
      type: "In-person"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-03-25",
      time: "2:30 PM",
      status: "pending",
      type: "Telemedicine"
    }
  ],
  doctors: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.8,
      experience: 15,
      hospital: "City General Hospital"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      rating: 4.9,
      experience: 12,
      hospital: "Skin Care Clinic"
    }
  ],
  patients: [
    {
      id: 1,
      name: "John Doe",
      age: 35,
      gender: "Male",
      email: "john.doe@example.com",
      phone: "+1234567890"
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      gender: "Female",
      email: "jane.smith@example.com",
      phone: "+1234567891"
    }
  ]
};

export default api;
