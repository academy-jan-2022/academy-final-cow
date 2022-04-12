import {Team} from "../../pages/CreateTeamPage/CreateTeamPage";
import getTeamsByUser from "./getTeamsByUser";
import client from "../infrastructure/HttpClient"

type CreateTeamResponse = {
    teamId: string
}

class TeamService {
   getAllTeams = getTeamsByUser;
   async createTeam(team: Team): Promise<string> {
       try {
           const resp: CreateTeamResponse = await client.post({url: "/create-team", body: {team}});
           return resp.teamId;
       } catch(e) {
           console.log(e)
           throw new Error();
       }
   }
}

const teamService = new TeamService();

export default teamService;
