import {
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import TeamPage from "./TeamPage";
import teamService from "../../services/team/teamService";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { TeamWithMembers } from "../../services/team/Team";
import renderWithMemoryRouter from "../../testUtils/renderWithMemoryRouter";
import { PageRoutes } from "../pageRoutes";
import UserEvent from "@testing-library/user-event";

const TEAM_ID = "1";
const TEAM_NAME = "Team 1";
const TEAM_DESCRIPTION = "Team description";
const USER_ONE_ID = "1";
const USER_ONE_FULL_NAME = "Peter Parker";
const USER_TWO_ID = "2";
const USER_TWO_FULL_NAME = "Anna Hello";
const USER_THREE_ID = "3";
const USER_THREE_FULL_NAME = "Brian Hello";

const GET_TEAM_METHOD = "getTeamById";
const GENERATE_JOIN_LINK = "generateJoinLink";
const CREATE_ACTIVITY = "createActivity";
const REMOVE_USER = "removeUser";

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
const teamWithActivity: TeamWithMembers = {
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
    {
      id: USER_THREE_ID,
      fullName: USER_THREE_FULL_NAME,
    },
  ],
  activities: [
    {
      name: "My activity",
      groups: [
        [{ name: "cowboy" }, { name: "cowgirl" }],
        [{ name: "dogboy" }, { name: "doggirl" }],
      ],
    },
    {
      name: "My activity 2",
      groups: [
        [{ name: "fishboy" }, { name: "fishgirl" }],
        [{ name: "chickenboy" }, { name: "chickengirl" }],
      ],
    },
  ],
};

const teamWithoutActivity: TeamWithMembers = {
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
  activities: [],
};

