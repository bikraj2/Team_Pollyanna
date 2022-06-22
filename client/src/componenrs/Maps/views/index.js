import React from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import useMap from "../hooks";
export default function Map() {
  const { mapContainer } = useMap();
  return (
    <div
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        float: "right",
        zIndex: "10",
      }}
      ref={mapContainer}
      className="map-container"
    ></div>
  );
}
