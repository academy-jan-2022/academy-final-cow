import { screen, waitFor } from "@testing-library/react";
import TeamPage from "./TeamPage";
import teamService from "../../services/team/teamService";
import { act } from "react-dom/test-utils";
import { TeamWithMembers } from "../../services/team/Team";
import renderWithMemoryRouter from "../../testUtils/renderWithMemoryRouter";

const TEAM_ID = "1";
const TEAM_NAME = "Team 1";
const TEAM_DESCRIPTION = "Team description";
const USER_ONE_ID = "1";
const USER_ONE_FULL_NAME = "Peter Parker";
const USER_TWO_ID = "2";
const USER_TWO_FULL_NAME = "Anna Hello";

const GET_TEAM_METHOD = "getTeamById";
const GENERATE_JOIN_LINK = "generateJoinLink";

const aTeamWithMembers: TeamWithMembers = {
  id: TEAM_ID,
  name: TEAM_NAME,
  description: TEAM_DESCRIPTION,
  members: [
    {
      id: USER_ONE_ID,
      fullName: USER_ONE_FULL_NAME,
    },
    {
      id: USER_TWO_ID,
      fullName: USER_TWO_FULL_NAME,
    },
  ],
};

const TEAM_PAGE_URL = "/team/1";
const TEAM_PAGE_ROUTE = "/team/:id";
let mockedTeamService: jest.Mocked<any>;

describe("Team page should", () => {
  describe("on render", () => {
    beforeEach(async () => {
      await act(async () => {
        mockedTeamService = jest
          .spyOn(teamService, GET_TEAM_METHOD)
          .mockResolvedValue({ team: aTeamWithMembers });

        renderWithMemoryRouter(<TeamPage />, {
          pageUrl: TEAM_PAGE_URL,
          route: TEAM_PAGE_ROUTE,
        });
      });
    });

    test("retrieve the team information", async () => {
      await waitFor(() =>
        expect(mockedTeamService).toHaveBeenCalledWith(TEAM_ID)
      );

      mockedTeamService.mockRestore();
    });

    test("render the team name as a title", async () => {
      await waitFor(() =>
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          TEAM_NAME
        )
      );

      mockedTeamService.mockRestore();
    });

    test("render the team description", async () => {
      const teamDescription = await screen.findByText(TEAM_DESCRIPTION);
      expect(teamDescription).toBeInTheDocument();

      mockedTeamService.mockRestore();
    });

    test("render team members", async () => {
      const teamMembers = await screen.findByRole("list");
      expect(teamMembers).toHaveTextContent(USER_ONE_FULL_NAME);
      expect(teamMembers).toHaveTextContent(USER_TWO_FULL_NAME);

      mockedTeamService.mockRestore();
    });

    test("render generate join team link button", async () => {
      const joinButton = await screen.findByText("create join link");
      expect(joinButton).toBeInTheDocument();
      mockedTeamService.mockRestore();
    });
  });

  describe("on generateLing action", () => {
    test("calls generate uri on button clicked", async () => {
      jest
        .spyOn(teamService, GET_TEAM_METHOD)
        .mockResolvedValue({ team: aTeamWithMembers });

      const mockedGenerateJoinLink = jest
        .spyOn(teamService, GENERATE_JOIN_LINK)
        .mockResolvedValue({ link: "mocked url" });

      renderWithMemoryRouter(<TeamPage />, {
        pageUrl: TEAM_PAGE_URL,
        route: TEAM_PAGE_ROUTE,
      });

      const joinButton = await screen.findByText("create join link");
      await act(async () => await joinButton.click());

      expect(mockedGenerateJoinLink).toHaveBeenCalledWith("1");
    });

    test("does not render modal when button has not been clicked", async () => {
      jest
        .spyOn(teamService, GET_TEAM_METHOD)
        .mockResolvedValue({ team: aTeamWithMembers });

      jest
        .spyOn(teamService, GENERATE_JOIN_LINK)
        .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

      renderWithMemoryRouter(<TeamPage />, {
        pageUrl: TEAM_PAGE_URL,
        route: TEAM_PAGE_ROUTE,
      });

      const modal = screen.queryByText("http://localhost:3000/join/123456");

      await waitFor(() => expect(modal).not.toBeInTheDocument());
    });
  });
});
