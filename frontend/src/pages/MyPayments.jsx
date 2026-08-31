import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/payments/mine')
      .then((res) => setPayments(res.data.payments))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load payments'));
  }, []);

  return (
    <div className="container">
      <h2>My Payments</h2>
      {error && <p className="error-text">{error}</p>}
      <div className="card">
        <table>
          <thead>
            <tr><th>Event</th><th>Amount</th><th>Status</th><th>Paid At</th></tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.registration?.event?.title}</td>
                <td>₹{Number(p.amount).toFixed(2)}</td>
                <td><span className={`badge ${p.status}`}>{p.status}</span></td>
                <td>{p.paidAt ? new Date(p.paidAt).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && <p className="muted">No payments yet.</p>}
      </div>
    </div>
  );
}