const TEAM_PAGE_URL = PageRoutes.TEAM.replace(":id", TEAM_ID) as PageRoutes;
const TEAM_PAGE_ROUTE = PageRoutes.TEAM;
let mockedTeamService: jest.Mocked<any>;

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Team page should", () => {
  describe("on render", () => {
    beforeEach(async () => {
      await act(async () => {
        mockedTeamService = jest
          .spyOn(teamService, GET_TEAM_METHOD)
          .mockResolvedValue({ team: aTeamWithMembers });

        jest.spyOn(teamService, CREATE_ACTIVITY);

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

    test("render the team image", async () => {
      const teamImage = await waitFor(() => screen.getByTestId("team-image"));
      expect(teamImage).toBeInTheDocument();

      mockedTeamService.mockRestore();
    });

    test("render team members", async () => {
      const teamMembers = await screen.findByRole("list");
      expect(teamMembers).toHaveTextContent(USER_ONE_FULL_NAME);
      expect(teamMembers).toHaveTextContent(USER_TWO_FULL_NAME);

      const memberComponent = screen.getAllByTestId("member-container");
      expect(memberComponent.length).toBe(2);

      mockedTeamService.mockRestore();
    });

    test("render generate join team link button", async () => {
      const joinButton = await screen.findByText("create join link");
      expect(joinButton).toBeInTheDocument();
      mockedTeamService.mockRestore();
    });
  });

  describe("on generateLink action", () => {
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

  test("not display activities box of the team when they dont exist", async () => {
    jest
      .spyOn(teamService, GET_TEAM_METHOD)
      .mockResolvedValue({ team: teamWithoutActivity });

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const activityBox = await waitFor(() =>
      screen.queryAllByTestId("activity-box")
    );
    expect(activityBox.length).toEqual(0);
  });

  describe("Team page activity display should", () => {
    let mockedTeamServiceGetTeam: jest.Mocked<any>;
    let mockedTeamServiceCreateActivity: jest.Mocked<any>;

    beforeEach(async () => {
      await act(async () => {
        mockedTeamServiceGetTeam = jest
          .spyOn(teamService, GET_TEAM_METHOD)
          .mockResolvedValue({ team: teamWithActivity });

        jest
          .spyOn(teamService, GENERATE_JOIN_LINK)
          .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

        mockedTeamServiceCreateActivity = jest.spyOn(
          teamService,
          CREATE_ACTIVITY
        );

        renderWithMemoryRouter(<TeamPage />, {
          pageUrl: TEAM_PAGE_URL,
          route: TEAM_PAGE_ROUTE,
        });
      });
    });

    test("display the create activity button", async () => {
      const activityButton = await screen.findByText("create new activity");
      expect(activityButton).toBeInTheDocument();
    });

    test("display the create activity modal when you click create activity button", async () => {
      const activityButton = await screen.findByText("create new activity");

      await act(async () => activityButton.click());

      const activityModal = screen.getByTestId("activity-modal");
      expect(activityModal).toBeInTheDocument();
    });

    test("display the header text at modal when you click create activity button", async () => {
      const activityButton = await screen.findByText("create new activity");

      await act(async () => activityButton.click());

      const activityHeader = screen.getByTestId("activity-header-text");
      expect(activityHeader).toBeInTheDocument();
    });

    test("display the activity name field at modal when you click create activity button", async () => {
      const activityButton = await screen.findByText("create new activity");

      await act(async () => activityButton.click());

      const nameFieldElement = screen.getByTestId("activity-name-field");
      expect(nameFieldElement).toBeInTheDocument();
    });
    test("display the submit button at modal when you click create activity button", async () => {
      const activityButton = await screen.findByText("create new activity");

      await act(async () => activityButton.click());

      const activitySubmitButton = screen.getByTestId("activity-submit-button");
      expect(activitySubmitButton).toBeInTheDocument();
    });

    test("call team service when activity name is filled and submit button clicked and the page is refreshed", async () => {
      const activityButton = await screen.findByText("create new activity");

      await act(async () => activityButton.click());
      const activityNameText = screen.getByTestId("activity-name-field");
      fireEvent.change(activityNameText, { target: { value: "my activity" } });
      const activitySubmitButton = screen.getByTestId("activity-submit-button");
      await act(async () => activitySubmitButton.click());
      expect(mockedTeamServiceCreateActivity).toBeCalled();
      await waitFor(() => expect(mockedTeamServiceGetTeam).toBeCalledTimes(2));
    });

    test("display activities box of the team when they exist", async () => {
      const activityBox = await waitFor(() =>
        screen.getByTestId("activity-box")
      );
      expect(activityBox).toBeInTheDocument();
    });

    test("display activity name inside activity box of the team when it exists", async () => {
      const activityNameText = await waitFor(() =>
        screen.getByTestId("activity-name-text")
      );
      expect(activityNameText).toBeInTheDocument();
      expect(activityNameText).toContainHTML("My activity");
    });

    test("display member inside activity box of the team when it exists", async () => {
      const activityMemberText = await waitFor(() =>
        screen.getAllByTestId("activity-member-text")
      );
      expect(activityMemberText[0]).toContainHTML("cowboy");
    });

    test("display multiple members inside activity box of the team when it exists", async () => {
      const activityMemberText = await waitFor(() =>
        screen.getAllByTestId("activity-member-text")
      );
      expect(activityMemberText[0]).toContainHTML("cowboy");
      expect(activityMemberText[1]).toContainHTML("cowgirl");
    });

    test("display multiple groups with multiple members inside activity box of the team when it exists", async () => {
      const activityMemberText = await waitFor(() =>
        screen.getAllByTestId("activity-member-text")
      );
      expect(activityMemberText[0]).toContainHTML("cowboy");
      expect(activityMemberText[1]).toContainHTML("cowgirl");
      expect(activityMemberText[2]).toContainHTML("dogboy");
      expect(activityMemberText[3]).toContainHTML("doggirl");
    });

    test("display multiple box groups containing multiple members inside activity box of the team when it exists", async () => {
      const activityMemberBox = await waitFor(() =>
        screen.getAllByTestId("activity-member-box")
      );
      expect(activityMemberBox[0]).toContainHTML("cowboy");
      expect(activityMemberBox[0]).toContainHTML("cowgirl");
      expect(activityMemberBox[1]).toContainHTML("dogboy");
      expect(activityMemberBox[1]).toContainHTML("doggirl");
    });

    test("display selector when multiple activities exist on team", async () => {
      const activitySelector = await waitFor(() =>
        screen.getAllByTestId("activity-selector")
      );

      expect(activitySelector.length).toBe(1);
    });

    test("change activity that is displayed with select", async () => {
      const originalActivityName = await waitFor(() =>
        screen.getByTestId("activity-name-text")
      );

      expect(originalActivityName).toHaveTextContent("My activity");

      UserEvent.click(
        getByRole(screen.getByTestId("activity-selector-container"), "button")
      );
      await waitFor(() => UserEvent.click(screen.getByText("My activity 2")));
      expect(screen.getByTestId("activity-name-text")).toHaveTextContent(
        "My activity 2"
      );
    });
    test("show input where you modify number of groups", async () => {
      const activityButton = await screen.findByText("create new activity");
      await act(async () => activityButton.click());

      const activityInputAmountGroups = screen.getByTestId(
        "activity-input-amount-groups"
      );
      expect(activityInputAmountGroups).toBeInTheDocument();
    });

    test("send 4 groups where you modify number of input groups", async () => {
      const activityButton = await screen.findByText("create new activity");

      await act(async () => activityButton.click());

      const activityInputAmountGroups = screen.getByTestId(
        "activity-input-amount-groups"
      );
      fireEvent.change(activityInputAmountGroups, { target: { value: "4" } });

      const activityNameText = screen.getByTestId("activity-name-field");
      fireEvent.change(activityNameText, { target: { value: "My Activity" } });
      const activitySubmitButton = screen.getByTestId("activity-submit-button");
      await act(async () => activitySubmitButton.click());
      expect(mockedTeamServiceCreateActivity).toBeCalledWith({
        activityName: "My Activity",
        numberOfGroups: 4,
        teamId: "1",
        members: [
          { fullName: "Peter Parker", id: "1" },
          { fullName: "Anna Hello", id: "2" },
          { fullName: "Brian Hello", id: "3" },
        ],
      });
    });
    test("show list of users inside activity modal when create new activity", async () => {
      const activityButton = await screen.findByText("create new activity");

      await act(async () => activityButton.click());

      const listOfUserCheckboxes = screen.getAllByTestId("user-checkbox");

      expect(listOfUserCheckboxes.length).toEqual(3);
    });

    test("display included members heading", async () => {
      const activityButton = await screen.findByText("create new activity");
      await act(async () => activityButton.click());

      const includedMembersHeading = await screen.findByText(
        "Included members"
      );
      expect(includedMembersHeading).toBeInTheDocument();
    });

    test("send second user of 2 users inside activity modal when create new activity", async () => {
      const activityButton = await screen.findByText("create new activity");
      await act(async () => activityButton.click());
      const listOfUserCheckboxes = screen.getAllByTestId("user-checkbox");

      listOfUserCheckboxes[0].click();

      const activityNameText = screen.getByTestId("activity-name-field");
      fireEvent.change(activityNameText, {
        target: { value: "My Activity" },
      });
      const activitySubmitButton = screen.getByTestId("activity-submit-button");
      await act(async () => activitySubmitButton.click());

      expect(mockedTeamServiceCreateActivity).toBeCalledWith({
        activityName: "My Activity",
        numberOfGroups: 2,
        teamId: "1",
        members: [
          { fullName: "Anna Hello", id: "2" },
          { fullName: "Brian Hello", id: "3" },
        ],
      });
    });

    test("should not show tooltip over the button when can create activity", async () => {
      const activityButton = screen.getByText("create new activity");
      fireEvent.mouseOver(activityButton);

      const tooltip = await screen.queryByText(
        "You need at least 3 team members to create an activity"
      );

      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe("Team page should not create activities when you have less than 3 members", () => {
    let mockedTeamServiceGetTeam: jest.Mocked<any>;
    let mockedTeamServiceCreateActivity: jest.Mocked<any>;

    beforeEach(async () => {
      await act(async () => {
        mockedTeamServiceGetTeam = jest
          .spyOn(teamService, GET_TEAM_METHOD)
          .mockResolvedValue({ team: aTeamWithMembers });

        jest
          .spyOn(teamService, GENERATE_JOIN_LINK)
          .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

        mockedTeamServiceCreateActivity = jest.spyOn(
          teamService,
          CREATE_ACTIVITY
        );

        renderWithMemoryRouter(<TeamPage />, {
          pageUrl: TEAM_PAGE_URL,
          route: TEAM_PAGE_ROUTE,
        });
      });
    });

    test("Should not display create activity button if you have less than 3 members", () => {
      const activityButton = screen.getByText("create new activity");

      expect(activityButton).toBeDisabled();
    });

    test("should show tooltip over the button when can't create activity", async () => {
      const activityButton = screen.getByText("create new activity");
      fireEvent.mouseOver(activityButton);
      await waitFor(() => {
        const tooltip = screen.getByText(
          "You need at least 3 team members to create an activity"
        );
        expect(tooltip).toBeInTheDocument();
      });
    });

    test("render leave team button", async () => {
      renderWithMemoryRouter(<TeamPage />, {
        pageUrl: TEAM_PAGE_URL,
        route: TEAM_PAGE_ROUTE,
      });

      const leaveTeamButton = await screen.findByTestId("leave-team-button");
      expect(leaveTeamButton).toBeInTheDocument();
    });

    test("display double check modal when leave team button is clicked", async () => {
      renderWithMemoryRouter(<TeamPage />, {
        pageUrl: TEAM_PAGE_URL,
        route: TEAM_PAGE_ROUTE,
      });

      const leaveTeamButton = await screen.findByTestId("leave-team-button");

      await act(async () => leaveTeamButton.click());

      const doubleCheckModal = screen.getByTestId("double-check-modal");
      expect(doubleCheckModal).toBeInTheDocument();
    });

    test("call team service on double check modal confirmation", async () => {
      const mockedTeamServiceRemoveUser = jest
          .spyOn(teamService, REMOVE_USER)
          .mockResolvedValue();
      renderWithMemoryRouter(<TeamPage />, {
        pageUrl: TEAM_PAGE_URL,
        route: TEAM_PAGE_ROUTE,
      });

      const leaveTeamButton = await screen.findByTestId("leave-team-button");

      await act(async () => leaveTeamButton.click());
      const confirmationButton = screen.getByTestId(
          "double-check-confirmation-button"
      );
      await act(async () => confirmationButton.click());
      expect(mockedTeamServiceRemoveUser).toBeCalled();
      await waitFor(() =>
          expect(mockedUsedNavigate).toBeCalledWith(PageRoutes.TEAMS)
      );
    });

    test("render leave team button", async () => {
      render(
          <MemoryRouter initialEntries={["/team/1"]}>
            <Routes>
              <Route path="/team/:id" element={<TeamPage />} />
            </Routes>
          </MemoryRouter>
      );

      const leaveTeamButton = await screen.findByTestId("leave-team-button");
      expect(leaveTeamButton).toBeInTheDocument();
    });

    test("display double check modal when leave team button is clicked", async () => {
      render(
          <MemoryRouter initialEntries={["/team/1"]}>
            <Routes>
              <Route path="/team/:id" element={<TeamPage />} />
            </Routes>
          </MemoryRouter>
      );

      const leaveTeamButton = await screen.findByTestId("leave-team-button");

      await act(async () => leaveTeamButton.click());

      const doubleCheckModal = screen.getByTestId("double-check-modal");
      expect(doubleCheckModal).toBeInTheDocument();
    });

    test("call team service on double check modal confirmation", async () => {
      const mockedTeamServiceRemoveUser = jest
          .spyOn(teamService, REMOVE_USER)
          .mockResolvedValue();
      render(
          <MemoryRouter initialEntries={["/team/1"]}>
            <Routes>
              <Route path="/team/:id" element={<TeamPage />} />
            </Routes>
          </MemoryRouter>
      );

      const leaveTeamButton = await screen.findByTestId("leave-team-button");

      await act(async () => leaveTeamButton.click());
      const confirmationButton = screen.getByTestId(
          "double-check-confirmation-button"
      );
      await act(async () => confirmationButton.click());
      expect(mockedTeamServiceRemoveUser).toBeCalled();
      await waitFor(() => expect(mockedUsedNavigate).toBeCalledWith("/teams"));
    });
  });
});
