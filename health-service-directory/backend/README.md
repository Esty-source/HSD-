# Health Service Directory - Backend API

A comprehensive Node.js/Express backend for the Health Service Directory application with full support for all frontend features.

## 🚀 Features

### Core Features
- **User Authentication & Authorization** - JWT-based auth with role-based access control
- **Multi-Role Support** - Admin, Doctor, and Patient roles with specific permissions
- **Profile Management** - Complete user profile management with file uploads
- **Database Management** - MySQL database with automatic table creation

### Dashboard Features
- **Admin Dashboard** - Complete admin panel with analytics, user management, and system oversight
- **Doctor Dashboard** - Doctor-specific features including patient management and telemedicine
- **Patient Dashboard** - Patient portal with health tracking and appointment management

### Medical Features
- **Appointment Management** - Full appointment lifecycle (scheduling, confirmation, completion)
- **Medical Records** - Secure medical record management with file attachments
- **Prescriptions** - Digital prescription system with refill tracking
- **Health Metrics** - Patient vital signs and health data tracking
- **Telemedicine** - Video consultation session management

### Business Features
- **Billing & Payments** - Complete billing system with payment tracking
- **Analytics** - Comprehensive analytics for all user types
- **Notifications** - Real-time notification system
- **File Management** - Secure file upload and management system

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer
- **Security**: Helmet, CORS
- **Logging**: Morgan

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- XAMPP (for local development)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   cd health-service-directory/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `config.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=health_service_directory
   DB_PORT=3306

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d

   # Email Configuration (optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```

## 📊 Database Schema

The application automatically creates the following tables:

### Core Tables
- `users` - User accounts and authentication
- `profiles` - User profile information
- `doctors` - Doctor-specific information
- `patients` - Patient-specific information

### Medical Tables
- `appointments` - Appointment scheduling and management
- `medical_records` - Medical record storage
- `prescriptions` - Prescription management
- `health_metrics` - Patient vital signs and health data
- `telemedicine_sessions` - Video consultation sessions

