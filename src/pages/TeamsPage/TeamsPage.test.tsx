import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import TeamsPage from "./TeamsPage";
import teamService from "../../services/team/teamService";
import TeamService from "../../services/team/teamService";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  render(
    <BrowserRouter>
      <TeamsPage />
    </BrowserRouter>
  );
});

describe("Teams page should", () => {
  test("renders the heading", () => {
    const title = screen.getByRole("heading", { name: "title" });
    expect(title).toBeInTheDocument();
  });

  test("renders the create team button", () => {
    const createTeamBtn = screen.getByText("Create New Team");
    expect(createTeamBtn).toBeInTheDocument();
  });

  test("create team button should take you to /create-team page", () => {
    const createTeamBtn = screen.getByText("Create New Team");
    createTeamBtn.click();
    expect(mockedUsedNavigate).toBeCalledWith("/create-team");
  });

  test("render a team card when I am part of one team", () => {
    const team = {
      id: "1",
      name: "Team 1",
      description: "Team 1 description",
      members: [{ id: "1", name: "John Doe" }],
    };

    jest.mock("../../services/team/teamService");
    const mockedGetTeamsService = teamService as jest.Mocked<
      typeof TeamService
    >;

    mockedGetTeamsService.getAllTeams = jest.fn().mockReturnValue(team);

    render(
      <BrowserRouter>
        <TeamsPage />
      </BrowserRouter>
    );

    const cardElement = screen.getAllByRole("teamCard");

    expect(cardElement).toBeInTheDocument();
    expect(cardElement.length).toBe(1);
  });
});
