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
import { PageRoutes } from "./pages/pageRoutes";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={PageRoutes.TEAMS} element={<TeamsPage />} />
        <Route path={PageRoutes.TEAM} element={<TeamPage />} />
        <Route path={PageRoutes.JOIN_TEAM} element={<JoinTeamPage />} />
        <Route path={PageRoutes.HEARTBEAT} element={<HeartbeatPage />} />
        <Route path={PageRoutes.CREATE_TEAM} element={<CreateTeamPage />} />
        <Route path={PageRoutes.HOME} element={<HomePage />} />
        <Route
          path={PageRoutes.ERROR}
          element={<ErrorPage error={ERRORS.SOMETHING_WENT_WRONG} />}
        />
        <Route
          path={PageRoutes.NOT_FOUND}
          element={<ErrorPage error={ERRORS.PAGE_NOT_FOUND} />}
        />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
