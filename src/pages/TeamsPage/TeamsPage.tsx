import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";
import TeamService from "../../services/team/teamService";
import { Team } from "../../services/team/Team";
import TeamCard from "../../components/Team/TeamCard";

const TeamsPage = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);

  const getTeams = async () => {
    const teams = await TeamService.getAllTeams();
    setTeams(teams);
  };

  useEffect(() => {
    getTeams();
  }, []);

  const renderTeamCards = teams.map((team, index) => {
      return (
          <TeamCard name={team.name} key={team.name + index} id={team.id}/>
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
