import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Gallery from "./Gallery";
import Tabs from "./Tabs";

export default function PropertyPage({
  properties = [],
  favourites = [],
  onAddFavourite,
  onRemoveFavourite,
}) {
  const { id } = useParams();

  // Find property regardless of whether ids are strings or numbers
  const property = useMemo(() => {
    if (!id) return null;
    return (properties || []).find((p) => String(p.id) === String(id));
  }, [properties, id]);

  const isFav = property ? favourites.includes(property.id) : false;

  // Prevent blank screen: show a clear message while data loads or if not found
  if (!properties || properties.length === 0) {
    return (
      <div className="property-page">
        <p>Loading property data…</p>
        <p>
          <Link to="/">← Back to search</Link>
        </p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-page">
        <h2>Property not found</h2>
        <p>
          That property id (<code>{id}</code>) doesn’t exist in <code>properties.json</code>.
        </p>
        <p>
          <Link to="/">← Back to search</Link>
        </p>
      </div>
    );
  }

  const images = Array.isArray(property.images) && property.images.length > 0
    ? property.images
    : (property.picture ? [property.picture] : []);

  return (
    <div className="property-page">
      <div className="property-header">
        <div>
          <h2>
            {property.type} — £{Number(property.price).toLocaleString()}
          </h2>
          <div style={{ color: "var(--text-muted)" }}>
            {property.bedrooms} beds • {property.location}
          </div>
        </div>

        {!isFav ? (
          <button onClick={() => onAddFavourite(property.id)}>Add to favourites</button>
        ) : (
          <button onClick={() => onRemoveFavourite(property.id)}>Remove favourite</button>
        )}
      </div>

      <Gallery images={images} />

      <Tabs
        description={property.description}
        floorplan={property.floorplan}
        location={property.location}
      />

      <p style={{ marginTop: "1rem" }}>
        <Link to="/">← Back to search</Link>
      </p>
    </div>
  );
}
