import React from "react";
import "./LeftLayer.css";

import locLists from "../Locations/Locations";
const LeftLayer = () => {
  function generateList() {
    const ul = document.querySelector(".list");
    locLists.forEach((data) => {
      const li = document.createElement("li");
      const div = document.createElement("div");
      const a = document.createElement("a");
      const p = document.createElement("p");
      div.classList.add("data-item");
      a.innerText = data.properties.name;
      a.href = "#";
      p.innerText = data.properties.address;
      div.appendChild(a);
      div.appendChild(p);
      li.appendChild(div);
      ul.appendChild(li);
    });
  }
  generateList();
  function popUpContent(location) {
    return `
    <div>
      <h4> ${location.properties.name} </h4>
      <p> ${location.properties.address}</p>
      <div class="callNumber"> 
        <a href="tel:${location.properties.phone}">${location.properties.phone}</a>
      </div>
    </div>
    `;
  }
  return <div className="wrapper"></div>;
};

export default LeftLayer;
