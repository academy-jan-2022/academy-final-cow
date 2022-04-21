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
  test("renders the heading", async () => {
    mockedGetTeamsService.getTeamsByUser = jest.fn().mockResolvedValue([]);

    await act(async () => {
      render(
        <BrowserRouter>
          <TeamsPage />
        </BrowserRouter>
      );
    });
    const title = screen.getByText("Teams");
    expect(title).toBeInTheDocument();
  });

  test("renders the create team button", async () => {
    mockedGetTeamsService.getTeamsByUser = jest.fn().mockResolvedValue([]);

    await act(async () => {
      render(
        <BrowserRouter>
          <TeamsPage />
        </BrowserRouter>
      );
    });
    const createTeamBtn = screen.getByText("Create New Team");
    expect(createTeamBtn).toBeInTheDocument();
  });

  test("create team button should take you to /create-team page", async () => {
    mockedGetTeamsService.getTeamsByUser = jest.fn().mockResolvedValue([]);

    await act(async () => {
      render(
        <BrowserRouter>
          <TeamsPage />
        </BrowserRouter>
      );
    });
    const createTeamBtn = screen.getByText("Create New Team");
    createTeamBtn.click();
    expect(mockedUsedNavigate).toBeCalledWith("/create-team");
  });

  test("render a team card when I am part of one team", async () => {
    const team = {
      id: "1",
      name: "Team 1",
      description: "Team 1 description",
    };

    mockedGetTeamsService.getTeamsByUser = jest.fn().mockResolvedValue([team]);

    await act(async () => {
      render(
        <BrowserRouter>
          <TeamsPage />
        </BrowserRouter>
      );
    });

    const cardElement = screen.getAllByRole("teamCard");
    expect(cardElement).toHaveLength(1);

    const cardDescription = screen.getByText("Team 1 description");
    expect(cardDescription).toBeInTheDocument();
    const cardName = screen.getByText("Team 1");
    expect(cardName).toBeInTheDocument();
  });

  test("render 2 team cards when I am part of two teams", async () => {
    const team = {
      id: "1",
      name: "Team 1",
      description: "Team 1 description",
    };

    const teamTwo = {
      id: "2",
      name: "ECA",
      description: "Team 2 description",
    };

    mockedGetTeamsService.getTeamsByUser = jest
      .fn()
      .mockResolvedValue([team, teamTwo]);

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
    const team1DescriptionElement = screen.getByText("Team 1 description");
    expect(team1DescriptionElement).toBeInTheDocument();

    const cardNameForTwo = screen.getByText("ECA");
    expect(cardNameForTwo).toBeInTheDocument();
    const team2DescriptionElement = screen.getByText("Team 2 description");
    expect(team2DescriptionElement).toBeInTheDocument();
  });

  test("not render a team card when I am not part of at least one team", async () => {
    mockedGetTeamsService.getTeamsByUser = jest.fn().mockResolvedValue([]);

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
