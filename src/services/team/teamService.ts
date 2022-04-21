import client, { ROUTES } from "../infrastructure/ApiClient";
import { Team } from "../../pages/TeamPage/TeamPage.test";
import { Team as GetTeam } from "../../pages/CreateTeamPage/CreateTeamPage";

type CreateTeamResponse = {
  teamId: string;
};

type GenerateJoinLinkResponse = {
  link: string;
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

  async generateJoinLink(teamId: string): Promise<GenerateJoinLinkResponse> {
    const resp: { token: string } = await client.post({
      route: ROUTES.GENERATE_JOIN_LINK,
      body: { teamId },
    });

    return { link: `${window.location.origin}/join/${resp.token}` };
  }
}

const teamService = new TeamService();

export default teamService;
