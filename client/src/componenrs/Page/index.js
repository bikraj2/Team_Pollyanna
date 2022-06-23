import React, { useRef, useState, useEffect } from "react";
import Nav from "../Nav/views";
import "./button.css";
import maplibre from "maplibre-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";
import "./checkbox.sass";
import "./conclusion.sass";
import "../LeftContainer/LeftContainer.css";
import locLists from "../Location/Location";

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

    map.current.on("load", function () {
      map.current.addSource("maine", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            // These coordinates outline Maine.
            coordinates: [
              [
                [85.44094172406477, 27.51232940915786],
                [85.44052120876468, 27.50792605780017],
                [85.43961874434017, 27.50358064726067],
                [85.43824307368027, 27.49933501059883],
                [85.4364074904196, 27.495230016102195],
                [85.43412970918386, 27.491305174455352],
                [85.43143169357623, 27.487598259103017],
                [85.42833944361402, 27.484144943429573],
                [85.4248827447029, 27.480978458212306],
                [85.42109488058901, 27.47812927260868],
                [85.41701231306077, 27.475624801711042],
                [85.41267433147509, 27.47348914344717],
                [85.40812267545704, 27.471742847325665],
                [85.40340113436503, 27.470402717221855],
                [85.39855512732343, 27.469481650077586],
                [85.39363126780076, 27.46898851204815],
                [85.38867691685, 27.46892805327606],
                [85.38373972923229, 27.46930086210649],
                [85.37886719670915, 27.470103359186886],
                [85.37410619281694, 27.471327831516586],
                [85.36950252342555, 27.472962506134632],
                [85.36510048733444, 27.47499166275871],
                [85.36094245107182, 27.477395784318592],
                [85.35706844193713, 27.480151743967053],
                [85.3535157631661, 27.483233026803426],
                [85.35031863489898, 27.486609984212475],
                [85.34750786440118, 27.49025011840777],
                [85.34511054871997, 27.49411839447698],
                [85.34314981266559, 27.498177576959357],
                [85.3416445846797, 27.50238858774563],
                [85.34060941280424, 27.50671088188048],
                [85.34005432258895, 27.51110283766924],
                [85.33998471838177, 27.51552215734621],
                [85.34040132903533, 27.519926274452786],
                [85.34130019863865, 27.524272764001353],
                [85.34267272244942, 27.528519751466828],
                [85.34450572776464, 27.532626316651164],
                [85.34678159902755, 27.53655288850922],
                [85.34947844603438, 27.540261627105334],
                [85.35257031367667, 27.543716788988952],
                [85.3560274312414, 27.546885072434012],
                [85.35981649889415, 27.549735939178106],
                [85.36390100859545, 27.552241909523577],
                [85.36824159635192, 27.554378827919606],
                [85.37279642238497, 27.556126096431313],
                [85.37752157551422, 27.557466873814857],
                [85.38237149780657, 27.558388238253695],
                [85.38729942533243, 27.558881312167614],
                [85.39225784070742, 27.558941347877983],
                [85.39719893297652, 27.558567773297668],
                [85.40207506032439, 27.557764197206634],
                [85.40683921106738, 27.556538374071405],
                [85.41144545840378, 27.554902128763725],
                [85.41584940446515, 27.55287124192677],
                [85.4200086093244, 27.550465297121953],
                [85.42388300077376, 27.54770749126285],
                [85.42743526088569, 27.54462441019899],
                [85.43063118560906, 27.541245771650473],
                [85.4334400139303, 27.53760413800891],
                [85.43583472343903, 27.533734601809442],
                [85.4377922894789, 27.52967444693878],
                [85.43929390543009, 27.525462788874442],
                [85.44032516205898, 27.52114019744618],
                [85.44087618427632, 27.516748305773408],
                [85.44094172406477, 27.51232940915786],
              ],
            ],
          },
        },
      });
      map.current.addLayer({
        id: "maine",
        type: "fill",
        source: "maine",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.8,
        },
      });
    });

    function updateArea(e) {
      const data = draw.getAll();
      setBoundData(data);
      console.log(data);
    }
  });
  function sendData() {
    console.log("here we are");
    if (secondPageAc) {
      setThirdPageAc(1);
      setSecondPageAc(0);
    }
    if (firstPageAc) {
      setSecondPageAc(1);
      setFirstPageAc(0);
    }
    if (thirdPageAc) {
      setFirstPageAc(1);
      setThirdPageAc(0);
    }
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

  const [school, setSchool] = useState(false);
  const [hospital, setHospital] = useState(false);

  const [firstPageAc, setFirstPageAc] = useState(1);
  const [secondPageAc, setSecondPageAc] = useState(0);
  const [thirdPageAc, setThirdPageAc] = useState(0);
  return (
    <>
      {/* Navigation Bar */}
      <Nav />
      {/* Button At bottom */}
      <button className="buttonClass" onClick={sendData}>
        {firstPageAc
          ? "Analyse Sustainablity"
          : secondPageAc
          ? "Show the Solution"
          : "Go To Selector"}
      </button>
      {/* Map */}
      <div
        style={{
          position: "absolute",
          height: "92.55vh",
          width: "100vw",
        }}
        ref={mapContainer}
        className="map-container"
      ></div>
      {/* Left Container */}
      {firstPageAc === 0 ? (
        <div className="data-list">
          <div className="heading">
            <h2>{secondPageAc ? "Current Locations" : "Proposed Locations"}</h2>
          </div>
          <ul className="list">
            {locLists.map((data, index) => (
              <li key={index}>
                <div className="data-item">
                  <a>{data.properties.name}</a>
                  <p>{data.properties.address}</p>
                  <b>{data.properties.phone}</b>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
      {/* Selector || Checkbox */}
      <div className={firstPageAc ? "checkbox active" : "checkbox"}>
        <div className="topic">
          <h3>{firstPageAc ? "What data you want to analyse ?" : "Select"}</h3>
        </div>
        <div className="checkboxs">
          <div>
            <input
              type="checkbox"
              id="hospital"
              name="hospital"
              value="hospital"
              onChange={(e) => {
                if (e.target.value === "hospital") {
                  setHospital(true);
                } else {
                  setHospital(false);
                }
              }}
            />
            <label for="hospital"> Hospital</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="school"
              name="school"
              value="school"
              onChange={(e) => {
                if (e.target.value === "school") {
                  setSchool(true);
                } else {
                  setSchool(false);
                }
              }}
            />
            <label for="school"> School </label>
          </div>
          <div>
            <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
            <label for="vehicle3"> I have a boat</label>
          </div>
        </div>
      </div>
      {/* Conclusion Box */}
      <div className={firstPageAc !== 0 ? "conclusion" : "conclusion active"}>
        <h2>Valididty</h2>
      </div>
    </>
  );
}
