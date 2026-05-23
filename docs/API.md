# Healthcare Appointment App - API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
- **URL**: `/auth/register`
- **Method**: POST
- **Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "patient"
}
```

#### Login
- **URL**: `/auth/login`
- **Method**: POST
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
- **URL**: `/auth/me`
- **Method**: GET
- **Auth**: Required

### Doctors

#### Get All Doctors
- **URL**: `/doctors`
- **Method**: GET
- **Query Parameters**:
  - `specialization` (optional)
  - `hospitalId` (optional)

#### Get Doctor by ID
- **URL**: `/doctors/:id`
- **Method**: GET

#### Create Doctor (Admin only)
- **URL**: `/doctors`
- **Method**: POST
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "userId": "uuid",
  "hospitalId": "uuid",
  "specialization": "Cardiology",
  "experience": 10,
  "consultationFee": 500,
  "bio": "Doctor bio"
}
```

### Appointments

#### Book Appointment
- **URL**: `/appointments`
- **Method**: POST
- **Auth**: Required (Patient)
- **Body**:
```json
{
  "doctorId": "uuid",
  "hospitalId": "uuid",
  "appointmentDate": "2024-12-25",
  "timeSlot": "10:00 AM",
  "reason": "General checkup"
}
```

#### Get Patient Appointments
- **URL**: `/appointments/patient/my-appointments`
- **Method**: GET
- **Auth**: Required (Patient)

#### Get Appointment by ID
- **URL**: `/appointments/:id`
- **Method**: GET
- **Auth**: Required

#### Cancel Appointment
- **URL**: `/appointments/:id/cancel`
- **Method**: PUT
- **Auth**: Required (Patient)
- **Body**:
```json
{
  "reason": "Cannot make it"
}
```

#### Reschedule Appointment
- **URL**: `/appointments/:id/reschedule`
- **Method**: PUT
- **Auth**: Required (Patient)
- **Body**:
```json
{
  "appointmentDate": "2024-12-26",
  "timeSlot": "2:00 PM"
}
```

### Hospitals

#### Get All Hospitals
- **URL**: `/hospitals`
- **Method**: GET
- **Query Parameters**:
  - `city` (optional)
  - `search` (optional)

#### Get Hospital by ID
- **URL**: `/hospitals/:id`
- **Method**: GET

#### Create Hospital (Admin only)
- **URL**: `/hospitals`
- **Method**: POST
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "name": "City Hospital",
  "address": "123 Main St",
  "city": "New York",
  "phone": "1234567890",
  "email": "info@cityhospital.com"
}
```

## Response Format

All responses are in JSON format:

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Status Codes
- `200`: OK
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error
