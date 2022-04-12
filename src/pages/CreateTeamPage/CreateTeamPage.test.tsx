import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import CreateTeamPage, { Team } from "./CreateTeamPage";
import { BrowserRouter } from "react-router-dom";
import teamService from "../../services/team/teamService";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../services/team/teamService");
const mockedTeamService = teamService as jest.Mocked<typeof teamService>;
mockedTeamService.createTeam.mockImplementation(() => Promise.resolve("/team/1"));

describe("create team page should", () => {
  const team: Team = {
    name: "team name",
    description: "team description",
  };
  let saveTeamBtn: HTMLElement;
  let teamNameField: HTMLElement;
  let teamDescriptionField: HTMLElement;

  beforeEach(() => {
    render(
      <BrowserRouter>
        <CreateTeamPage />
      </BrowserRouter>
    );

    saveTeamBtn = screen.getByTestId("save-team-btn");
    teamNameField = screen.getByTestId("team-name");
    teamDescriptionField = screen.getByTestId("team-description");
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
    fireEvent.change(teamNameField, { target: { value: team.name } });
    fireEvent.change(teamDescriptionField, {
      target: { value: team.description },
    });

    saveTeamBtn.click();

    expect(mockedTeamService.createTeam).toBeCalledWith(team);
  });

  test("dont call team service if the description is not filled", () => {
    fireEvent.change(teamNameField, { target: { value: team.name } });

    saveTeamBtn.click();

    expect(mockedTeamService.createTeam).not.toBeCalled();
  });

  test("dont call team service if the name is not filled", () => {
    fireEvent.change(teamDescriptionField, {
      target: { value: "team description" },
    });

    saveTeamBtn.click();

    expect(mockedTeamService.createTeam).not.toBeCalled();
  });
  test("redirect to the team page",  async() => {
    fireEvent.change(teamNameField, { target: { value: team.name } });
    fireEvent.change(teamDescriptionField, {
      target: { value: team.description },
    });

    saveTeamBtn.click();

    await waitFor(() => expect(mockedUsedNavigate).toBeCalled());
  });
});

