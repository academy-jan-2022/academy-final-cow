import teamService from "./teamService";
import client, { ROUTES } from "../infrastructure/ApiClient";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("generate join link should", () => {

  test("call post request", async () => {
    mockedHttpClient.post.mockResolvedValue({ token: "456456456" });
    await teamService.generateJoinLink("1");
    expect(mockedHttpClient.post).toHaveBeenCalledWith({
      route: ROUTES.GENERATE_JOIN_LINK,
      body: { teamId: "1" },
    });
  });

  test("return formed link", async () => {
    mockedHttpClient.post.mockResolvedValue({ token: "456456456" });
    let response = await teamService.generateJoinLink("1");
    expect(response.link).toContain("/join/456456456");
  });
});