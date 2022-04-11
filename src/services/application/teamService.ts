import { Team } from "../../pages/CreateTeamPage/CreateTeamPage";
import createTeam from "../domain/createTeam";
import { storageHandler } from "../infrastructure/StorageHandler";

type User = {
  userId: string,
  idToken: string
}

const teamService = (team: Team): string => {
  const user: User|null = storageHandler.getJSONItem<User>("user");

  if (user) {
    const {userId, idToken} = user;
    createTeam(team, userId, idToken);
  }  

  return "hasdfasdf";
};

export default teamService;

