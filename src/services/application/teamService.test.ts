import teamService from "./teamService";
import { storageHandler } from "../infrastructure/StorageHandler";
import { Team } from "../../pages/CreateTeamPage/CreateTeamPage";
import createTeam from "../domain/createTeam";

jest.mock("../domain/createTeam");
const mockedCreateTeam = createTeam as jest.Mocked<typeof createTeam>;

  const userId = "userId";
  const idToken = "token";
  const user = {userId, idToken};

  jest.mock("../infrastructure/StorageHandler");
  const mockedStorageHandler = storageHandler as jest.Mocked<typeof storageHandler>;

describe("team service should", () => {
    const team: Team = {name: "team", description: "desc"};

    beforeEach(() => {
        mockedStorageHandler.getJSONItem = jest.fn().mockReturnValue(user);
        teamService(team);
    })
    
    test("get the user", () => {
        expect(mockedStorageHandler.getJSONItem).toBeCalledWith("user");
    })

    test("call create team", () => {
        expect(mockedCreateTeam).toBeCalledWith(team, userId, idToken);
    })
});