import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import FirstPage from "./container/FirstPage/views/firstPage";

export default App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
      </Routes>
    </BrowserRouter>
  );
};
