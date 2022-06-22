import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./componenrs/Nav/views/index";
import Page from "./componenrs/Page";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Page />} />
      </Routes>
    </div>
  );
}

export default App;
