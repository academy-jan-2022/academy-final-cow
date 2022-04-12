import teamService from "./teamService";
import { storageHandler } from "../infrastructure/StorageHandler";
import { Team } from "../../pages/CreateTeamPage/CreateTeamPage";
import createTeam from "../domain/createTeam";
import DomainService from "../domain/domainService";
import domainService from "../domain/domainService";

jest.mock("../domain/domainService");
const mockedDomainService = DomainService as jest.Mocked<typeof DomainService>;

const userId = "userId";
const idToken = "token";
const user = { userId, idToken };

jest.mock("../infrastructure/StorageHandler");
const mockedStorageHandler = storageHandler as jest.Mocked<
  typeof storageHandler
>;

describe("team service should", () => {
  const team: Team = { name: "team", description: "desc" };

  beforeEach(() => {
    mockedStorageHandler.getJSONItem = jest.fn().mockReturnValue(user);
    teamService(team);
  });

  test("get the user", () => {
    expect(mockedStorageHandler.getJSONItem).toBeCalledWith("user");
  });

  test("call create team", () => {
    expect(domainService.createTeam).toBeCalledWith(team, userId, idToken);
  });

  test("return correct route", () => {
    mockedDomainService.createTeam.mockReturnValue("1")

      expect(teamService(team)).toEqual("/team/1")
  });

});