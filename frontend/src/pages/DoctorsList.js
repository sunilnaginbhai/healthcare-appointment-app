import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DoctorsList.css';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    hospitalId: '',
  });

  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.specialization) params.append('specialization', filters.specialization);
      if (filters.hospitalId) params.append('hospitalId', filters.hospitalId);

      const response = await axios.get(`http://localhost:5000/api/doctors?${params}`);
      setDoctors(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="doctors-page">
      <div className="container">
        <h1>Our Doctors</h1>

        <div className="filters-section">
          <div className="form-group">
            <label>Specialization</label>
            <select name="specialization" value={filters.specialization} onChange={handleFilterChange}>
              <option value="">All Specializations</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology
</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="General Practice">General Practice</option>
            </select>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">Loading doctors...</div>
        ) : doctors.length === 0 ? (
          <div className="no-results">No doctors found</div>
        ) : (
          <div className="doctors-grid">
            {doctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-image">👨‍⚕️</div>
                <div className="doctor-info">
                  <h3>{doctor.User?.firstName} {doctor.User?.lastName}</h3>
                  <p className="specialization">{doctor.specialization}</p>
                  <p className="experience">{doctor.experience}+ years experience</p>
                  <div className="rating">
                    <span className="stars">⭐ {doctor.rating}/5</span>
                    <span className="reviews">({doctor.totalReviews} reviews)</span>
                  </div>
                  <p className="hospital">{doctor.Hospital?.name}</p>
                  <p className="fee">₹{doctor.consultationFee} per consultation</p>
                  <Link to={`/doctors/${doctor.id}`} className="btn btn-primary btn-small">
                    View & Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorsList;
