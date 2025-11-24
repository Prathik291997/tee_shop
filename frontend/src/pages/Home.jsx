import React, { useEffect, useState } from 'react';
import { fetchSiteInfo, fetchApprovedReviews } from '../api/core';
import EnquiryForm from '../components/EnquiryForm';
import ReviewForm from '../components/ReviewForm';
import { Link } from 'react-router-dom';

export default function Home() {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchSiteInfo()
      .then((res) => {
        if (res.data && res.data.length) setSite(res.data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetchApprovedReviews()
      .then(res => setReviews(res.data))
      .catch(err => console.log(err));
  }, []);

  const logs = [
    { image: "/logs/WhatsApp Image 2025-11-22 at 10.58.08 AM.jpeg" },
  ];

  return (
    <div>
      {/* ======== LOG + DESCRIPTION SECTION ======== */}
      <div className="card" style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ flex: 1, maxHeight: 250, overflowY: 'auto' }}>
          <h3>Activity Log</h3>
          {logs.map((log, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 15,
                fontSize: 14,
                borderBottom: '1px solid #eee',
                paddingBottom: 4
              }}
            >
              {log.image && (
                <img
                  src={log.image}
                  alt={`log-${index}`}
                  style={{ width: 100, height: 100, objectFit: 'cover', marginRight: 8, borderRadius: 4 }}
                />
              )}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h3>About Our Shop</h3>
          <p>
            At TEE Shop, we turn your imagination into wearable art. Whether it’s for events, gifts, or your personal style, our custom T-shirt printing service makes it simple to create designs that are uniquely you. Quality, comfort, and creativity – all in one shirt.
          </p>
        </div>
      </div>

      {/* ======== SHOP INFO CARD ======== */}
      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{site?.shop_name || "TEE SHOP"}</h2>
            <div className="small" dangerouslySetInnerHTML={{ __html: site?.about_html || "" }} />
            <p>
              <a href="https://instagram.com/tee_shop_clothings" target="_blank" rel="noreferrer">
                Follow on Instagram
              </a>
            </p>
            <p className="small">Phone: +919019826766</p>
            <p className="small">
              Address: Bannur Main Rd, Chamundeshwari nagar, Mandya, Karnataka
            </p>
          </>
        )}
      </div>

      {/* ======== MIDDLE SECTION ======== */}
      <div className="two-col">
        <div>
          <div className="card">
            <h3>Enquiry Form</h3>
            <EnquiryForm onSuccess={() => alert("Enquiry sent")} />
          </div>

          <div className="card">
            <h3>Feedback</h3>
            <ReviewForm onSuccess={() => alert("Thanks for your review!")} />
          </div>

          {/* ======== APPROVED REVIEWS SECTION ======== */}
          <div className="card">
            <h3>What Customers Say</h3>
            {reviews.length === 0 && <p className="small">No reviews yet</p>}
            {reviews.map((r) => (
              <div key={r.id} style={{ marginBottom: 15 }}>
                <strong>{r.user_name}</strong> — {r.rating} ⭐
                <p className="small">{r.comment}</p>
                {r.image && (
                  <img src={r.image} alt="review" style={{ width: 100, borderRadius: 6 }} />
                )}
                <hr />
              </div>
            ))}
          </div>
        </div>

        {/* ======== RIGHT SIDE ======== */}
        <aside>
          <div className="card">
            <h4>Gallery</h4>
            <Link to="/gallery">
              <img className="img-responsive" src="/wa1.jpeg" alt="gallery" />
            </Link>
            <p className="small">
              <Link to="/gallery">Click to view full gallery →</Link>
            </p>
          </div>

          <div className="card">
            <h4>Contact</h4>
            <p className="small">Contact Name: Sachin P A</p>
            <p className="small">For more details call: +919019826766</p>
            <p className="small">
              Shop address: Bannur Main Rd, Chamundeshwari nagar, Mandya, Karnataka
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
