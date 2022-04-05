import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import SecondPage from "./pages/SecondPage";
import ReactDOM from "react-dom";
import Heartbeat from "./pages/Heartbeat";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/heartbeat" element={<Heartbeat />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
