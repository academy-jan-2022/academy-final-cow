import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";
import "./create-page.css";
import { teamService } from "../../services/application/teamService";

export type Team = {
  name: string;
  description: string;
};

const CreateTeamPage = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  function handleOnClick() {
    const team: Team = {
      name: teamName,
      description: teamDescription,
    };

    teamService(team);
  }

  return (
    <PageTemplate>
      <h1>Create Team</h1>
      <Stack className="create-team-form" spacing={2}>
        <TextField
          id="team-name"
          label="Team name"
          inputProps={{ "data-testid": "team-name" }}
          variant="outlined"
          onChange={(e) => setTeamName(e.target.value)}
        />
        <TextField
          id="team-description"
          inputProps={{ "data-testid": "team-description" }}
          label="Team description"
          variant="outlined"
          onChange={(e) => setTeamDescription(e.target.value)}
        />
        <Button
          variant="outlined"
          id="save-team-btn"
          data-testid="save-team-btn"
          onClick={handleOnClick}
        >
          Save Team
        </Button>
      </Stack>
    </PageTemplate>
  );
};

export default CreateTeamPage;
