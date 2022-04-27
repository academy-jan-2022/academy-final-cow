import { act, screen } from "@testing-library/react";

import TeamsPage from "./TeamsPage";
import TeamService from "../../services/team/teamService";
import renderWithMemoryRouter from "../../testUtils/renderWithMemoryRouter";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../services/team/teamService");
const mockedGetTeamsService = TeamService as jest.Mocked<typeof TeamService>;

describe("Teams page should", () => {
  describe("as default behaviour", () => {
    beforeEach(async () => {
      mockedGetTeamsService.getTeamsByUser = jest.fn().mockResolvedValue([]);

      await act(async () => {
        renderWithMemoryRouter(<TeamsPage />, {});
      });
    });

    test("renders the heading", () => {
      const title = screen.getByText("Teams");
      expect(title).toBeInTheDocument();
    });

    test("renders the create team button", () => {
      const createTeamBtn = screen.getByText("Create New Team");
      expect(createTeamBtn).toBeInTheDocument();
    });

    test("create team button should take you to /create-team page", async () => {
      const createTeamBtn = screen.getByText("Create New Team");
      createTeamBtn.click();
      expect(mockedUsedNavigate).toBeCalledWith("/create-team");
    });

    test("not render a team card when I am not part of at least one team", async () => {
      const cardElement = screen.queryByRole("teamCard");
      expect(cardElement).not.toBeInTheDocument();
    });
  });

  test("render as many cards as teams I belong to", async () => {
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
      renderWithMemoryRouter(<TeamsPage />, {});
    });

    const cardElement = screen.getAllByRole("teamCard");
    const cardName = screen.getByText("Team 1");
    const team1DescriptionElement = screen.getByText("Team 1 description");
    const cardNameForTwo = screen.getByText("ECA");
    const team2DescriptionElement = screen.getByText("Team 2 description");

    expect(cardElement).toHaveLength(2);
    expect(cardName).toBeInTheDocument();
    expect(team1DescriptionElement).toBeInTheDocument();
    expect(cardNameForTwo).toBeInTheDocument();
    expect(team2DescriptionElement).toBeInTheDocument();
  });
});
