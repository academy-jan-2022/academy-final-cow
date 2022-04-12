import client from "../HttpClient";

const axios = require('axios');
jest.mock("axios");
const url = 'https://some.url.com'


describe("get list of teams that the user is part of", () => {
    test("receive empty array if user is not part of any team", async () => {
        // given
        const teams = []

        // when
        const result = await client.getTeams()

        // then
        expect(axios.get).toHaveBeenCalledWith(`${url}/teams`)
        expect(result).toEqual(teams)
    });
});
