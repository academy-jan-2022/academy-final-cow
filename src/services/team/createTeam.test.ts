import teamService from "./teamService";
import { Team } from "../../pages/CreateTeamPage/CreateTeamPage";
import client, { ROUTES } from "../infrastructure/ApiClient";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("team service should", () => {
  const team: Team = { name: "team", description: "desc" };

  test("call post request", async () => {
    mockedHttpClient.post.mockResolvedValue({ teamId: "1" });
    await teamService.createTeam(team);
    expect(mockedHttpClient.post).toHaveBeenCalledWith({ route: ROUTES.CREATE_TEAM, body: { team } });
  });

  test("return team id", async () => {
    mockedHttpClient.post.mockResolvedValue({ teamId: "1" });
    const result = await teamService.createTeam(team);
    expect(result).toEqual("1");
  });
});