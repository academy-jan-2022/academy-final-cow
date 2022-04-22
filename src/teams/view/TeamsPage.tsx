import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamService from "../service/teamService";
import { Team } from "../Team";
import TeamCard from "./TeamCard/TeamCard";
import "./team.css";
import PageTemplate from "../../shared/components/PagesTemplate/PageTemplate";

const TeamsPage = () => {

  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);

  const getTeams = async () => {
    const teams = await TeamService.getTeamsByUser();
    setTeams(teams);
  };

  useEffect(() => {
    getTeams();
  }, []);

  const renderTeamCards = teams.map((team, index) => {
    return (
      <li className="team-card" key={team.name + index}>
        <TeamCard team={team} />
      </li>
    );
  });

  return (
      <PageTemplate>
        <><h1 aria-label="title">Teams</h1>
            <ul className="team-list-container">{renderTeamCards}</ul>
            <Button
                variant="outlined"
                className="create-team-btn"
                onClick={() => navigate("/create-team")}
            >
                Create New Team
            </Button>
        </>
      </PageTemplate>
  );
};

export default TeamsPage;
