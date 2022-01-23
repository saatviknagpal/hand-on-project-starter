import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackgroundRemover from "./pages/BackgroundRemover/BackgroundRemover";
import Dashboard from "./pages/Dashboard/Dashboard";
import Marketplace from "./pages/MarketPlace/Marketplace";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Marketplace />} />
        <Route path="/login" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/remove-bg" element={<BackgroundRemover />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
