import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DoctorsList from './pages/DoctorsList';
import DoctorDetail from './pages/DoctorDetail';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import HospitalsList from './pages/HospitalsList';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);

  useEffect(() => {
    // Check if user is logged in
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      // Restore user session
      dispatch({
        type: 'AUTH_LOGIN',
        payload: { user: JSON.parse(storedUser), token: storedToken }
      });
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/appointments/book/:doctorId" element={user ? <BookAppointment /> : <Navigate to="/login" />} />
        <Route path="/my-appointments" element={user ? <MyAppointments /> : <Navigate to="/login" />} />
        <Route path="/hospitals" element={<HospitalsList />} />
      </Routes>
    </Router>
  );
}

export default App;
