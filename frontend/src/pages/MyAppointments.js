import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './MyAppointments.css';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:5000/api/appointments/patient/my-appointments',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setAppointments(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id, reason) => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${id}/cancel`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
    } catch (err) {
      setError('Failed to cancel appointment');
    }
  };

  return (
    <div className="appointments-page">
      <div className="container">
        <h1>My Appointments</h1>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">Loading appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="no-results">No appointments found</div>
        ) : (
          <div className="appointments-list">
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <h3>Dr. {appointment.doctor?.User?.firstName} {appointment.doctor?.User?.lastName}</h3>
                  <span className={`status status-${appointment.status}`}>{appointment.status}</span>
                </div>
                <div className="appointment-details">
                  <p><strong>Hospital:</strong> {appointment.hospital?.name}</p>
                  <p><strong>Specialization:</strong> {appointment.doctor?.specialization}</p>
                  <p><strong>Date & Time:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()} - {appointment.timeSlot}</p>
                  <p><strong>Consultation Fee:</strong> ₹{appointment.consultationFee}</p>
                  {appointment.reason && <p><strong>Reason:</strong> {appointment.reason}</p>}
                </div>
                <div className="appointment-actions">
                  {appointment.status === 'scheduled' && (
                    <>
                      <button className="btn btn-primary">Reschedule</button>
                      <button className="btn btn-danger" onClick={() => cancelAppointment(appointment.id, 'Patient requested')}>Cancel</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
