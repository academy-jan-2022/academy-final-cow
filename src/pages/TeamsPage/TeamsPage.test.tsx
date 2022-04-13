import { act, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import TeamsPage from "./TeamsPage";
import TeamService from "../../services/team/teamService";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../services/team/teamService");
const mockedGetTeamsService = TeamService as jest.Mocked<typeof TeamService>;

describe("Teams page should", () => {
  beforeEach(async () => {
    mockedGetTeamsService.getAllTeams = jest.fn().mockResolvedValue([]);

    await act(async () => {
      render(
        <BrowserRouter>
          <TeamsPage />
        </BrowserRouter>
      );
    });
  });

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
});

describe("Teams page should 2", () => {
  test("render a team card when I am part of one team", async () => {
    const team = {
      id: "1",
      name: "Team 1",
      description: "Team 1 description",
      members: [{ id: "1", name: "John Doe" }],
    };

    mockedGetTeamsService.getAllTeams = jest.fn().mockResolvedValue([team]);

    await act(async () => {
      render(
        <BrowserRouter>
          <TeamsPage />
        </BrowserRouter>
      );
    });

    const cardElement = screen.getAllByRole("teamCard");
    expect(cardElement).toHaveLength(1);
    const cardName = screen.getByText("Team 1");
    expect(cardName).toBeInTheDocument();
  });

  test("render 2 team cards when I am part of two teams", async () => {
    const team = {
      id: "1",
      name: "Team 1",

    };

    const teamTwo = {
      id: "2",
      name: "ECA",
    };

    mockedGetTeamsService.getAllTeams = jest.fn().mockResolvedValue([team, teamTwo]);

    await act(async () => {
      render(
          <BrowserRouter>
            <TeamsPage />
          </BrowserRouter>
      );
    });

    const cardElement = screen.getAllByRole("teamCard");
    expect(cardElement).toHaveLength(2);
    const cardName = screen.getByText("Team 1");
    expect(cardName).toBeInTheDocument();
    const cardNameForTwo = screen.getByText("ECA");
    expect(cardNameForTwo).toBeInTheDocument();
  });

  test("not render a team card when I am not part of at least one team", async () => {
    mockedGetTeamsService.getAllTeams = jest.fn().mockResolvedValue([]);

    await act(async () => {
      render(
        <BrowserRouter>
          <TeamsPage />
        </BrowserRouter>
      );
    });

    const cardElement = screen.queryByRole("teamCard");
    expect(cardElement).not.toBeInTheDocument();
  });
});
