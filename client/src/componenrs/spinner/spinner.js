import React, { Component } from "react";
import spin from "./spin.gif";
import "./spinner.css";
export class Spinner extends Component {
  render() {
    return (
      <div className="spin">
        <div className="img">
          <div className="gmi">
            <img src={spin} alt="loading..." className="image" />
          </div>
        </div>
      </div>
    );
  }
}

export default Spinner;
