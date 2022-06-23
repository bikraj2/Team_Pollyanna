import React from "react";
import "./nav.css";
const Nav = () => {
  return (
    <>
      <div className="Nav">
        <div className="logo">
          <h4>Pollyanna</h4>
        </div>
        <div className="search">
          <input
            type="search"
            className="searchbox"
            placeholder="Search by District"
          />
          <button type="submit" className="button">
            Search
          </button>
        </div>
      </div>
      <section className="line"></section>
    </>
  );
};

export default Nav;
