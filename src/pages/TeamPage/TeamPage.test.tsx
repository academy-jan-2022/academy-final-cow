import { render, screen } from "@testing-library/react";
import TeamPage from "./TeamPage";
import teamService from "../../services/team/teamService";

beforeEach(() => {
  render(<TeamPage />);
});

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
      fullName: "Peter Parker"
    },
    {
      id: "2",
      fullName: "Anna Hello"
    }
  ]
};

jest.mock("../../services/team/teamService");
const mockedTeamService = teamService as jest.Mocked<typeof teamService>;
mockedTeamService.getTeamById.mockImplementation(() => Promise.resolve(team));

describe("Team page should", () => {
  // test("render the team name as a title", () => {
  //   const title = screen.getByRole("heading", { level: 1 });
  //   expect(title).toBeInTheDocument();
  //   expect(title).toHaveTextContent("Team 1");
  // });

  test("retrieve the team information", () => {
    expect(mockedTeamService.getTeamById).toHaveBeenCalledWith("1");
  });
});
