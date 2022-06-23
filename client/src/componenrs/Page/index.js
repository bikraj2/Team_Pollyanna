import React, { useRef, useState, useEffect } from "react";
import Nav from "../Nav/views";
import "./button.css";
import maplibre from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";
import "./checkbox.sass";
import "./conclusion.sass";
import "../LeftContainer/LeftContainer.css";
import locLists from "../Location/Location";

export default function Page() {
  const BaseURL = "http://127.0.0.1:8000/api/a";
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(85.324);
  const [lat, setLat] = useState(27.7172);
  const [zoom, setZoom] = useState(13);
  const [boundData, setBoundData] = useState([]);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new maplibre.Map({
      container: mapContainer.current,
      style:
        "https://api.baato.io/api/v1/styles/retro?key=bpk.RbCFuyprceXfPDgW7kxOENj-7iX968-ZRiYMv4nw9cwM",
      center: [lng, lat],
      zoom: zoom,
    });
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      color: "red",
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });

    map.current.addControl(draw);

    map.current.on("draw.create", updateArea);

    map.current.on("draw.delete", updateArea);

    map.current.on("draw.update", updateArea);

    function updateArea(e) {
      const data = draw.getAll();
      setBoundData(data);
      console.log(data);
    }
  });
  function sendData() {
    console.log("here we are");
    if (secondPageAc) {
      setThirdPageAc(1);
      setSecondPageAc(0);
    }
    if (firstPageAc) {
      setSecondPageAc(1);
      setFirstPageAc(0);
    }
    if (thirdPageAc) {
      setFirstPageAc(1);
      setThirdPageAc(0);
    }
    axios
      .post(BaseURL, boundData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  console.log(boundData);

  const [school, setSchool] = useState(false);
  const [hospital, setHospital] = useState(false);

  const [firstPageAc, setFirstPageAc] = useState(1);
  const [secondPageAc, setSecondPageAc] = useState(0);
  const [thirdPageAc, setThirdPageAc] = useState(0);
  return (
    <>
      <Nav />
      <button className="buttonClass" onClick={sendData}>
        {firstPageAc
          ? "Analyse Sustainablity"
          : secondPageAc
          ? "Show the Solution"
          : "Go To Selector"}
      </button>
      <div
        style={{
          position: "absolute",
          height: "92.55vh",
          width: "100vw",
        }}
        ref={mapContainer}
        className="map-container"
      ></div>
      {firstPageAc === 0 ? (
        <div className="data-list">
          <div className="heading">
            <h2>{secondPageAc ? "Current Locations" : "Proposed Locations"}</h2>
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
      ) : (
        <div></div>
      )}
      <div className={firstPageAc ? "checkbox active" : "checkbox"}>
        <div className="topic">
          <h3> What data you want to analyse ? </h3>
        </div>
        <div className="checkboxs">
          <div>
            <input
              type="checkbox"
              id="hospital"
              name="hospital"
              value="hospital"
              onChange={(e) => {
                if (e.target.value === "hospital") {
                  setHospital(true);
                } else {
                  setHospital(false);
                }
              }}
            />
            <label for="hospital"> Hospital</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="school"
              name="school"
              value="school"
              onChange={(e) => {
                if (e.target.value === "school") {
                  setSchool(true);
                } else {
                  setSchool(false);
                }
              }}
            />
            <label for="school"> School </label>
          </div>
          <div>
            <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
            <label for="vehicle3"> I have a boat</label>
          </div>
        </div>
      </div>
      <div className={firstPageAc !== 0 ? "conclusion" : "conclusion active"}>
        <h2>Valididty</h2>
      </div>
    </>
  );
}
