import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/events')
      .then((res) => setEvents(res.data.events))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load events'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading events...</div>;

  return (
    <div className="container">
      <h2>All Events</h2>
      {error && <p className="error-text">{error}</p>}
      {events.length === 0 && !error && <p className="muted">No events yet.</p>}
      {events.map((ev) => (
        <div className="card" key={ev.id}>
          <h3><Link to={`/events/${ev.id}`}>{ev.title}</Link></h3>
          <p className="muted">
            {new Date(ev.date).toLocaleString()} {ev.location ? `· ${ev.location}` : ''}
          </p>
          <p>{ev.description}</p>
          <p><strong>Price:</strong> ₹{Number(ev.price).toFixed(2)}</p>
          <p className="muted">Created by {ev.creator?.name} ({ev.creator?.role})</p>
        </div>
      ))}
    </div>
  );
}
