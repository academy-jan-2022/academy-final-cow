import React, { useEffect, useState } from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import teamService from "../../services/team/teamService";
import { useParams } from "react-router-dom";
import { GetTeamResponse as Team } from "../../services/team/Team";

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
      <p>{team.description}</p>
      <ul>
        {team.members.map((member, index) => (
          <li key={member.id + "_" + index}>{member.fullName}</li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default TeamPage;
