import teamService from "./teamService";
import { CreateTeamRequest } from "./Team";
import client, { API_ENDPOINT } from "../infrastructure/ApiClient";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("team service should", () => {
  const team: CreateTeamRequest = { name: "team", description: "desc" };

  test("call post request", async () => {
    mockedHttpClient.post.mockResolvedValue({ teamId: "1" });
    await teamService.createTeam(team);
    expect(mockedHttpClient.post).toHaveBeenCalledWith({
      route: API_ENDPOINT.CREATE_TEAM,
      body: { team },
    });
  });

  test("return team id", async () => {
    mockedHttpClient.post.mockResolvedValue({ teamId: "1" });
    const result = await teamService.createTeam(team);
    expect(result).toEqual({ teamId: "1" });
  });
});
