import getAllTeams from "../team/getAllTeams";

import client from "../HttpClient";
import {storageHandler} from "../StorageHandler";

jest.mock("../HttpClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

jest.mock("../StorageHandler")
const mockedStorageHandler = storageHandler as jest.Mocked<typeof storageHandler>;

describe("get list of teams that the user is part of", () => {
    test("receive a team", async () => {
        const teamBanana = [{ name: "teamBanana" }];
        mockedHttpClient.get = jest.fn().mockReturnValue(teamBanana);

        mockedStorageHandler.getJSONItem.mockReturnValue({token_id: "validToken"})

        const result = await getAllTeams();
        expect(mockedHttpClient.get).toBeCalledWith({
            url: process.env.REACT_APP_BASE_URL + "/teams",
            headers: {
                token: "validToken"
            }
        });
        expect(result).toEqual(teamBanana);
    });
});
