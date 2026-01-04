import React from "react";
import PropertyCard from "./PropertyCard";
import { Link } from "react-router-dom";

export default function Results({ properties = [], onAddFavourite, favourites }) {
  if (!properties || properties.length === 0) {
    return <div className="results empty">No results found</div>;
  }
  return (
    <section className="results">
      <h2>Results ({properties.length})</h2>
      <div className="cards">
        {properties.map((p) => (
          <PropertyCard
            key={p.id}
            property={p}
            favourite={favourites.includes(p.id)}
            onAddFavourite={onAddFavourite}
          />
        ))}
      </div>
    </section>
  );
}
