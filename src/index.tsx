import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./login/HomePage/HomePage";
import ReactDOM from "react-dom";
import HeartbeatPage from "./shared/pages/HeartbeatPage/HeartbeatPage";
import TeamsPage from "./teams/view/TeamsPage";
import CreateTeamPage from "./teams/create/CreateTeamPage";
import ErrorPage, { ERRORS } from "./shared/pages/ErrorPage/ErrorPage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/team" element={<TeamsPage />} />
        <Route path="/heartbeat" element={<HeartbeatPage />} />
        <Route path="/create-team" element={<CreateTeamPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/error"
          element={<ErrorPage error={ERRORS.SOMETHING_WENT_WRONG} />}
        />
        <Route
          path="/*"
          element={<ErrorPage error={ERRORS.PAGE_NOT_FOUND} />}
        />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
