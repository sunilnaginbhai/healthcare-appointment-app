# Healthcare Appointment Booking App

A fully functional healthcare appointment booking system that allows patients to book appointments with doctors across multiple hospitals.

## Features

- **Patient Registration & Login**: Secure user authentication
- **Doctor Management**: Browse doctors by hospital and specialty
- **Appointment Booking**: Real-time slot management
- **Appointment Management**: View, cancel, reschedule appointments
- **Hospital Network**: Multiple hospitals integrated
- **Admin Dashboard**: Manage doctors, hospitals, and appointments
- **Email Notifications**: Appointment confirmations and reminders
- **User Roles**: Patient, Doctor, Admin

## Tech Stack

### Frontend
- React.js
- Redux (State Management)
- Axios (API calls)
- React Router (Navigation)
- Tailwind CSS (Styling)

### Backend
- Node.js + Express
- PostgreSQL (Database)
- JWT (Authentication)
- Nodemailer (Email notifications)
- bcryptjs (Password hashing)

## Project Structure

```
healthcare-appointment-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
└── docs/
    └── API.md
```

## Installation

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your database credentials
# Then run migrations and start server
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create `.env` file in backend directory:
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/healthcare_db
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Patients
- `GET /api/patients/profile` - Get patient profile
- `PUT /api/patients/profile` - Update patient profile
- `GET /api/patients/appointments` - Get patient appointments

### Doctors
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor details
- `GET /api/doctors/:id/slots` - Get available slots

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/:id` - Get appointment details
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Hospitals
- `GET /api/hospitals` - List all hospitals
- `GET /api/hospitals/:id` - Get hospital details

## Getting Started

1. Clone this repository
   ```bash
   git clone https://github.com/sunilnaginbhai/healthcare-appointment-app.git
   cd healthcare-appointment-app
   ```

2. Set up PostgreSQL database
   ```bash
   createdb healthcare_db
   ```

3. Install dependencies
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. Configure environment variables
   - Edit `backend/.env` with your database and email settings

5. Start the application
   ```bash
   # Terminal 1: Backend
   cd backend
   npm start

   # Terminal 2: Frontend
   cd frontend
   npm start
   ```

6. Open http://localhost:3000 in your browser

## Default Credentials

**Admin:**
- Email: admin@example.com
- Password: admin123

**Test Patient:**
- Email: patient@example.com
- Password: patient123

**Test Doctor:**
- Email: doctor@example.com
- Password: doctor123

## Features Implemented

✅ User Authentication (JWT)
✅ Patient Registration
✅ Doctor Profile Management
✅ Hospital Management
✅ Appointment Booking
✅ Appointment Cancellation
✅ Email Notifications
✅ Admin Dashboard
✅ Doctor Dashboard
✅ Patient Dashboard
✅ Search & Filter
✅ Real-time Slot Management

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For support, email: sunilnaginbhai@example.com
