import React, { useEffect } from "react";
import useMap from "../../Maps/hooks";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

export const useDraw = () => {
  const { map } = useMap();
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    color: "red",
    controls: {
      polygon: true,
      trash: true,
    },
    defaultMode: "draw_polygon",
  });

  useEffect(() => {
    map.current.addControl(draw);
  }, []);
  if (map.current) {
    map.current.on("draw.create", updateArea);

    map.current.on("draw.delete", updateArea);

    map.current.on("draw.update", updateArea);
  }

  function updateArea() {
    console.log("Should Print");
    const data = draw.getAll();
    console.log(data);
    return data;
  }

  return {
    draw,
    updateArea,
  };
};
