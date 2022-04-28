import { AxiosResponse } from "axios";
import { storageHandler } from "./StorageHandler";
import { Settings } from "./Settings";

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
    const response: AxiosResponse<T> = await axios.get(url.toString(), {
      headers: { Authorization: `${token}` },
    });
    return response.data;
  }

  async post<T>(request: PostRequest): Promise<T> {
    let url = this.buildUrl(request.route);
    const token = this.getToken();
    const response: AxiosResponse<T> = await axios.post(
      url.toString(),
      request.body,
      { headers: { Authorization: `${token}` } }
    );
    return response.data;
  }

  async delete(request: DeleteRequest): Promise<void> {
    let url = this.buildUrl(request.route);
    const token = this.getToken();
    for (let key in request.queryParams) {
      url.searchParams.append(key, request.queryParams[key]);
    }
    await axios.delete(url.toString(), {
      headers: { Authorization: `${token}` },
    });
  }

  getToken(): string | null {
    const tokenObject: AuthResponse | null =
      storageHandler.getJSONItem("tokenObject");
    return tokenObject ? tokenObject.id_token : null;
  }

  buildUrl(route: API_ENDPOINT): URL {
    return new URL(Settings.getApiUrl() + route);
  }
}

export interface GetRequest {
  route: API_ENDPOINT;
  readonly queryParams?: { [name: string]: string };
}

export interface DeleteRequest {
  route: API_ENDPOINT;
  readonly queryParams?: { [name: string]: string };
}

export interface PostRequest {
  route: API_ENDPOINT;
  body: Object;
}

export enum API_ENDPOINT {
  HEARTBEAT = "/actuator/health",
  CREATE_USER = "/login",
  CREATE_TEAM = "/create-team",
  GENERATE_JOIN_LINK = "/generate-join-link",
  GET_TEAM = "/get-team",
  GET_TEAMS = "/teams",
  CREATE_ACTIVITY = "/create-activity",
  REMOVE_USER = "/remove-user",
}

const apiClient = new ApiClient();

export default apiClient;
