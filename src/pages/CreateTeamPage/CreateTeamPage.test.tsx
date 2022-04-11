import React from "react";
import { act, render, screen } from "@testing-library/react";
import CreateTeamPage from "./CreateTeamPage";
import { BrowserRouter } from "react-router-dom";

describe("create team page should", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CreateTeamPage />
      </BrowserRouter>
    );
  });

  test("render the heading", () => {
    const heading = screen.getByText("Create Team");
    expect(heading).toBeInTheDocument();
  });

  test("render the team name field", () => {
    const teamNameField = screen.getByTestId("team-name");
    expect(teamNameField).toBeInTheDocument();
  });

  test("render the team description field", () => {
    const teamNameField = screen.getByTestId("team-description");
    expect(teamNameField).toBeInTheDocument();
  });

  test("render the save team button", () => {
    const saveTeamBtn = screen.getByTestId("save-team-btn");
    expect(saveTeamBtn).toBeInTheDocument();
  });
});
