import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";
import TeamService from "../../services/team/teamService";
import { TeamByUser } from "../../services/team/Team";
import TeamCard from "../../components/Team/TeamCard";
import "./teams.css";
import "../../index.css";
import PageHeading from "../../components/PageHeading/PageHeading";
import { PageRoutes } from "../pageRoutes";

const TeamsPage = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<TeamByUser[]>([]);
  const [isLoading, toggleLoading] = useState(true);

  const getTeams = async () => {
    try {
      const fetchedTeams = await TeamService.getTeamsByUser();
      setTeams(fetchedTeams);
      toggleLoading(false);
    } catch (e) {
      navigate(PageRoutes.ERROR);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const renderTeamCards = teams.map((team, index) => {
    return (
      <Grid item xs={6} md={4} className="team-card" key={team.name + index}>
        <TeamCard team={team} />
      </Grid>
    );
  });

  return (
    <PageTemplate isLoading={isLoading}>
      <PageHeading>Teams</PageHeading>
      <Button
        variant="outlined"
        className="create-team-btn blue-button"
        onClick={() => navigate(PageRoutes.CREATE_TEAM)}
      >
        Create New Team
      </Button>
      <Grid
        container
        spacing={2}
        mt={2}
        width={"80%"}
        className="team-list-container"
      >
        {renderTeamCards}
      </Grid>
    </PageTemplate>
  );
};

export default TeamsPage;
