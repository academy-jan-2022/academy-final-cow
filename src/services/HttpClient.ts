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
}

export interface GetRequest {
    url: string;
    readonly queryParams?: { [name: string]: string };
}

const client = new HttpClient();

export default client;