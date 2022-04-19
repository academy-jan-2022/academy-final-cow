import client, {ROUTES} from "../infrastructure/ApiClient";
import { Team } from "./Team";

export default async function getTeamsByUser(): Promise<Team[]> {
  const result = await client.get<Team[]>({
    route: ROUTES.GET_TEAMS,
  });

  return result;

}
