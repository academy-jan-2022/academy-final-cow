import client from "./ApiClient";
import { storageHandler } from "./StorageHandler";
import {Settings} from "./Settings";
const axios = require("axios");

jest.mock("axios");
jest.mock("./StorageHandler");
const mockedStorageHandler = storageHandler as jest.Mocked<typeof storageHandler>

const TOKEN = "token";
const A_QUERY_PARAM = "bar";
const ANOTHER_QUERY_PARAM = "meh";

const BASE_URL = Settings.getApiUrl();
const GET_REQUEST_ROUTE=`/?foo=${A_QUERY_PARAM}&baz=${ANOTHER_QUERY_PARAM}`;
const POST_REQUEST_ROUTE=`/get-apple`;
let GET_REQUEST_URL = BASE_URL + GET_REQUEST_ROUTE;
let POST_REQUEST_URL = BASE_URL + POST_REQUEST_ROUTE;

const GET_RESPONSE_BODY_PROP = "banana";
const POST_RESPONSE_BODY_PROP = "apple";
const AUTHORIZATION_HEADER = { headers: { Authorization: `works` }};

describe("ApiClient should", function () {
  beforeEach(async () => {
    const getList = { data: { name: GET_RESPONSE_BODY_PROP } };
    const postList = { data: { name: POST_RESPONSE_BODY_PROP } };
    axios.get.mockImplementation(() => Promise.resolve(getList));
    axios.post.mockImplementation(() => Promise.resolve(postList));
    mockedStorageHandler.getJSONItem.mockReturnValue({id_token: "works"});
  });

  type RequestResponseType = {
    name: string;
  };

  test("url is called", async () => {
    const result = await client.get<RequestResponseType>({
      route: "/",
      queryParams: {
        foo: A_QUERY_PARAM,
        baz: ANOTHER_QUERY_PARAM,
      },
    });

    expect(result).toEqual({ name: GET_RESPONSE_BODY_PROP });
    expect(axios.get).toHaveBeenCalledWith(GET_REQUEST_URL, AUTHORIZATION_HEADER);
  });

  test("post is called", async () => {
    const body = { bodyProp: "aBodyProp" };
    const result = await client.post<RequestResponseType>({
      route: POST_REQUEST_ROUTE,
      body,
    });

    expect(result.name).toEqual(POST_RESPONSE_BODY_PROP);
    expect(axios.post).toHaveBeenCalledWith(POST_REQUEST_URL, body, AUTHORIZATION_HEADER);
  });

  test("storage handler is called to get token", async () => {

    await client.get<RequestResponseType>({
      route: GET_REQUEST_ROUTE,
    });

    expect(storageHandler.getJSONItem).toHaveBeenCalledWith("tokenObject")
    expect(axios.get).toHaveBeenCalledWith(GET_REQUEST_URL, AUTHORIZATION_HEADER )
  });

});
