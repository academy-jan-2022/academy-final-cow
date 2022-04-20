import client, { ROUTES } from "../infrastructure/ApiClient";
import { CreateTeamRequest, GetTeamResponse } from "./Team";

type CreateTeamResponse = {
  teamId: string;
};

class TeamService {
  async createTeam(team: CreateTeamRequest): Promise<string> {
    const resp: CreateTeamResponse = await client.post({
      route: ROUTES.CREATE_TEAM,
      body: { team }
    });
    return resp.teamId;
  }

  async getTeamById(id: string): Promise<GetTeamResponse> {
    const response: GetTeamResponse = await client.get({
      route: ROUTES.GET_TEAM,
      queryParams: { id }
    });
    return response;
  }
}

const teamService = new TeamService();

export default teamService;
