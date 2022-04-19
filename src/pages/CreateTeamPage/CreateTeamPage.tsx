import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";
import "./create-page.css";
import teamService from "../../services/team/teamService";

export type Team = {
  name: string;
  description: string;
};

const CreateTeamPage = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  const handleOnClick = async () => {
    if (teamDescription && teamName) {
      const team: Team = {
        name: teamName,
        description: teamDescription
      };

      try {
        const teamId = await teamService.createTeam(team);
        const route = "/team/" + teamId;
        navigate(route);
      } catch (e) {
        console.log(e);
        navigate("/error");
      }
    }
  };

  return (
    <PageTemplate>
      <h1>Create Team</h1>
      <Stack className="create-team-form" spacing={2}>
        <TextField
          id="team-name"
          label="Team name"
          required
          error={teamName.length === 0}
          inputProps={{ "data-testid": "team-name" }}
          variant="outlined"
          onChange={(e) => setTeamName(e.target.value)}
        />
        <TextField
          id="team-description"
          inputProps={{ "data-testid": "team-description" }}
          label="Team description"
          required
          error={teamDescription.length === 0}
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
        <Button
          variant="contained"
          id="cancel-team-btn"
          data-testid="cancel-team-btn"
          onClick={() => navigate("/teams")}
        >
          Cancel
        </Button>
      </Stack>
    </PageTemplate>
  );
};

export default CreateTeamPage;
