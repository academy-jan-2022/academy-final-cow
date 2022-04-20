import { render } from "@testing-library/react";
import TeamPage from "./TeamPage";
import teamService from "../../services/team/teamService";
import { MemoryRouter, Route, Routes } from "react-router-dom";

type User = {
  id: string;
  fullName: string;
};

type Team = {
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

jest.mock("../../services/team/teamService");
const mockedTeamService = teamService as jest.Mocked<typeof teamService>;
mockedTeamService.getTeamById.mockImplementation(() => Promise.resolve(team));

describe("Team page should", () => {
  test("retrieve the team information", () => {
    render(
      <MemoryRouter initialEntries={["/team/1"]}>
        <Routes>
          <Route path="/team/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(mockedTeamService.getTeamById).toHaveBeenCalledWith("1");
  });
});
