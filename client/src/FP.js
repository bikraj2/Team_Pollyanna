import React, { useRef, useState, useEffect } from "react";
import maplibre from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "maplibre-gl/dist/maplibre-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Nav from "./components/Nav/nav";
import "./App.css";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

function FP() {
  const BASE_URL = "http://localhost:8000/api/a";
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(85.324);
  const [lat, setLat] = useState(27.7172);
  const [zoom, setZoom] = useState(13);
  const [boundData, setBoundData] = useState([]);
  const navigate = useNavigate();
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
  console.log(boundData);
  const navigateToAnalysePage = () => {};
  return (
    <div>
      <Nav />
      <h1>First Page</h1>
      <div ref={mapContainer} className="map-container">
        {/* <LeftLayer /> */}
        <button
          onClick={(e) => {
            e.preventDefault(e);
            axios
              .post("https://reqres.in/api/articles", boundData)
              .then((res) => {
                console.log(res);
              })
              .catch((e) => {
                console.log(e);
              });
            navigate("/analysis");
          }}
          className="buttonClass"
        >
          Analyse
        </button>
      </div>
    </div>
  );
}

export default FP;
