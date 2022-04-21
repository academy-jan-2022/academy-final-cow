import teamService from "./teamService";
import { Team } from "../create/CreateTeamPage";
import client, {ROUTES} from "../../shared/infrastructure/ApiClient";

jest.mock("../../shared/infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("team service should", () => {
  const team: Team = { name: "team", description: "desc" };

  test("call post request", async () => {
    mockedHttpClient.post.mockResolvedValue({teamId: "1"});
    await teamService.createTeam(team);
    expect(mockedHttpClient.post).toHaveBeenCalledWith({route: ROUTES.CREATE_TEAM, body: {team}});
  });

  test("return team id", async () => {
    mockedHttpClient.post.mockResolvedValue({teamId: "1"});
    const result = await teamService.createTeam(team);
    expect(result).toEqual("1");
  });
});

describe("get list of teams that the user is part of", () => {
  test("receive a team", async () => {
    const teamBanana = [{ name: "teamBanana" }];
    const mockedResponse = {teams: teamBanana}
    mockedHttpClient.get = jest.fn().mockReturnValue(mockedResponse);

    const result = await teamService.getTeamsByUser();

    expect(mockedHttpClient.get).toBeCalledWith({
      route: "/teams",
    });
    expect(result).toEqual(teamBanana);
  });
});