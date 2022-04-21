import {AxiosResponse} from "axios";
import {storageHandler} from "./StorageHandler";
import {Settings} from "../settings/Settings";

const axios = require("axios");

interface AuthResponse {
    readonly access_token: string;
    readonly id_token: string;
    readonly login_hint: string;
    readonly scope: string;
    readonly expires_in: number;
    readonly first_issued_at: number;
    readonly expires_at: number;
}

class ApiClient {
    async get<T>(request: GetRequest): Promise<T> {
        let url = this.buildUrl(request.route);
        const token = this.getToken();
        for (let key in request.queryParams) {
            url.searchParams.append(key, request.queryParams[key]);
        }
        const response: AxiosResponse<T> = await axios.get(url.toString(), {headers: {Authorization: `${token}`}});
        return response.data;
    }

    async post<T>(request: PostRequest): Promise<T> {
        let url = this.buildUrl(request.route);
        const token = this.getToken();
        const response: AxiosResponse<T> = await axios.post(
            url.toString(),
            request.body,
            {headers: {Authorization: `${token}`}}
        );
        return response.data;
    }

    getToken(): string | null {
        const tokenObject: AuthResponse | null = storageHandler.getJSONItem("tokenObject")
        return tokenObject ? tokenObject.id_token : null;
    }

    buildUrl(route: ROUTES): URL {
        return new URL(Settings.getApiUrl() + route);
    }
}

export interface GetRequest {
    route: ROUTES;
    readonly queryParams?: { [name: string]: string };
}

export interface PostRequest {
    route: ROUTES;
    body: Object;
}

export enum ROUTES {
    HEARTBEAT = "/actuator/health",
    CREATE_USER = "/login",
    CREATE_TEAM = "/create-team",
    GET_TEAMS = "/teams"
}

const apiClient = new ApiClient();

export default apiClient;
