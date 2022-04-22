import teamService from "./teamService";
import client from "../infrastructure/ApiClient";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("get list of teams that the user is part of", () => {
  test("receive a team", async () => {
    const teamBanana = [{ name: "teamBanana" }];
    const mockedResponse = { teams: teamBanana };
    mockedHttpClient.get = jest.fn().mockReturnValue(mockedResponse);

    const result = await teamService.getTeamsByUser();

    expect(mockedHttpClient.get).toBeCalledWith({
      route: "/teams",
    });
    expect(result).toEqual(teamBanana);
  });
});
