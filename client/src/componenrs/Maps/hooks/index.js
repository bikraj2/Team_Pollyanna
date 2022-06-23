import { useState, useRef, useEffect } from "react";
import maplibre from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";

const useMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(85.324);
  const [lat, setLat] = useState(27.7172);
  const [zoom, setZoom] = useState(13);
  const [boundData, setBoundData] = useState();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new maplibre.Map({
      container: mapContainer.current,
      style:
        "https://api.baato.io/api/v1/styles/retro?key=bpk.RbCFuyprceXfPDgW7kxOENj-7iX968-ZRiYMv4nw9cwM",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(draw.attributionControl(), "top-left");
  });

  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
    attributionControl: false,
    defaultMode: "draw_polygon",
  });
  console.log(map.current);
  if (map.current) {
    map.current.on("draw.create", updateArea);

    map.current.on("draw.delete", updateArea);

    map.current.on("draw.update", updateArea);
  }

  function updateArea() {
    const data = draw.getAll();
    setBoundData(data);
    console.log(data);
  }

  return {
    mapContainer,
    map,
    lng,
    lat,
    zoom,
    setLat,
    setLng,
    setZoom,
    sendData,
  };
};

export default useMap;
