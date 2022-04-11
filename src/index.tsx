import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import Heartbeat from "./pages/HeartbeatPage/Heartbeat";
import Teams from "./pages/TeamsPage/Teams";
import Home from "./pages/HomePage/Home";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/teams" element={<Teams />} />
        <Route path="/heartbeat" element={<Heartbeat />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
