import React, { useEffect, useState } from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { GetTeamResponse } from "../../services/team/Team";

import PageHeading from "../../components/PageHeading/PageHeading";
import { Button, List, ListItem, Stack, Typography } from "@mui/material";
import teamService from "../../services/team/teamService";
import JoinLinkModal from "../../components/JoinLinkModal/JoinLinkModal";

const TeamPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<GetTeamResponse>();
  const [open, setOpen] = React.useState(false);
  const [joinLink, setJoinLink] = React.useState("");
  const [isLoading, toggleLoading] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      teamService
        .getTeamById(id)
        .then((fetchedTeam) => {
          setTeam(fetchedTeam);
          toggleLoading(false);
        })
        .catch(() => navigate("/error"));
    }
  }, [id, navigate]);

  function generateLink() {
    if (id) {
      teamService
        .generateJoinLink(id)
        .then((response) => setJoinLink(response.link))
        .then(handleOpen);
    }
  }

  return (
    <PageTemplate isLoading={isLoading}>
      <PageHeading>{team?.name}</PageHeading>
      <Stack alignSelf="flex-start" alignItems="flex-start" spacing={2}>
        <Typography component="p">{team?.description}</Typography>
        <List>
          Members:
          {team?.members.map((member, index) => (
            <ListItem key={member.id + "_" + index}>{member.fullName}</ListItem>
          ))}
        </List>
        <Button variant={"outlined"} onClick={generateLink}>
          create join link
        </Button>
      </Stack>
      <JoinLinkModal
        joinLink={joinLink}
        open={open}
        handleClose={handleClose}
      />
    </PageTemplate>
  );
};

export default TeamPage;
