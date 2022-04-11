import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";
import "./create-page.css";

const CreateTeamPage = () => {
  const navigate = useNavigate();

  return (
    <PageTemplate>
      <h1>Create Team</h1>
      <Stack className="create-team-form" spacing={2}>
        <TextField
          id="team-name"
          data-testid="team-name"
          label="Team name"
          variant="outlined"
        />
        <TextField
          id="team-description"
          data-testid="team-description"
          label="Team description"
          variant="outlined"
        />
        <Button
          variant="outlined"
          id="save-team-btn"
          data-testid="save-team-btn"
        >
          Save Team
        </Button>
      </Stack>
    </PageTemplate>
  );
};

export default CreateTeamPage;
