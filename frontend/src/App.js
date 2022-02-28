import React, { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackgroundRemover from "./pages/BackgroundRemover/BackgroundRemover";
import Dashboard from "./pages/Dashboard/Dashboard";
import Marketplace from "./pages/MarketPlace/Marketplace";
import Apis from "./pages/MyAPIs/APIs";
import Register from "./pages/Register/Register";
import {initialState, reducer} from "./utils/reducer/UseReducer"
import "./App.css"
export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Marketplace />} />
            <Route path="/login" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/remove-bg" element={<BackgroundRemover />} />
            <Route path="/apis" element={<Apis />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
