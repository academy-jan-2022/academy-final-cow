import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TeamPage from "./TeamPage";
import teamService from "../../services/team/teamService";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { GetTeamResponse } from "../../services/team/Team";

const TEAM_ID = "1";
const TEAM_NAME = "Team 1";
const TEAM_DESCRIPTION = "Team description";
const USER_ONE_ID = "1";
const USER_ONE_FULL_NAME = "Peter Parker";
const USER_TWO_ID = "2";
const USER_TWO_FULL_NAME = "Anna Hello";

const GET_TEAM_METHOD = "getTeamById";
const GENERATE_JOIN_LINK = "generateJoinLink";
const CREATE_ACTIVITY = "createActivity";

const team: GetTeamResponse = {
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

describe("Team page should", () => {
  test("retrieve the team information", async () => {
    const mockedTeamService = jest
      .spyOn(teamService, GET_TEAM_METHOD)
      .mockResolvedValue(team);
    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(mockedTeamService).toHaveBeenCalledWith(TEAM_ID)
    );

    mockedTeamService.mockRestore();
  });

  test("render the team name as a title", async () => {
    const mockedTeamService = jest
      .spyOn(teamService, GET_TEAM_METHOD)
      .mockResolvedValue(team);

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        TEAM_NAME
      )
    );

    mockedTeamService.mockRestore();
  });

  test("render the team description", async () => {
    const mockedTeamService = jest
      .spyOn(teamService, GET_TEAM_METHOD)
      .mockResolvedValue(team);

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const teamDescription = await screen.findByText(TEAM_DESCRIPTION);
    expect(teamDescription).toBeInTheDocument();

    mockedTeamService.mockRestore();
  });

  test("render team members", async () => {
    const mockedTeamService = jest
      .spyOn(teamService, GET_TEAM_METHOD)
      .mockResolvedValue(team);

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const teamMembers = await screen.findByRole("list");
    expect(teamMembers).toHaveTextContent(USER_ONE_FULL_NAME);
    expect(teamMembers).toHaveTextContent(USER_TWO_FULL_NAME);

    mockedTeamService.mockRestore();
  });

  test("render generate join team link button", async () => {
    const mockedTeamService = jest
      .spyOn(teamService, GET_TEAM_METHOD)
      .mockResolvedValue(team);

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const joinButton = await screen.findByText("create join link");
    expect(joinButton).toBeInTheDocument();
    mockedTeamService.mockRestore();
  });

  test("calls generate uri on button clicked", async () => {
    jest.spyOn(teamService, GET_TEAM_METHOD).mockResolvedValue(team);

    const mockedGenerateJoinLink = jest
      .spyOn(teamService, GENERATE_JOIN_LINK)
      .mockResolvedValue({ link: "mocked url" });

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const joinButton = await screen.findByText("create join link");
    await act(async () => await joinButton.click());

    expect(mockedGenerateJoinLink).toHaveBeenCalledWith("1");
  });

  test("does not render modal when button has not been clicked", async () => {
    jest.spyOn(teamService, GET_TEAM_METHOD).mockResolvedValue(team);

    jest
      .spyOn(teamService, GENERATE_JOIN_LINK)
      .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const modal = screen.queryByText("http://localhost:3000/join/123456");

    await waitFor(() => expect(modal).not.toBeInTheDocument());
  });

  test("display the create activity button", async () => {
    jest.spyOn(teamService, GET_TEAM_METHOD).mockResolvedValue(team);

    jest
      .spyOn(teamService, GENERATE_JOIN_LINK)
      .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const activityButton = await screen.findByText("create new activity");
    expect(activityButton).toBeInTheDocument();
  });

  test("display the create activity modal when you click create activity button", async () => {
    jest.spyOn(teamService, GET_TEAM_METHOD).mockResolvedValue(team);

    jest
      .spyOn(teamService, GENERATE_JOIN_LINK)
      .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const activityButton = await screen.findByText("create new activity");

    await act(async () => activityButton.click());

    const activityModal = screen.getByTestId("activity-modal");
    expect(activityModal).toBeInTheDocument();
  });

  test("display the header text at modal when you click create activity button", async () => {
    jest.spyOn(teamService, GET_TEAM_METHOD).mockResolvedValue(team);

    jest
      .spyOn(teamService, GENERATE_JOIN_LINK)
      .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const activityButton = await screen.findByText("create new activity");

    await act(async () => activityButton.click());

    const activityHeader = screen.getByTestId("activity-header-text");
    expect(activityHeader).toBeInTheDocument();
  });

  test("display the activity name field at modal when you click create activity button", async () => {
    jest.spyOn(teamService, GET_TEAM_METHOD).mockResolvedValue(team);

    jest
      .spyOn(teamService, GENERATE_JOIN_LINK)
      .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const activityButton = await screen.findByText("create new activity");

    await act(async () => activityButton.click());

    const nameFieldElement = screen.getByTestId("activity-name-field");
    expect(nameFieldElement).toBeInTheDocument();
  });
  test("display the submit button at modal when you click create activity button", async () => {
    jest.spyOn(teamService, GET_TEAM_METHOD).mockResolvedValue(team);

    jest
      .spyOn(teamService, GENERATE_JOIN_LINK)
      .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const activityButton = await screen.findByText("create new activity");

    await act(async () => activityButton.click());

    const activitySubmitButton = screen.getByTestId("activity-submit-button");
    expect(activitySubmitButton).toBeInTheDocument();
  });

  test("call team service when activity name is filled and submit button clicked", async () => {
    jest.spyOn(teamService, GET_TEAM_METHOD).mockResolvedValue(team);

    jest
      .spyOn(teamService, GENERATE_JOIN_LINK)
      .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

    const mockedTeamService = jest.spyOn(teamService, CREATE_ACTIVITY);

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const activityButton = await screen.findByText("create new activity");

    await act(async () => activityButton.click());
    const activityNameText = screen.getByTestId("activity-name-field");
    fireEvent.change(activityNameText, { target: { value: "my activity" } });
    const activitySubmitButton = screen.getByTestId("activity-submit-button");
    activitySubmitButton.click();
    expect(mockedTeamService).toBeCalled();
  });
  test("display activities box of the team when they exist", async () => {
    const teamWithActivity: GetTeamResponse = {
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
      activities:[{name: "My activity", groups:[{name:"cowboy"}]}],
    };
      jest.spyOn(teamService, GET_TEAM_METHOD).mockResolvedValue(teamWithActivity);

      jest
        .spyOn(teamService, GENERATE_JOIN_LINK)
        .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

     render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const activityBox =  await waitFor(()=>screen.getByTestId("activity-box"));
    expect(activityBox).toBeInTheDocument();
  })

  test("not display activities box of the team when they dont exist", async () => {
    const teamWithoutActivity: GetTeamResponse = {
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
      activities:[],
    };
    jest.spyOn(teamService, GET_TEAM_METHOD).mockResolvedValue(teamWithoutActivity);

    jest
      .spyOn(teamService, GENERATE_JOIN_LINK)
      .mockResolvedValue({ link: "http://localhost:3000/join/123456" });

    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const activityBox =  await waitFor(()=>screen.queryAllByTestId("activity-box"));
    expect(activityBox.length).toEqual(0);
  })
});
