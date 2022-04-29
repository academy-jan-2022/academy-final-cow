import teamService from "./teamService";
import { CreateTeamRequest } from "./Team";
import client, { API_ENDPOINT } from "../infrastructure/ApiClient";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("remove user should", () => {
  const team: CreateTeamRequest = { name: "team", description: "desc" };

  test("call delete request", async () => {
    let teamId = "1";
    await teamService.removeUser(teamId);
    expect(mockedHttpClient.delete).toHaveBeenCalledWith({
      route: API_ENDPOINT.REMOVE_USER,
      queryParams: { teamId },
    });
  });
});
