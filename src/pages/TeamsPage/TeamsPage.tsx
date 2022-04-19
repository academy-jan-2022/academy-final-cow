import { Button, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";
import TeamService from "../../services/team/teamService";
import { Team } from "../../services/team/Team";
import TeamCard from "../../components/Team/TeamCard";

const TeamsPage = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);

  const getTeamsProduction = async () => {
    const teams = await TeamService.getAllTeams();
    setTeams(teams);
  };

  const getTeams = async () => {
      const teams = [
          {
              id: "1",
              name: "Team 1",
              description: "Team 1 description blah blah blah"
            },
          {
              id: "2",
              name: "ECA",
              description: "Team 2 description grea ibghriebngu ifrnuiwe "
          },
          {
              id: "3",
              name: "Cowboy",
              description: "nhuivn rei gbeiurbg npir"
          }];
      setTeams(teams);
  };

  useEffect(() => {
    getTeams();
  }, []);

  const renderTeamCards = teams.map((team, index) => {
      return (
          <TeamCard team={team} key={team.name + index} />
      )
  })

  return (
    <PageTemplate>
      <h1 aria-label="title">Teams</h1>
      <div>
          {renderTeamCards}
      </div>
        <Button
        variant="outlined"
        className="create-team-btn"
        onClick={() => navigate("/create-team")}
      >
        Create New Team
      </Button>
    </PageTemplate>
  );
};

export default TeamsPage;
