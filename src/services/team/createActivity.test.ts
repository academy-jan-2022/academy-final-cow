import teamService from "./teamService";
import { ActivityRequest } from "../../components/ActivityModal/ActivityModal";
import client, { API_ENDPOINT } from "../infrastructure/ApiClient";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("team service should", () => {
  const members = [
    { userId: "id1", fullName: "John" },
    { userId: "id2", fullName: "Jeff" },
    { userId: "id3", fullName: "James" },
    { userId: "id4", fullName: "Jane" },
  ];

  const activity: ActivityRequest = {
    activityName: "new activity",
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
