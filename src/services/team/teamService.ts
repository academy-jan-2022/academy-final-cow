import { Team } from "./Team";
import client, { ROUTES } from "../infrastructure/ApiClient";

type CreateTeamResponse = {
  teamId: string;
};

class TeamService {
  async getTeamsByUser(): Promise<Team[]> {
    return await client.get<Team[]>({
      route: ROUTES.GET_TEAMS,
    });
  }

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