### Business Tables
- `billing` - Payment and billing records
- `notifications` - System notifications
- `file_uploads` - File management
- `analytics` - Analytics and metrics

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /change-password` - Change password

### Users (`/api/users`) - Admin Only
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `POST /` - Create user
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user
- `PUT /:id/status` - Update user status

### Doctors (`/api/doctors`)
- `GET /` - Get all doctors
- `GET /:id` - Get doctor by ID
- `GET /specialty/:specialty` - Get doctors by specialty
- `POST /` - Create doctor (Admin only)
- `PUT /:id` - Update doctor
- `DELETE /:id` - Delete doctor (Admin only)
- `GET /my-profile` - Get current doctor's profile
- `PUT /my-profile` - Update current doctor's profile

### Patients (`/api/patients`)
- `GET /` - Get all patients (Admin/Doctor only)
- `GET /:id` - Get patient by ID
- `POST /` - Create patient
- `PUT /:id` - Update patient
- `DELETE /:id` - Delete patient (Admin only)
- `GET /my-profile` - Get current patient's profile
- `PUT /my-profile` - Update current patient's profile

### Appointments (`/api/appointments`)
- `GET /` - Get all appointments
- `GET /:id` - Get appointment by ID
- `POST /` - Create appointment
- `PUT /:id` - Update appointment
- `DELETE /:id` - Delete appointment
- `PUT /:id/status` - Update appointment status
- `GET /my-appointments` - Get current user's appointments
- `GET /doctor-appointments` - Get doctor's appointments
- `GET /patient-appointments` - Get patient's appointments
- `GET /available-slots/:doctorId/:date` - Get available time slots

### Medical Records (`/api/medical-records`)
- `GET /` - Get all medical records
- `GET /:id` - Get medical record by ID
- `POST /` - Create medical record
- `PUT /:id` - Update medical record
- `DELETE /:id` - Delete medical record
- `GET /my-records` - Get current user's records
- `GET /patient/:patientId` - Get patient's records (Doctor only)
- `GET /doctor-records` - Get doctor's created records

### Prescriptions (`/api/prescriptions`)
- `GET /` - Get all prescriptions
- `GET /:id` - Get prescription by ID
- `POST /` - Create prescription
- `PUT /:id` - Update prescription
- `DELETE /:id` - Delete prescription
- `GET /my-prescriptions` - Get current user's prescriptions
- `GET /patient/:patientId` - Get patient's prescriptions (Doctor only)
- `GET /doctor-prescriptions` - Get doctor's prescriptions
- `PUT /:id/status` - Update prescription status

### Health Metrics (`/api/health-metrics`)
- `GET /` - Get all health metrics (Patient only)
- `GET /latest` - Get latest health metrics (Patient only)
- `POST /` - Create health metrics entry (Patient only)
- `PUT /:id` - Update health metrics (Patient only)
- `DELETE /:id` - Delete health metrics (Patient only)

### Billing (`/api/billing`)
- `GET /` - Get all billing records (Admin only)
- `GET /:id` - Get billing record by ID
- `POST /` - Create billing record (Admin/Doctor only)
- `PUT /:id` - Update billing record
- `DELETE /:id` - Delete billing record (Admin only)
- `GET /my-billing` - Get current user's billing (Patient only)
- `GET /doctor-billing` - Get doctor's billing records
- `PUT /:id/status` - Update billing status
- `GET /statistics` - Get billing statistics (Admin only)

### Analytics (`/api/analytics`)
- `GET /admin` - Get admin dashboard analytics
- `GET /doctor` - Get doctor dashboard analytics
- `GET /patient` - Get patient dashboard analytics
- `POST /record` - Record analytics metric

### File Upload (`/api/upload`)
- `POST /profile-image` - Upload profile image
- `POST /medical-document` - Upload medical document
- `POST /prescription` - Upload prescription document
- `GET /my-files` - Get user's uploaded files
- `GET /files/:type` - Get files by type
- `DELETE /:id` - Delete uploaded file
- `GET /download/:id` - Download file

### Notifications (`/api/notifications`)
- `GET /` - Get all notifications
- `GET /:id` - Get notification by ID
- `POST /` - Create notification
- `PUT /:id` - Update notification
- `DELETE /:id` - Delete notification
- `GET /my-notifications` - Get current user's notifications
- `PUT /:id/read` - Mark notification as read
- `PUT /mark-all-read` - Mark all notifications as read
- `GET /unread-count` - Get unread notification count

### Telemedicine (`/api/telemedicine`)
- `GET /` - Get telemedicine sessions
- `GET /:id` - Get telemedicine session by ID
- `POST /` - Create telemedicine session
- `PUT /:id` - Update telemedicine session
- `DELETE /:id` - Delete telemedicine session

## 🔐 Authentication & Authorization

### JWT Token Structure
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "role": "admin|doctor|patient",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Role-Based Access Control
- **Admin**: Full access to all endpoints
- **Doctor**: Access to patient data, appointments, medical records, prescriptions
- **Patient**: Access to own data, appointments, health metrics

### Protected Routes
All routes except `/auth/register` and `/auth/login` require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

## 📁 File Upload System

### Supported File Types
- Images: JPEG, JPG, PNG, GIF
- Documents: PDF, DOC, DOCX, TXT
- Maximum file size: 5MB

### File Storage Structure
```
uploads/
├── profiles/     # Profile images
├── medical/      # Medical documents
├── prescriptions/ # Prescription documents
└── general/      # Other files
```

## 📊 Analytics & Metrics

### Admin Analytics
- Total users, doctors, patients, appointments
- Revenue statistics
- Monthly trends
- System performance metrics

### Doctor Analytics
- Patient demographics
- Appointment statistics
- Performance metrics
- Recent activities

### Patient Analytics
- Health trends
- Appointment history
- Prescription tracking
- Health metrics progression

## 🔧 Development

### Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (if configured)
```

### Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST` - Database host
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRES_IN` - JWT expiration time

### Database Connection
The application uses connection pooling for optimal performance and automatically handles database initialization.

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Configure production database
3. Set secure JWT secret
4. Configure CORS for production domain
5. Set up SSL certificates
6. Configure reverse proxy (nginx)

### Docker Deployment (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 API Documentation

### Request/Response Format
All API endpoints return JSON responses with the following structure:

**Success Response:**
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS protection
- Helmet security headers
- Input validation and sanitization
- File upload security
- SQL injection prevention

## 📞 Support

For support and questions:
1. Check the API documentation
2. Review the error logs
3. Test with the health check endpoint: `GET /health`
4. Verify database connection and configuration

## 🎯 Frontend Integration

The backend is fully compatible with the React frontend and provides all necessary endpoints for:
- User authentication and profile management
- Dashboard functionality for all user types
- Medical record and appointment management
- Health metrics tracking
- Billing and payment processing
- File upload and management
- Real-time notifications
- Analytics and reporting

All frontend components can seamlessly connect to these backend endpoints for a complete healthcare management system. 