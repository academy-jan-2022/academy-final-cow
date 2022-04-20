import React, { useEffect, useState } from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import teamService from "../../services/team/teamService";
import { useParams } from "react-router-dom";
import { Team } from "./TeamPage.test";

const TeamPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<Team>();

  useEffect(() => {
    if (id) {
      teamService.getTeamById(id).then((team) => setTeam(team));
    }
  }, []);

  if (!team) return <div>Loading...</div>;

  return (
    <PageTemplate>
      <h1>{team.name}</h1>
    </PageTemplate>
  );
};

export default TeamPage;
