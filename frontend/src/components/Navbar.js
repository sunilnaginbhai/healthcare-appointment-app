import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const { user, token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'AUTH_LOGOUT' });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏥 HealthCare
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/doctors" className="nav-link">Doctors</Link>
          <Link to="/hospitals" className="nav-link">Hospitals</Link>
          
          {user ? (
            <div className="navbar-user">
              <Link to="/my-appointments" className="nav-link">My Appointments</Link>
              <div className="user-info">
                <FaUser className="user-icon" />
                <span>{user.firstName}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-link">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
