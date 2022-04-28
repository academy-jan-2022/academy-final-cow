import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";
import teamService from "../../services/team/teamService";
import PageHeading from "../../components/PageHeading/PageHeading";
import { CreateTeamRequest } from "../../services/team/Team";
import { PageRoutes } from "../pageRoutes";

import "./create-page.css";

const CreateTeamPage = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [nameError, toggleNameError] = useState(false);
  const [descriptionError, toggleDescriptionError] = useState(false);
  const [isLoading, toggleLoading] = useState(false);

  const handleOnClick = async () => {
    if (!teamDescription) {
      toggleDescriptionError(true);
    }

    if (!teamName) {
      toggleNameError(true);
    }

    if (teamDescription && teamName) {
      const team: CreateTeamRequest = {
        name: teamName,
        description: teamDescription,
      };

      try {
        toggleLoading(true);
        const createTeamResponse = await teamService.createTeam(team);
        const route = PageRoutes.TEAM.replace(":id", createTeamResponse.teamId);
        navigate(route);
      } catch (e) {
        navigate(PageRoutes.ERROR);
      }
    }
  };

  return (
    <PageTemplate isLoading={isLoading}>
      <PageHeading>Create Team</PageHeading>
      <Stack className="create-team-form" spacing={2}>
        <TextField
          id="team-name"
          label="Team name"
          required
          error={nameError}
          inputProps={{ "data-testid": "team-name" }}
          variant="outlined"
          onChange={(e) => {
            setTeamName(e.target.value);
            toggleNameError(false);
          }}
        />
        <TextField
          id="team-description"
          inputProps={{ "data-testid": "team-description" }}
          label="Team description"
          required
          error={descriptionError}
          variant="outlined"
          onChange={(e) => {
            setTeamDescription(e.target.value);
            toggleDescriptionError(false);
          }}
        />
        <Button
          variant="outlined"
          id="save-team-btn"
          data-testid="save-team-btn"
          onClick={handleOnClick}
        >
          Save Team
        </Button>
        <Button
          variant="contained"
          id="cancel-team-btn"
          data-testid="cancel-team-btn"
          onClick={() => navigate(PageRoutes.TEAMS)}
        >
          Cancel
        </Button>
      </Stack>
    </PageTemplate>
  );
};

export default CreateTeamPage;
