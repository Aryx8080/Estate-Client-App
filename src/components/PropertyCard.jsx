import React from "react";
import { Link } from "react-router-dom";
import withBase from "../utils/withBase";

export default function PropertyCard({ property, onAddFavourite, favourite }) {
  // Use first gallery image as the card thumbnail
  const thumbnail =
    (Array.isArray(property.images) && property.images.length > 0 && property.images[0]) ||
    property.picture ||
    "";

  const onDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ kind: "property", id: property.id }));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <article className="card" draggable="true" onDragStart={onDragStart}>
      {/* Make the whole top area clickable (more reliable UX) */}
      <Link to={`/property/${property.id}`} className="card-link" aria-label={`View ${property.type}`}>
        {thumbnail ? (
          <img
            src={withBase(thumbnail)}
            alt={`${property.type} thumbnail`}
            className="card-img"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}

        <div className="card-body">
          <h3>
            {property.type} — £{Number(property.price).toLocaleString()}
          </h3>
          <p>{String(property.description || "").slice(0, 120)}...</p>

          <div className="card-meta">
            <span>{property.bedrooms} beds</span>
            <span>{property.location}</span>
          </div>
        </div>
      </Link>

      <div className="card-actions">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault(); // prevent Link navigation when clicking button
            onAddFavourite(property.id);
          }}
          disabled={favourite}
          aria-pressed={favourite}
        >
          {favourite ? "In favourites" : "Add to favourites"}
        </button>
      </div>
    </article>
  );
}
