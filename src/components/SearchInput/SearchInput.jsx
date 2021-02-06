import React from "react";

import "./style.css";

const SearchInput = ({ placeholder, handleSearch, showSpinner }) => {
  return (
    <div className="search-input-container">
      <input
        placeholder={placeholder}
        onChange={handleSearch}
        className="search-input"
      />
      <div
        className="icon-container"
        style={{ display: showSpinner ? "flex" : "none" }}
      >
        <i className="loader"></i>
      </div>
    </div>
  );
};

export default SearchInput;
