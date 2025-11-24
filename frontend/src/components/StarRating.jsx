import { useState } from "react";

export default function StarRating({ rating, setRating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            fontSize: "28px",
            color: star <= rating ? "#FFD700" : "#CCCCCC"
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
