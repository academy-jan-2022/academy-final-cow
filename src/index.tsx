import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import HeartbeatPage from "./pages/HeartbeatPage";
import TeamsPage from "./pages/TeamsPage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/heartbeat" element={<HeartbeatPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
