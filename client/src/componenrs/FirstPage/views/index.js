import React from "react";
import Map from "../../Maps/views";
import Nav from "../../Nav/views";
import { useDraw } from "../hooks";

export default function FirstPage() {
  //   const {} = useDraw();
  return (
    <div>
      <Nav />
      <Map />
    </div>
  );
}
