import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import Heartbeat from "./pages/Heartbeat";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/heartbeat" element={<Heartbeat />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
