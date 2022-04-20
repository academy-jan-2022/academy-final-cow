import { render, screen, waitFor } from "@testing-library/react";
import TeamPage from "./TeamPage";
import teamService from "../../services/team/teamService";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GetTeamResponse as Team } from "../../services/team/Team";

const TEAM_ID = "1";
const TEAM_NAME = "Team 1";
const TEAM_DESCRIPTION = "Team description";
const USER_ONE_ID = "1";
const USER_ONE_FULL_NAME = "Peter Parker";
const USER_TWO_ID = "2";
const USER_TWO_FULL_NAME = "Anna Hello";

const GET_TEAM_METHOD = "getTeamById";

const team: Team = {
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
});
