import httpClient from "../infrastructure/HttpClient";
import { Team } from "./Team";

export default function getTeamsByUser(): Promise<Team> {
  return httpClient.get<Team>({
    url: process.env.REACT_APP_BASE_URL + "/teams",
  });
}
