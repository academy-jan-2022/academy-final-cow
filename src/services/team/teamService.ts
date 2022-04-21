import { Team } from "./Team";
import client, { ROUTES } from "../infrastructure/ApiClient";

type CreateTeamResponse = {
  teamId: string;
};

type GetTeamResponse = {
  teams: Team[];
};

class TeamService {
  async getTeamsByUser(): Promise<Team[]> {

    const response: GetTeamResponse = await client.get({
      route: ROUTES.GET_TEAMS,
    });

    return response.teams;
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
