import { Button } from "@mui/material";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";
import TeamService from "../../services/team/teamService";
import {Team} from "../../services/team/Team";

const TeamsPage = () => {
  const navigate = useNavigate();

    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(async () => {
        const myTeams = await TeamService.getAllTeams();
        setTeams(myTeams);
    }, []);

  return (
    <PageTemplate>
      <h1 aria-label="title">Teams</h1>
      <Button
        variant="outlined"
        className="create-team-btn"
        onClick={() => navigate("/create-team")}
      >
        Create New Team
      </Button>
        { teams.length > 0 &&
            <div role="teamCard">
            <h2>  {teams[0].name} </h2>
            </div>
        }
    </PageTemplate>
  );
};

export default TeamsPage;
