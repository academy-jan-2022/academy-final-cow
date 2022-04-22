import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ProtectedRoute from "./shared/ProtectedRoute";
import TeamsPage from "./teams/view/TeamsPage";
import HeartbeatPage from "./shared/pages/HeartbeatPage/HeartbeatPage";
import CreateTeamPage from "./teams/create/CreateTeamPage";
import HomePage from "./login/HomePage";
import ErrorPage, { ERRORS } from "./shared/pages/ErrorPage/ErrorPage";

const App = () => {
  const navigate = useNavigate();

  return (
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
      <Route path="/*" element={<ErrorPage error={ERRORS.PAGE_NOT_FOUND} />} />
    </Routes>
  );
};

export default App;
