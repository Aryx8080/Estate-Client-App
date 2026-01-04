import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import Results from "./components/Results";
import PropertyPage from "./components/PropertyPage";
import FavouritesPanel from "./components/FavouritesPanel";

// load JSON (public path)
const PROPERTIES_URL = "/properties.json";

export default function App() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favourites")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetch(PROPERTIES_URL)
      .then((r) => r.json())
      .then((data) => {
        setProperties(data.properties);
        setFiltered(data.properties);
      })
      .catch((err) => console.error("Failed to load properties:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (id) => {
    if (!favourites.includes(id)) setFavourites([...favourites, id]);
  };

  const removeFavourite = (id) =>
    setFavourites((prev) => prev.filter((pid) => pid !== id));

  const clearFavourites = () => setFavourites([]);

  return (
    <div className="app">
      <header className="header">
        <Link to="/"><h1>Estate Client App</h1></Link>
        <nav>
          <Link to="/">Search</Link>
        </nav>
      </header>

      <div className="main-grid">
        <FavouritesPanel
          favourites={favourites}
          properties={properties}
          onRemove={removeFavourite}
          onClear={clearFavourites}
        />

        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchForm
                    properties={properties}
                    setFiltered={setFiltered}
                  />
                  <Results
                    properties={filtered}
                    onAddFavourite={addFavourite}
                    favourites={favourites}
                  />
                </>
              }
            />
            <Route
              path="/property/:id"
              element={
                <PropertyPage
                  properties={properties}
                  onAddFavourite={addFavourite}
                  favourites={favourites}
                  onRemoveFavourite={removeFavourite}
                />
              }
            />
          </Routes>
        </main>
      </div>

      <footer className="footer">Coursework - Advanced Client-Side Web Dev</footer>
    </div>
  );
}
