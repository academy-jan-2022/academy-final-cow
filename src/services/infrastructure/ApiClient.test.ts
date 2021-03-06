import client, { API_ENDPOINT } from "./ApiClient";
import { storageHandler } from "./StorageHandler";
import { Settings } from "./Settings";

const axios = require("axios");

jest.mock("axios");
jest.mock("./StorageHandler");
const mockedStorageHandler = storageHandler as jest.Mocked<
  typeof storageHandler
>;

const A_QUERY_PARAM = "bar";
const ANOTHER_QUERY_PARAM = "meh";

const BASE_URL = Settings.getApiUrl();

const GET_RESPONSE_BODY_PROP = "banana";
const POST_RESPONSE_BODY_PROP = "apple";
const AUTHORIZATION_HEADER = { headers: { Authorization: `works` } };

describe("ApiClient should", function () {
  beforeEach(async () => {
    const getList = { data: { name: GET_RESPONSE_BODY_PROP } };
    const postList = { data: { name: POST_RESPONSE_BODY_PROP } };
    axios.get.mockImplementation(() => Promise.resolve(getList));
    axios.post.mockImplementation(() => Promise.resolve(postList));
    axios.delete.mockImplementation(() => Promise.resolve());
    mockedStorageHandler.getJSONItem.mockReturnValue({ id_token: "works" });
  });

  type RequestResponseType = {
    name: string;
  };

  test("url is called", async () => {
    const result = await client.get<RequestResponseType>({
      route: API_ENDPOINT.HEARTBEAT,
      queryParams: {
        foo: A_QUERY_PARAM,
        baz: ANOTHER_QUERY_PARAM,
      },
    });

    expect(result).toEqual({ name: GET_RESPONSE_BODY_PROP });
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}${API_ENDPOINT.HEARTBEAT}?foo=${A_QUERY_PARAM}&baz=${ANOTHER_QUERY_PARAM}`,
      AUTHORIZATION_HEADER
    );
  });

  test("post is called", async () => {
    const body = { bodyProp: "aBodyProp" };
    const result = await client.post<RequestResponseType>({
      route: API_ENDPOINT.CREATE_TEAM,
      body,
    });

    expect(result.name).toEqual(POST_RESPONSE_BODY_PROP);
    expect(axios.post).toHaveBeenCalledWith(
      BASE_URL + API_ENDPOINT.CREATE_TEAM,
      body,
      AUTHORIZATION_HEADER
    );
  });

  test("delete is called", async () => {
    await client.delete({
      route: API_ENDPOINT.HEARTBEAT,
      queryParams: {
        foo: A_QUERY_PARAM,
        baz: ANOTHER_QUERY_PARAM,
      },
    });

    expect(axios.delete).toHaveBeenCalledWith(
      `${BASE_URL}${API_ENDPOINT.HEARTBEAT}?foo=${A_QUERY_PARAM}&baz=${ANOTHER_QUERY_PARAM}`,
      AUTHORIZATION_HEADER
    );
  });

  test("storage handler is called to get token", async () => {
    await client.get<RequestResponseType>({
      route: API_ENDPOINT.HEARTBEAT,
    });

    expect(storageHandler.getJSONItem).toHaveBeenCalledWith("tokenObject");
  });
});
