import React from "react";
import Map from "../Maps/views/index";
import Buttons from "../button/Button";
import LeftContainer from "../LeftContainer/LeftContainer";
import Nav from "../Nav/views";
export default function Page() {
  return (
    <>
      <Nav />
      <Buttons />
      <Map />
      <LeftContainer />
    </>
  );
}
