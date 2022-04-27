import teamService from "./teamService";
import client, { API_ENDPOINT } from "../infrastructure/ApiClient";
import { PageRoutes } from "../../pages/pageRoutes";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("generate join link should", () => {
  test("call post request", async () => {
    mockedHttpClient.post.mockResolvedValue({ token: "456456456" });
    await teamService.generateJoinLink("1");
    expect(mockedHttpClient.post).toHaveBeenCalledWith({
      route: API_ENDPOINT.GENERATE_JOIN_LINK,
      body: { teamId: "1" },
    });
  });

  test("return formed link", async () => {
    const tokenId = "456456456";
    mockedHttpClient.post.mockResolvedValue({ token: tokenId });
    const expectedPath = PageRoutes.JOIN_TEAM.replace(":joinTokenId", tokenId);

    const response = await teamService.generateJoinLink("1");

    expect(response.link).toContain(expectedPath);
  });
});
