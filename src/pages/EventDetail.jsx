import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function EventDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then((res) => setEvent(res.data.event))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load event'));
  }, [id]);

  async function handleRegister() {
    setBusy(true);
    setStatus('');
    try {
      const res = await api.post(`/events/${id}/register`);
      setRegistrationId(res.data.registration.id);
      setStatus('Registered! You can now pay below.');
    } catch (err) {
      setStatus(err.response?.data?.error || 'Registration failed');
    } finally {
      setBusy(false);
    }
  }

  async function handlePay() {
    if (!registrationId) return;
    setBusy(true);
    setStatus('');
    try {
      await api.post('/payments', { registrationId });
      setStatus('Payment completed!');
      setPaid(true);
    } catch (err) {
      setStatus(err.response?.data?.error || 'Payment failed');
    } finally {
      setBusy(false);
    }
  }

  if (error) return <div className="container error-text">{error}</div>;
  if (!event) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2>{event.title}</h2>
        <p className="muted">
          {new Date(event.date).toLocaleString()} {event.location ? `· ${event.location}` : ''}
        </p>
        <p>{event.description}</p>
        <p><strong>Price:</strong> ₹{Number(event.price).toFixed(2)}</p>
        <p className="muted">Created by {event.creator?.name} ({event.creator?.role})</p>

        {user?.role === 'participant' && (
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <button className="btn" onClick={handleRegister} disabled={busy || !!registrationId}>
              {registrationId ? 'Registered' : 'Register for Event'}
            </button>
            <button className="btn secondary" onClick={handlePay} disabled={busy || !registrationId || paid}>
              {paid ? 'Paid' : `Pay ₹${Number(event.price).toFixed(2)}`}
            </button>
          </div>
        )}
        {status && <p className="muted" style={{ marginTop: 10 }}>{status}</p>}
      </div>
    </div>
  );
}
