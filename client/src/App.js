import "./App.css";
import { Routes, Route } from "react-router-dom";
import FirstPage from "./componenrs/FirstPage/views";
import AnalysisPage from "./componenrs/AnalysisPage/views";
import SolvePage from "./componenrs/SolvePage/views";
import Map from "./componenrs/Maps/views";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/maps" element={<Map />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/solve" element={<SolvePage />} />
      </Routes>
    </div>
  );
}

export default App;
