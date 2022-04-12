import getAllTeams from "../team/getAllTeams";

import client from "../HttpClient";


describe("get list of teams that the user is part of", () => {
    test("receive a team", async () => {
        const teamBanana = [{ name: "teamBanana" }];
        jest.mock("../HttpClient", () => ({
            get: jest.fn().mockReturnValue(() => Promise.resolve(teamBanana)),
            post: jest.fn()
        }));

        const result = await getAllTeams();
        expect(client).toBeCalledWith({
            url: "https://some.url.com/team",
            header: {
                token: "something here"
            }
        });
        expect(result).toEqual(teamBanana);
    });
});
