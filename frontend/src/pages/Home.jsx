import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to Evently</h1>
        <p className="muted">A simple event management system — create, browse, register, and pay for events.</p>
        {!user && (
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <Link className="btn" to="/login">Log In</Link>
            <Link className="btn secondary" to="/register">Register</Link>
          </div>
        )}
        {user && (
          <Link className="btn" to="/events" style={{ marginTop: 14, display: 'inline-block' }}>
            Browse Events
          </Link>
        )}
      </div>
    </div>
  );
}
