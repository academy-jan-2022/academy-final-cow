import React, {useEffect, useState} from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import teamService from "../../services/team/teamService";
import {useParams} from "react-router-dom";
import {Team} from "./TeamPage.test";
import {Button} from "@mui/material";

const TeamPage = () => {
  const {id} = useParams();
  const [team, setTeam] = useState<Team>();

  useEffect(() => {
    if (id) {
      teamService.getTeamById(id).then((team) => setTeam(team));
    }
  }, []);

  if (!team) return <div>Loading...</div>;

  function generateLink() {
    if (id) {
      teamService.generateJoinLink(id);
    }
  }

  return (
      <PageTemplate>
        <h1>{team.name}</h1>
        <p>{team.description}</p>
        <ul>
          {team.members.map((member, index) => (
              <li key={member.id + "_" + index}>{member.fullName}</li>
          ))}
        </ul>
        <Button variant={"outlined"} onClick={generateLink}>
          create join link
        </Button>
      </PageTemplate>
  );
};

export default TeamPage;
