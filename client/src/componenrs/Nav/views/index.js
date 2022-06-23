import React from "react";
import "./nav.css";
import logo from "../../assest/images/pollyanna.png";
const Nav = () => {
  return (
    <>
      <div className="Nav">
        <img src={logo} width="94.45" height="94.45" />
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
