import React, { useEffect, useState } from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import { useParams } from "react-router-dom";
import { GetTeamResponse as Team } from "../../services/team/Team";

import PageHeading from "../../components/PageHeading/PageHeading";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import teamService from "../../services/team/teamService";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const TeamPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<Team>();
  const [open, setOpen] = React.useState(false);
  const [joinLink, setJoinLink] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (id) {
      teamService.getTeamById(id).then((team) => setTeam(team));
    }
  }, []);

  function generateLink() {
    if (id) {
      teamService
        .generateJoinLink(id)
        .then((response) => setJoinLink(response.link))
        .then(handleOpen);
    }
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(joinLink);
  };

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
        <Button variant={"outlined"} onClick={generateLink}>
          create join link
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <TextField
              variant="outlined"
              value={joinLink}
              inputProps={{
                readOnly: true,
                endadorment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={copyLinkToClipboard}
                      onMouseDown={copyLinkToClipboard}
                      edge="end"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Modal>
      </Stack>
    </PageTemplate>
  );
};

export default TeamPage;
