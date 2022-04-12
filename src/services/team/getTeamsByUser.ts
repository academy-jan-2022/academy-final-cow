import httpClient from "../infrastructure/HttpClient";
import { Team } from "./Team";
import {storageHandler} from "../infrastructure/StorageHandler";

export default function getTeamsByUser() : Promise<Team> {

    const tokenObject = storageHandler.getJSONItem("tokenObject")
    let token = "";
    if (tokenObject !== null) {
        token = tokenObject.token_id;
    }

    let responseData = httpClient.get<Team>({
        url: process.env.REACT_APP_BASE_URL + "/teams",
        headers: {
            token: token,
        }});

    return responseData;
}
