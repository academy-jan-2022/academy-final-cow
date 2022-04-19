import { Team } from "../../pages/CreateTeamPage/CreateTeamPage";
import client, {ROUTES} from "../infrastructure/ApiClient";
import getTeamsByUser from "./getTeamsByUser";

type CreateTeamResponse = {
  teamId: string;
};

class TeamService {
  getAllTeams = getTeamsByUser;

  async createTeam(team: Team): Promise<string> {
    const resp: CreateTeamResponse = await client.post({
      route: ROUTES.CREATE_TEAM,
      body: { team },
    });
    return resp.teamId;
  }
}

const teamService = new TeamService();

export default teamService;
