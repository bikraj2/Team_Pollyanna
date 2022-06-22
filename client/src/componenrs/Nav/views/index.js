import React from "react";
import "./nav.css";
const Nav = () => {
  return (
    <>
      <nav>
        <div className="logo">
          <h4>Pollyanna</h4>
          <ul className="nav-links">
            <li className="links">Home</li>
            <li className="links">Options</li>
            <li className="links">About Us</li>
            <li className="links">Help</li>
          </ul>
          <form className="search" placeholder="Search by District">
            <input type="search" className="searchbox" />
            <button type="submit" className="button">
              Search
            </button>
          </form>
        </div>
      </nav>
      <section className="line"></section>
    </>
  );
};

export default Nav;
