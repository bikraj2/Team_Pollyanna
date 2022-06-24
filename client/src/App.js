import "./App.css";
import { Routes, Route } from "react-router-dom";
import Page from "./componenrs/Page";
import "mapbox-gl/dist/mapbox-gl.css";
import SecondPage from "./componenrs/SecondPage";
import ThirdPage from "./componenrs/ThirdPage";
import SecondPageSchool from "./componenrs/ScondPageSchool";
import ThirdPageSchool from "./componenrs/ThirdPageSchool";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/analyse" element={<SecondPage />} />
        <Route path="/solution" element={<ThirdPage />} />
      </Routes>
    </div>
  );
}

export default App;
