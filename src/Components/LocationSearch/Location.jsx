import React, { useState } from "react";
import "./Location.css";

const mockLocations = [
  { name: "1226 Univercity Dr", city: "Menlo Park", country: "USA" },
  { name: "1226 Univercity Dr", city: "Dekalb", country: "USA" },
  { name: "1771 Univercity Dr Unit 1226", city: "Plantation", country: "USA" },
  { name: "921 W Univercity Dr #1226", city: "Mesa", country: "USA" },
  { name: "1226 King's Road", city: "London", country: "UK" },
  { name: "1226 Broadway Ave", city: "New York", country: "USA" },
];

export default function Location({ onLocationSelect }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFiltered([]);
      return;
    }

    const matches = mockLocations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(value.toLowerCase()) ||
        loc.city.toLowerCase().includes(value.toLowerCase()) ||
        loc.country.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(matches);
  };

  const handleSelect = (location) => {
    const locationString = `${location.name}, ${location.city}, ${location.country}`;
    setQuery(locationString);
    setFiltered([]);

    // Update the main formData state immediately
    if (onLocationSelect) {
      onLocationSelect(locationString);
    }
  };



  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search location..."
          className="search-input"
        />
       
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="gray"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
          />
        </svg>
      </div>

      {filtered.length > 0 && (
        <div className="results-list">
          {filtered.map((loc, index) => (
            <div
              key={index}
              className="result-card"
              onClick={() => handleSelect(loc)}
            >
              <p className="result-title">{loc.name}</p>
              <p className="result-subtitle">
                {loc.city}, {loc.country}
              </p>
            </div>
          ))}
        </div>
      )}

      {query && filtered.length === 0 && (
        <div className="no-results">No results found</div>
      )}
    </div>
  );
}
