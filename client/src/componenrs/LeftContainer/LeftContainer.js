import React from "react";
import "./LeftContainer.css";
import locLists from "../Location/Location";
const LeftContainer = () => {
  return (
    <div className="data-list">
      <div className="heading">
        <h2>{locLists[0].type}</h2>
      </div>
      <ul className="list">
        {locLists.map((data, index) => (
          <li key={index}>
            <div className="data-item">
              <a>{data.properties.name}</a>
              <p>{data.properties.address}</p>
              <b>{data.properties.phone}</b>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LeftContainer;
