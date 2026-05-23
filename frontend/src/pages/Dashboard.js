import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Dashboard.css';

function Dashboard() {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="dashboard-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to HealthCare</h1>
          <p>Book appointments with top doctors from the comfort of your home</p>
          
          {!user ? (
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">Get Started</Link>
              <Link to="/login" className="btn btn-secondary">Sign In</Link>
            </div>
          ) : (
            <div className="hero-buttons">
              <Link to="/doctors" className="btn btn-primary">Browse Doctors</Link>
              <Link to="/my-appointments" className="btn btn-secondary">My Appointments</Link>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Why Choose HealthCare?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>Network of Hospitals</h3>
              <p>Connect with hundreds of hospitals and healthcare providers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Expert Doctors</h3>
              <p>Access to qualified and experienced doctors across specialties</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Easy Booking</h3>
              <p>Simple and quick appointment booking in just a few clicks</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📬</div>
              <h3>Instant Notifications</h3>
              <p>Get appointment reminders and confirmations via email</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>Ready to Book Your Appointment?</h2>
          <Link to="/doctors" className="btn btn-primary btn-large">Browse Available Doctors</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
