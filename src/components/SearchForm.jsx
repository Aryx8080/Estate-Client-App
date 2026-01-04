import React, { useMemo, useState } from "react";
import Slider from "rc-slider";
import DatePicker from "react-datepicker";
import "rc-slider/assets/index.css";
import filterProperties from "../utils/filterProperties";

export default function SearchForm({ properties, setFiltered }) {
  const postcodeOptions = useMemo(() => {
    const set = new Set();
    for (const p of properties || []) {
      const match = String(p.location || "").match(/\b([A-Z]{1,2}\d{1,2})\b/i);
      if (match) set.add(match[1].toUpperCase());
    }
    return Array.from(set).sort();
  }, [properties]);

  const [criteria, setCriteria] = useState({
    type: "any",
    minBeds: "",
    maxBeds: "",
    postcode: "",
    dateFrom: null,
    dateTo: null,
    priceRange: [0, 1500000],
  });

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      type: criteria.type,
      minBeds: criteria.minBeds,
      maxBeds: criteria.maxBeds,
      postcode: criteria.postcode,
      dateFrom: criteria.dateFrom ? criteria.dateFrom.toISOString().slice(0, 10) : "",
      dateTo: criteria.dateTo ? criteria.dateTo.toISOString().slice(0, 10) : "",
      minPrice: criteria.priceRange[0],
      maxPrice: criteria.priceRange[1],
    };
    setFiltered(filterProperties(properties, payload));
  };

  const reset = () => {
    setCriteria({
      type: "any",
      minBeds: "",
      maxBeds: "",
      postcode: "",
      dateFrom: null,
      dateTo: null,
      priceRange: [0, 1500000],
    });
    setFiltered(properties);
  };

  return (
    <form className="search-form" onSubmit={submit} aria-label="Property search form">
      <div className="form-row">
        <label>
          Type
          <select
            name="type"
            value={criteria.type}
            onChange={(e) => setCriteria((c) => ({ ...c, type: e.target.value }))}
          >
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </label>

        <label>
          Min beds
          <input
            type="number"
            value={criteria.minBeds}
            min={0}
            onChange={(e) => setCriteria((c) => ({ ...c, minBeds: e.target.value }))}
          />
        </label>

        <label>
          Max beds
          <input
            type="number"
            value={criteria.maxBeds}
            min={0}
            onChange={(e) => setCriteria((c) => ({ ...c, maxBeds: e.target.value }))}
          />
        </label>

        <label>
          Postcode area
          <input
            list="postcodeAreas"
            placeholder="e.g. BR1"
            value={criteria.postcode}
            onChange={(e) => setCriteria((c) => ({ ...c, postcode: e.target.value }))}
          />
          <datalist id="postcodeAreas">
            {postcodeOptions.map((pc) => (
              <option key={pc} value={pc} />
            ))}
          </datalist>
        </label>
      </div>

      <div className="form-row" style={{ marginTop: "0.75rem" }}>
        <label>
          Date from
          <DatePicker
            selected={criteria.dateFrom}
            onChange={(d) => setCriteria((c) => ({ ...c, dateFrom: d }))}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
          />
        </label>

        <label>
          Date to
          <DatePicker
            selected={criteria.dateTo}
            onChange={(d) => setCriteria((c) => ({ ...c, dateTo: d }))}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
          />
        </label>

        <div style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, color: "var(--text-muted)" }}>
            <span>Price range</span>
            <span>
              £{criteria.priceRange[0].toLocaleString()} – £{criteria.priceRange[1].toLocaleString()}
            </span>
          </div>
          <Slider
            range
            min={0}
            max={1500000}
            step={5000}
            value={criteria.priceRange}
            onChange={(range) => setCriteria((c) => ({ ...c, priceRange: range }))}
            ariaLabelForHandle={["Min price", "Max price"]}
          />
        </div>

        <div className="form-actions">
          <button type="submit">Search</button>
          <button type="button" onClick={reset}>Reset</button>
        </div>
      </div>
    </form>
  );
}
