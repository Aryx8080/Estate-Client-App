import React, { useState } from "react";
import withBase from "../utils/withBase";

export default function Gallery({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="gallery">
      <div className="main-img">
        <img
          src={withBase(images[index])}
          alt={`Property image ${index + 1}`}
        />
      </div>

      <div className="thumbs">
        {images.map((src, i) => (
          <button
            key={i}
            className={`thumb ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            type="button"
          >
            <img
              src={withBase(src)}
              alt={`Thumbnail ${i + 1}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
