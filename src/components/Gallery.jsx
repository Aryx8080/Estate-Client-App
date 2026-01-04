import React, { useState } from "react";

export default function Gallery({ images = [] }) {
  const [index, setIndex] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div className="gallery">
      <div className="main-img">
        <img src={images[index]} alt={`img-${index}`} />
      </div>
      <div className="thumbs">
        {images.map((src, i) => (
          <button key={i} className={`thumb ${i === index ? "active" : ""}`} onClick={() => setIndex(i)}>
            <img src={src} alt={`thumb-${i}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
