import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ReactDOM from "react-dom";
import HeartbeatPage from "./pages/HeartbeatPage/HeartbeatPage";
import TeamsPage from "./pages/TeamsPage/TeamsPage";
import CreateTeamPage from "./pages/CreateTeamPage/CreateTeamPage";
import ErrorPage, { ERRORS } from "./pages/ErrorPage/ErrorPage";
import TeamPage from "./pages/TeamPage/TeamPage";
import JoinTeamPage from "./pages/JoinTeam/JoinTeamPage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/team/:id" element={<TeamPage />} />
        <Route path="/join/:joinTokenId" element={<JoinTeamPage />} />
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
