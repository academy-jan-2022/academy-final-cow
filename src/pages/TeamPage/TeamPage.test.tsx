import { render, screen, waitFor } from "@testing-library/react";
import TeamPage from "./TeamPage";
import teamService from "../../services/team/teamService";
import { MemoryRouter, Route, Routes } from "react-router-dom";

type User = {
  id: string;
  fullName: string;
};

export type Team = {
  id: string;
  name: string;
  description: string;
  members: User[];
};

const team: Team = {
  id: "1",
  name: "Team 1",
  description: "Team description",
  members: [
    {
      id: "1",
      fullName: "Peter Parker",
    },
    {
      id: "2",
      fullName: "Anna Hello",
    },
  ],
};

describe("Team page should", () => {
  test("retrieve the team information", async () => {
    const mockedTeamService = jest
      .spyOn(teamService, "getTeamById")
      .mockResolvedValue(team);
    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockedTeamService).toHaveBeenCalledWith("1"));

    mockedTeamService.mockRestore();
  });

  test("render the team name as a title", async () => {
    const mockedTeamService = jest
      .spyOn(teamService, "getTeamById")
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
        "Team 1"
      )
    );

    mockedTeamService.mockRestore();
  });
});
