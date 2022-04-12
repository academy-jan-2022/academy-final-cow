import getTeamsByUser from "./getTeamsByUser";

import client from "../infrastructure/HttpClient";

jest.mock("../infrastructure/HttpClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("get list of teams that the user is part of", () => {
  test("receive a team", async () => {
    const teamBanana = [{ name: "teamBanana" }];
    mockedHttpClient.get = jest.fn().mockReturnValue(teamBanana);

    const result = await getTeamsByUser();

    expect(mockedHttpClient.get).toBeCalledWith({
      url: process.env.REACT_APP_BASE_URL + "/teams",
    });
    expect(result).toEqual(teamBanana);
  });
});