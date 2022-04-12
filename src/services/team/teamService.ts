import { Team } from "../../pages/CreateTeamPage/CreateTeamPage";
import DomainService from "../domain/domainService";
import { storageHandler } from "../infrastructure/StorageHandler";

type User = {
  userId: string;
  idToken: string;
};

class teamService {
   static execute(team: Team) : string {
    const user: User | null = storageHandler.getJSONItem<User>("user");

    if (user) {
      const { userId, idToken } = user;
      const teamId = DomainService.createTeam(team, userId, idToken);
      return `/team/${teamId}`;
    }
    return "/error";
  };


}


export default teamService;
