import client, { API_ENDPOINT } from "../infrastructure/ApiClient";
import teamService from "./teamService";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("get team by id should", () => {
  test("called the api client with route and id", async () => {
    const id = "1";
    await teamService.getTeamById(id);

    expect(mockedHttpClient.get).toHaveBeenCalledWith({
      route: API_ENDPOINT.GET_TEAM,
      queryParams: { id },
    });
  });
});
