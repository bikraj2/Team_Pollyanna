import React from "react";
import { Route, Routes } from "react-router-dom";
import AnalysePage from "./container/AnalysePage/AnalysePage";
import FP from "./FP";

export default App = () => {
  return (
    <Routes>
      <Route path="/analysis">
        <AnalysePage />
      </Route>
      <Route path="/" element={FP} />
    </Routes>
  );
};
