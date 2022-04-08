import { AxiosResponse } from "axios";
const axios = require("axios");

export class HttpClient {
    async get<T>(request: GetRequest): Promise<T> {
        let url = new URL(request.url);
        for (let key in request.queryParams) {
            url.searchParams.append(key, request.queryParams[key]);
        }
        const response: AxiosResponse<T> = await axios.get(url.toString());
        return response.data;
    }

    async post<T>(request: PostRequest): Promise<T> {
        let url = new URL(request.url);
        const response: AxiosResponse<T> = await axios.post(url.toString(), request.body);
        return response.data;
    }
}

export interface GetRequest {
    url: string;
    readonly queryParams?: { [name: string]: string };
}

export interface PostRequest {
    url: string;
    body: Object;
}

const client = new HttpClient();

export default client;