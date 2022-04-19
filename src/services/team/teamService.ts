import { Team } from "../../pages/CreateTeamPage/CreateTeamPage";
import client, { ROUTES } from "../infrastructure/ApiClient";

type CreateTeamResponse = {
  teamId: string;
};

class TeamService {
  async createTeam(team: Team): Promise<string> {
    const resp: CreateTeamResponse = await client.post({
      route: ROUTES.CREATE_TEAM,
      body: { team }
    });
    return resp.teamId;
  }

  async getTeamById(id: number): Promise<Team> {
    throw new Error();
  }
}

const teamService = new TeamService();

export default teamService;
