import React, { useState } from 'react';
import { createReview } from '../api/core';

function StarRating({ rating, setRating }) {
  return (
    <div style={{ marginBottom: 10 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            fontSize: "30px",
            color: star <= rating ? "#FFD700" : "#ccc",
            marginRight: 4
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewForm({ onSuccess }) {
  const [form, setForm] = useState({ user_name: '', rating: 5, comment: '' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  function setField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');

    const fd = new FormData();
    fd.append('user_name', form.user_name);
    fd.append('rating', form.rating);
    fd.append('comment', form.comment);
    if (file) fd.append('image', file);

    try {
      await createReview(fd);
      setStatus('sent');
      setForm({ user_name: '', rating: 5, comment: '' });
      setFile(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className="grid">

      <input
        className="input"
        name="user_name"
        placeholder="Your name"
        value={form.user_name}
        onChange={setField}
        required
      />

      {/* ⭐ Star Rating Component */}
      <StarRating rating={form.rating} setRating={(r) => setForm({ ...form, rating: r })} />

      <textarea
        className="input"
        name="comment"
        placeholder="Comment"
        value={form.comment}
        onChange={setField}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <div style={{ display: 'flex', gap: 8 }}>
        <button className="button" type="submit">Submit Review</button>
        {status && <div className="small">Status: {status}</div>}
      </div>
    </form>
  );
}
