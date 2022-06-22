import React, { useRef, useState, useEffect } from "react";
import LeftContainer from "../LeftContainer/LeftContainer";
import Nav from "../Nav/views";
import "./button.css";
import maplibre from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";
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
  return (
    <>
      <Nav />
      <button className="buttonClass" onClick={sendData}>
        Analyse
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
      <LeftContainer />
    </>
  );
}
