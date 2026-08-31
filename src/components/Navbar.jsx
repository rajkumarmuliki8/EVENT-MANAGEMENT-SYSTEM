import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Evently</Link>
      <div className="links">
        {user ? (
          <>
            <Link to="/events">Events</Link>
            <Link to="/events/create">Create Event</Link>
            {user.role === 'admin' ? (
              <>
                <Link to="/admin/participants">Participants</Link>
                <Link to="/admin/payments">Payments</Link>
              </>
            ) : (
              <Link to="/my-payments">My Payments</Link>
            )}
            <span className="muted">{user.name} ({user.role})</span>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
