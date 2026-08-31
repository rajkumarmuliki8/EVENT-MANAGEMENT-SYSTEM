import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminParticipants() {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/participants')
      .then((res) => setRegistrations(res.data.registrations))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load registrations'));
  }, []);

  return (
    <div className="container">
      <h2>Participant Events</h2>
      {error && <p className="error-text">{error}</p>}
      <div className="card">
        <table>
          <thead>
            <tr><th>Participant</th><th>Email</th><th>Event</th><th>Registered At</th></tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id}>
                <td>{r.participant?.name}</td>
                <td>{r.participant?.email}</td>
                <td>{r.event?.title}</td>
                <td>{new Date(r.registered_at || r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {registrations.length === 0 && <p className="muted">No registrations yet.</p>}
      </div>
    </div>
  );
}
