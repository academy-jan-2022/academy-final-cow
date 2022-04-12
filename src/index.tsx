import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import HeartbeatPage from "./pages/HeartbeatPage/HeartbeatPage";
import TeamsPage from "./pages/TeamsPage/TeamsPage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/team/1" element={<TeamPage />} />
        <Route path="/heartbeat" element={<HeartbeatPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
