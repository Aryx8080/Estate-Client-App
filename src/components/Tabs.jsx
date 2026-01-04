import React, { useState } from "react";
import withBase from "../utils/withBase";

export default function Tabs({ description, floorplan, location }) {
  const [active, setActive] = useState("description");

  return (
    <div className="tabs">
      {/* TAB BUTTONS */}
      <div className="tab-buttons">
        <button
          type="button"
          className={active === "description" ? "active" : ""}
          onClick={() => setActive("description")}
        >
          Description
        </button>

        <button
          type="button"
          className={active === "floorplan" ? "active" : ""}
          onClick={() => setActive("floorplan")}
        >
          Floor plan
        </button>

        <button
          type="button"
          className={active === "map" ? "active" : ""}
          onClick={() => setActive("map")}
        >
          Map
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="tab-content">
        {active === "description" && (
          <div className="tab-panel">
            <p>{description || "No description available."}</p>
          </div>
        )}

        {active === "floorplan" && (
          <div className="tab-panel">
            {floorplan ? (
              <img
                src={withBase(floorplan)}
                alt="Property floor plan"
                style={{
                  maxWidth: "100%",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <p>No floor plan available for this property.</p>
            )}
            onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement?.insertAdjacentHTML(
             "beforeend",
             "<p style='margin-top:10px;opacity:.8'>Floorplan image not found (check filename/case and /public/images path).</p>"
           );
          }}
          </div>
        )}

        {active === "map" && (
          <div className="tab-panel">
            <p>
              <strong>Location:</strong> {location || "Unknown"}
            </p>
            <p>(Map integration could be added here)</p>
          </div>
        )}
      </div>
    </div>
  );
}
