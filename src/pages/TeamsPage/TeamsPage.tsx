import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";

const TeamsPage = () => {
  const navigate = useNavigate();

  return (
    <PageTemplate>
      <h1 aria-label="title">Teams</h1>
      <Button
        variant="outlined"
        className="create-team-btn"
        onClick={() => navigate("/create-team")}
      >
        Create New Team
      </Button>
      <div role="teamCard">
        <h2> team name </h2>
      </div>
    </PageTemplate>
  );
};

export default TeamsPage;
