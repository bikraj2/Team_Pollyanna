import React from "react";
import "./button.css";
import axios from "axios";
import { useState, useNavigate } from "react";
import useMap from "../Maps/hooks";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
const Button = () => {
  const { boundData } = useMap;
  return (
    <>
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
        }}
        className="buttonClass"
      >
        Analyse
      </button>
    </>
  );
};

export default Button;
