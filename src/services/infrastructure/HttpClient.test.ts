import client from "./HttpClient";
import { storageHandler } from "./StorageHandler";
const axios = require("axios");

jest.mock("axios");
jest.mock("./StorageHandler");
const mockedStorageHandler = storageHandler as jest.Mocked<typeof storageHandler>

const TOKEN = "token";
const A_QUERY_PARAM = "bar";
const ANOTHER_QUERY_PARAM = "meh";

const BASE_URL = "https://some.url.com/";
let GET_REQUEST_URL = `${BASE_URL}?foo=${A_QUERY_PARAM}&baz=${ANOTHER_QUERY_PARAM}`;
let POST_REQUEST_URL = `${BASE_URL}get-apple`;

const GET_RESPONSE_BODY_PROP = "banana";
const POST_RESPONSE_BODY_PROP = "apple";
const AUTHORIZATION_HEADER = { headers: { Authorization: `works` }};

describe("HttpClient should", function () {
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
      url: BASE_URL,
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
      url: POST_REQUEST_URL,
      body,
      headers: {
        token: TOKEN,
      },
    });

    expect(result.name).toEqual(POST_RESPONSE_BODY_PROP);
    expect(axios.post).toHaveBeenCalledWith(POST_REQUEST_URL, body, {
      headers: { Authorization: TOKEN },
    });
  });

  test("storage handler is called to get token", async () => {

    const result = await client.get<RequestResponseType>({
      url: BASE_URL,
    });

    expect(storageHandler.getJSONItem).toHaveBeenCalledWith("tokenObject")
    expect(axios.get).toHaveBeenCalledWith(BASE_URL, AUTHORIZATION_HEADER )
  });

});
