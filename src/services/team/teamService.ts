import client, { API_ENDPOINT } from "../infrastructure/ApiClient";
import {
  ActivityRequest,
  CreateTeamRequest,
  GetTeamResponse,
  GetTeamsResponse,
  TeamByUser,
} from "./Team";

type CreateTeamResponse = {
  teamId: string;
};

type GenerateJoinLinkResponse = {
  link: string;
};

type AddMemberResponse = CreateTeamResponse

class TeamService {
  async getTeamsByUser(): Promise<TeamByUser[]> {
    const response: GetTeamsResponse = await client.get({
      route: API_ENDPOINT.GET_TEAMS,
    });

    return response.teams;
  }

  async createTeam(team: CreateTeamRequest): Promise<CreateTeamResponse> {
    return client.post({
      route: API_ENDPOINT.CREATE_TEAM,
      body: { team },
    });
  }

  async getTeamById(id: string): Promise<GetTeamResponse> {
    return client.get({
      route: API_ENDPOINT.GET_TEAM,
      queryParams: { id },
    });
  }

  async generateJoinLink(teamId: string): Promise<GenerateJoinLinkResponse> {
    const resp: { token: string } = await client.post({
      route: API_ENDPOINT.GENERATE_JOIN_LINK,
      body: { teamId },
    });

    return { link: `${window.location.origin}/join/${resp.token}` };
  }

  async createActivity(activity: ActivityRequest) {
    await client.post({
      route: API_ENDPOINT.CREATE_ACTIVITY,
      body: activity,
    });
  }

  async addMember(joinTokenId: string | undefined): Promise<AddMemberResponse> {
    return await client.post({
      route: API_ENDPOINT.JOIN_TEAM,
      body: { joinTokenId },
    });
  }

  async removeUser(teamId: string) {
    await client.delete({
      route: API_ENDPOINT.REMOVE_USER,
      queryParams: { teamId },
    });
  }
}

const teamService = new TeamService();

export default teamService;
