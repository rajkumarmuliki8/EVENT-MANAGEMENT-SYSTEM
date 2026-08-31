import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '', price: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await api.post('/events', {
        ...form,
        price: form.price ? Number(form.price) : 0,
      });
      navigate(`/events/${res.data.event.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input value={form.title} onChange={update('title')} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={4} value={form.description} onChange={update('description')} />
          </div>
          <div className="form-group">
            <label>Date &amp; Time</label>
            <input type="datetime-local" value={form.date} onChange={update('date')} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input value={form.location} onChange={update('location')} />
          </div>
          <div className="form-group">
            <label>Price (₹)</label>
            <input type="number" min="0" step="0.01" value={form.price} onChange={update('price')} />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button className="btn" type="submit" disabled={busy}>
            {busy ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
}
