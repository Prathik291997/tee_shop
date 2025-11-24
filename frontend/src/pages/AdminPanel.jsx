import React, { useEffect, useState } from 'react';
import { listEnquiries, listReviews, patchEnquiry, patchReview } from '../api/core';

// Use .env values or fallback
const OWNER_USER = process.env.REACT_APP_ADMIN_USER || 'admin';
const OWNER_PASSWORD = process.env.REACT_APP_ADMIN_PASS || '1234';

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [enquiries, setEnquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed]);

  async function fetchData() {
    setLoading(true);
    try {
      const [eRes, rRes] = await Promise.all([listEnquiries(), listReviews()]);
      setEnquiries(eRes.data);
      setReviews(rRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    setLoading(false);
  }

  function login(e) {
    e.preventDefault();
    if (username === OWNER_USER && password === OWNER_PASSWORD) {
      setAuthed(true);
    } else {
      alert('Wrong username or password');
    }
  }

  async function markContacted(id) {
    try {
      await patchEnquiry(id, { contacted: true });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  async function approveReview(id) {
    try {
      await patchReview(id, { approved: true });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  if (!authed) {
    return (
      <div className="card" style={{ maxWidth: 420, margin: '40px auto' }}>
        <h3>Owner Login</h3>
        <form onSubmit={login} className="grid">
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Owner password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      {loading && <p>Loading...</p>}

      <div className="card">
        <h3>Enquiries</h3>
        {enquiries.length === 0 && <p className="small">No enquiries</p>}
        {enquiries.map((e) => (
          <div key={e.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <b>{e.name}</b> — {e.phone} — {e.city}
            <div className="small">{new Date(e.created_at).toLocaleString()}</div>
            {!e.contacted && (
              <button className="button" onClick={() => markContacted(e.id)} style={{ marginTop: 8 }}>
                Mark Contacted
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Reviews</h3>
        {reviews.length === 0 && <p className="small">No reviews</p>}
        {reviews.map((r) => (
          <div key={r.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <b>{r.user_name}</b> — {r.rating} stars
            <p>{r.comment}</p>
            {r.image && <img src={r.image} alt="review" style={{ maxWidth: 200, display: 'block', marginTop: 8 }} />}
            {!r.approved && (
              <button className="button" onClick={() => approveReview(r.id)} style={{ marginTop: 8 }}>
                Approve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
