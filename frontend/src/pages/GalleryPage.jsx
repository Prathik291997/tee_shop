import React from "react";

export default function GalleryPage() {

  const galleryItems = [
    { type: "image", src: "/gallery/WhatsApp Image 2025-11-22 at 10.57.21 AM.jpeg" },
    { type: "image", src: "/gallery/WhatsApp Image 2025-11-22 at 10.57.21 AM (1).jpeg" },
    { type: "image", src: "/gallery/WhatsApp Image 2025-11-22 at 10.57.20 AM.jpeg" },
    { type: "image", src: "/gallery/mahadhiraja-kannadiga-tshirt-02-rahtrakoota-jpg-500x500.webp" },
    { type: "image", src: "/gallery/2718_NAVY_0103_S123_JKY_1.webp" },
    { type: "video", src: "/gallery/WhatsApp Video 2025-11-22 at 10.57.30 AM.mp4" },
  ];

  return (
    <div className="card">
      <h2>Gallery</h2>
      <p className="small">All photos and videos of our shop</p>

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div key={index} className="gallery-item">
            {item.type === "image" ? (
              <img
                src={item.src}
                onError={(e) => (e.target.style.display = "none")}
                className="gallery-img"
              />
            ) : (
              <video
                src={item.src}
                controls
                onError={(e) => (e.target.style.display = "none")}
                className="gallery-video"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
