import { AxiosResponse } from "axios";
import {storageHandler} from "./StorageHandler";

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

export class HttpClient {
  async get<T>(request: GetRequest): Promise<T> {
    let url = new URL(request.url);
    const token = this.getToken();
    for (let key in request.queryParams) {
      url.searchParams.append(key, request.queryParams[key]);
    }
    const response: AxiosResponse<T> = await axios.get(url.toString(), { headers: { Authorization: `${token}` } });
    return response.data;
  }

  async post<T>(request: PostRequest): Promise<T> {
    let url = new URL(request.url);
    const response: AxiosResponse<T> = await axios.post(
      url.toString(),
      request.body,
      { headers: { Authorization: `${request.headers.token}` } }
    );
    return response.data;
  }

  getToken(): string | null {
    const tokenObject: AuthResponse | null = storageHandler.getJSONItem("tokenObject")

    if (tokenObject) {
      return tokenObject.id_token;
    } else
    {return null}
}
}

export interface GetRequest {
  url: string;
  readonly queryParams?: { [name: string]: string };
  headers?: {
    token: string;
  };
}

export interface PostRequest {
  url: string;
  body: Object;
  headers: {
    token: string;
  };
}

const client = new HttpClient();

export default client;
