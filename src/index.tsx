import React from "react";
import "./index.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ReactDOM from "react-dom";
import HeartbeatPage from "./pages/HeartbeatPage/HeartbeatPage";
import TeamsPage from "./pages/TeamsPage/TeamsPage";
import CreateTeamPage from "./pages/CreateTeamPage/CreateTeamPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route path="/teams" element={<TeamsPage/>}/>
                <Route path="/heartbeat" element={<HeartbeatPage/>}/>
                <Route path="/create-team" element={<CreateTeamPage/>}/>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
