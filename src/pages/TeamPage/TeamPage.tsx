import React, { useEffect, useState } from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import { useParams } from "react-router-dom";
import { GetTeamResponse as Team } from "../../services/team/Team";
import PageHeading from "../../components/PageHeading/PageHeading";
import { Stack, List, ListItem, Typography } from "@mui/material";
import teamService from "../../services/team/teamService";

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
      <PageHeading>{team.name}</PageHeading>
      <Stack alignSelf="flex-start" alignItems="flex-start" spacing={2}>
        <Typography component="p">{team.description}</Typography>
        <List>
          Members:
          {team.members.map((member, index) => (
            <ListItem key={member.id + "_" + index}>{member.fullName}</ListItem>
          ))}
        </List>
      </Stack>
    </PageTemplate>
  );
};

export default TeamPage;
