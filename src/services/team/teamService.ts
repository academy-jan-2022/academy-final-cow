import client, { ROUTES } from "../infrastructure/ApiClient";
import { Team } from "../../pages/TeamPage/TeamPage.test";
import { Team as GetTeam } from "../../pages/CreateTeamPage/CreateTeamPage";

type CreateTeamResponse = {
  teamId: string;
};

class TeamService {
  async createTeam(team: GetTeam): Promise<string> {
    const resp: CreateTeamResponse = await client.post({
      route: ROUTES.CREATE_TEAM,
      body: { team },
    });
    return resp.teamId;
  }

  async getTeamById(id: string): Promise<Team> {
    throw new Error();
  }
}

const teamService = new TeamService();

export default teamService;
