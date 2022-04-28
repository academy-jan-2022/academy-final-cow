import teamService from "./teamService";
import client, { API_ENDPOINT } from "../infrastructure/ApiClient";
import { ActivityRequest } from "./Team";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("team service should", () => {
  const members = [
    { id: "id1", fullName: "John" },
    { id: "id2", fullName: "Jeff" },
    { id: "id3", fullName: "James" },
    { id: "id4", fullName: "Jane" },
  ];

  const activity: ActivityRequest = {
    activityName: "new activity",
    teamId: "1",
    numberOfGroups: 2,
    members,
  };

  test("call post request", async () => {
    mockedHttpClient.post.mockResolvedValue({ status: 201 });
    await teamService.createActivity(activity);
    expect(mockedHttpClient.post).toHaveBeenCalledWith({
      route: API_ENDPOINT.CREATE_ACTIVITY,
      body: activity,
    });
  });
});
