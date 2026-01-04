import React from "react";
import { Link } from "react-router-dom";

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
  const withBase = (p) => {
  if (!p) return "";
  if (p.startsWith("http")) return p;
  return `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;
  };
  return (
    <article className="card" draggable="true" onDragStart={onDragStart}>
      <Link to={`/property/${property.id}`} aria-label={`View ${property.type}`}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`${property.type} thumbnail`}
            className="card-img"
            onError={(e) => {
              // hide broken image if path is wrong
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </Link>

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

      <div className="card-actions">
        <button
          onClick={() => onAddFavourite(property.id)}
          disabled={favourite}
          aria-pressed={favourite}
        >
          {favourite ? "In favourites" : "Add to favourites"}
        </button>
      </div>
    </article>
  );
}
