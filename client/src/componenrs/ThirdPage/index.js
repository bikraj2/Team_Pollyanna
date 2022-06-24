import React, { useRef, useState, useEffect } from "react";
import Nav from "../Nav/views";
import "../Page/button.css";
import maplibre from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";
import "../Page/checkbox.sass";
import "../Page/conclusion.sass";
import "../LeftContainer/LeftContainer.css";
import locLists from "../Location/Location";
import Spinner from "../spinner/spinner";
import { useNavigate } from "react-router-dom";
import proposedHos from "../Location/ProposedHos";

export default function ThirdPage() {
  const BaseURL = "http://127.0.0.1:8000/api/a";
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(85.57865705821206);
  const [lat, setLat] = useState(27.563915341941566);
  const [zoom, setZoom] = useState(9.5);
  const [boundData, setBoundData] = useState([]);
  const [timerPage, setTimerPage] = useState(0);
  let navigate = useNavigate();
  const [jsonHos, setJsonHos] = useState([]);
  //point all the json
  useEffect(() => {
    let temp = [];
    let temp1 = [];
    proposedHos.features.map((data, index) => {
      temp[index] = data.geometry.coordinates;
    });
    setJsonHos(temp);
  }, []);
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
    navigate("/");
  }

  const [school, setSchool] = useState(false);
  const [hospital, setHospital] = useState(false);

  let firstPageAc = 0;
  let secondPageAc = 0;

  return (
    <>
      {/* Navigation Bar */}
      <Nav />
      {/* Timer Page */}
      {/* {timerPage ? <Spinner /> : <div />} */}
      {/* Button At bottom */}
      <button className="buttonClass" onClick={sendData}>
        {firstPageAc
          ? "Analyse Sustainablity"
          : secondPageAc
          ? "Show the Solution"
          : "Go To Selector"}
      </button>
      {/* Map */}
      <div
        style={{
          position: "absolute",
          height: "92.55vh",
          width: "100vw",
        }}
        ref={mapContainer}
        className="map-container"
      ></div>
      {/* Left Container */}
      {firstPageAc === 0 ? (
        <div className="data-list">
          <div className="heading">
            <h2>{secondPageAc ? "Current Locations" : "Proposed Locations"}</h2>
          </div>
          <ul className="list">
            {proposedHos.features.map((data, index) => (
              <li key={index}>
                <div className="data-item">
                  <a>{index}</a>
                  <p>{`${data.geometry.coordinates[0].toFixed(
                    2
                  )} ,  ${data.geometry.coordinates[1].toFixed(2)}`}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
