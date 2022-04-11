import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CreateTeamPage, { Team } from "./CreateTeamPage";
import { BrowserRouter } from "react-router-dom";
import { teamService } from "../../services/application/teamService";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));
jest.mock("../../services/application/teamService");

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

  test("call team service when button is clicked", () => {
    const saveTeamBtn = screen.getByTestId("save-team-btn");

    const teamNameField = screen.getByTestId("team-name");
    const teamDescriptionField = screen.getByTestId("team-description");
    const team: Team = {
      name: "team name",
      description: "team description",
    };
    fireEvent.change(teamNameField, { target: { value: team.name } });
    fireEvent.change(teamDescriptionField, {
      target: { value: team.description },
    });

    saveTeamBtn.click();

    expect(teamService).toBeCalledWith(team);
  });
});
