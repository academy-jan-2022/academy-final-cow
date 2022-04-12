import getTeamsByUser from "./getTeamsByUser";

import client from "../infrastructure/HttpClient";
import {storageHandler} from "../infrastructure/StorageHandler";

jest.mock("../infrastructure/HttpClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

jest.mock("../infrastructure/StorageHandler")
const mockedStorageHandler = storageHandler as jest.Mocked<typeof storageHandler>;

describe("get list of teams that the user is part of", () => {
    test("receive a team", async () => {
        const teamBanana = [{ name: "teamBanana" }];
        mockedHttpClient.get = jest.fn().mockReturnValue(teamBanana);

        mockedStorageHandler.getJSONItem.mockReturnValue({token_id: "validToken"})

        const result = await getTeamsByUser();
        expect(mockedHttpClient.get).toBeCalledWith({
            url: process.env.REACT_APP_BASE_URL + "/teams",
            headers: {
                token: "validToken"
            }
        });
        expect(result).toEqual(teamBanana);
    });
});
