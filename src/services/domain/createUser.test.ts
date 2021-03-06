import createUser from "./createUser";
import client, { API_ENDPOINT } from "../infrastructure/ApiClient";

jest.mock("../infrastructure/ApiClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

const USER_EXTERNAL_ID = "someID";
const USER_FULL_NAME = "test name";
const USER_ID_TOKEN = "user id token";

describe("create user should", () => {
  test("call http client post method with the expected request", () => {
    const user = {
      externalId: USER_EXTERNAL_ID,
      fullName: USER_FULL_NAME,
      idToken: USER_ID_TOKEN,
    };
    const request = {
      route: API_ENDPOINT.CREATE_USER,
      body: { fullName: USER_FULL_NAME, externalId: USER_EXTERNAL_ID },
    };
    createUser(user);
    expect(mockedHttpClient.post).toHaveBeenCalledWith(request);
  });
});
