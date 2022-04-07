import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom";
import Heartbeat from "./pages/Heartbeat";
import TeamsPage from "./pages/TeamsPage";

export enum ROUTES {
  teams = "/teams",
  heartbeat = "/heartbeat",
  error = "/error",
  home = "/",
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={ROUTES.teams} element={<TeamsPage />} />
        <Route path={ROUTES.heartbeat} element={<Heartbeat />} />
        <Route path={ROUTES.home} element={<HomePage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
