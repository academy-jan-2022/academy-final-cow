import teamService from "./teamService";
import client, {API_ENDPOINT} from "../infrastructure/ApiClient";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("add member should", () => {
    test("call the api client with route and joinToken", async () => {
            const joinTokenId = "ihnirew-wio56";
            const joinTokenBody = {joinTokenId: joinTokenId};

            await teamService.addMember(joinTokenId);

            expect(mockedHttpClient.post).toHaveBeenCalledWith({
                route: API_ENDPOINT.JOIN_TEAM,
                body: joinTokenBody
        });
    });
});

