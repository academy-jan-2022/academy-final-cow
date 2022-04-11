import client from "../HttpClient";

jest.mock("../HttpClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("get list of teams that the user is part of", () => {
    test("receive empty array if user is not part of any team", () => {
        const user = { externalId: "someID", idToken: "weokwof" };
        const request = {
            url: "https://teaminator-backend.azurewebsites.net/teams",
            body: {externalId: "someID"},
            headers: {token: "weokwof"}
        };

        const result = mockedHttpClient.get(request)
        expect(result).toHaveLength(0)

        expect(mockedHttpClient.get).toHaveBeenCalledWith(request);
    });
});
