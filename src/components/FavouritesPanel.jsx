import React from "react";
import { Link } from "react-router-dom";

export default function FavouritesPanel({ favourites = [], properties = [], onRemove, onClear }) {
  const favProps = favourites.map((id) => properties.find((p) => p.id === id)).filter(Boolean);

  return (
    <aside className="favourites-panel" aria-label="Favourites panel">
      <h3>Favourites ({favProps.length})</h3>
      <button onClick={onClear}>Clear</button>
      <ul>
        {favProps.map((p) => (
          <li key={p.id}>
            <Link to={`/property/${p.id}`}>{p.type} — £{p.price.toLocaleString()}</Link>
            <button onClick={() => onRemove(p.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="hint">Drag items onto this panel to add (drag handling optional)</p>
    </aside>
  );
}
