import React, { useEffect } from "react";
import maplibre from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import useMap from "../hooks";
export default function Map() {
  const { mapContainer, map, lng, lat, zoom, setLat, setLng, setZoom } =
    useMap();
  useEffect(() => {
    if (map.current) return; // initialize map only once
    console.log("Not current map so " + mapContainer.current);
    map.current = new maplibre.Map({
      container: mapContainer.current,
      style:
        "https://api.baato.io/api/v1/styles/retro?key=bpk.RbCFuyprceXfPDgW7kxOENj-7iX968-ZRiYMv4nw9cwM",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div
      style={{
        position: "absolute",
        height: "92.55vh",
        width: "100vw",
      }}
      ref={mapContainer}
      className="map-container"
    ></div>
  );
}
