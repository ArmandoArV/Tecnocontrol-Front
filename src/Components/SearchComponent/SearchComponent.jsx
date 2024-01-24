import React from "react";
import "./SearchComponent.css";

export default function SearchComponent({ searchTerm, onSearchChange }) {
  return (
    <div className="topContainer">
      <input
        type="text"
        placeholder="Search by Vehicle Name"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
}
