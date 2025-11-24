import React, { useEffect, useState } from 'react';
import { fetchSiteInfo, fetchApprovedReviews } from '../api/core';
import EnquiryForm from '../components/EnquiryForm';
import ReviewForm from '../components/ReviewForm';
import { Link } from 'react-router-dom';

export default function Home() {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]); // ⭐ new state

  useEffect(() => {
    fetchSiteInfo()
      .then((res) => {
        if (res.data && res.data.length) setSite(res.data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // ⭐ Load ONLY approved reviews
    fetchApprovedReviews()
      .then(res => setReviews(res.data))
      .catch(err => console.log(err));

  }, []);

  const logs = [
    { image: "/logs/WhatsApp Image 2025-11-22 at 10.58.08 AM.jpeg" },
  ];

  return (
    <div>

      {/* ... your existing layout unchanged ... */}

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

          {/* ⭐ APPROVED REVIEWS SECTION */}
          <div className="card">
            <h3>What Customers Say</h3>

            {reviews.length === 0 && (
              <p className="small">No reviews yet</p>
            )}

            {reviews.map((r) => (
              <div key={r.id} style={{ marginBottom: 15 }}>
                <strong>{r.user_name}</strong> — {r.rating} ⭐
                <p className="small">{r.comment}</p>

                {r.image && (
                  <img
                    src={r.image}
                    alt="review"
                    style={{ width: 100, borderRadius: 6 }}
                  />
                )}
                <hr />
              </div>
            ))}

          </div>

        </div>

        {/* ... right side unchanged ... */}
        <aside>
          <div className="card">
            <h4>Gallery</h4>
            <Link to="/gallery">
              <img className="img-responsive" src="/wa1.jpeg" alt="gallery" />
            </Link>
            <p className="small"><Link to="/gallery">Click to view full gallery →</Link></p>
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
