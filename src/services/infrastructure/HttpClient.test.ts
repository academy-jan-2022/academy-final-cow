import client from "./HttpClient";
const axios = require("axios");

jest.mock("axios");

const TOKEN = "token";
const A_QUERY_PARAM = "bar";
const ANOTHER_QUERY_PARAM = "meh";

const BASE_URL = "https://some.url.com";
let GET_REQUEST_URL = `${BASE_URL}/?foo=${A_QUERY_PARAM}&baz=${ANOTHER_QUERY_PARAM}`;
let POST_REQUEST_URL = `${BASE_URL}/get-apple`;

const GET_RESPONSE_BODY_PROP = "banana";
const POST_RESPONSE_BODY_PROP = "apple";

describe("HttpClient should", function () {
  beforeEach(async () => {
    const getList = { data: { name: GET_RESPONSE_BODY_PROP } };
    const postList = { data: { name: POST_RESPONSE_BODY_PROP } };
    axios.get.mockImplementation(() => Promise.resolve(getList));
    axios.post.mockImplementation(() => Promise.resolve(postList));
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
    expect(axios.get).toHaveBeenCalledWith(GET_REQUEST_URL);
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
});
