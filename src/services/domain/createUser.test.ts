import createUser from "./createUser";
import client from "../infrastructure/HttpClient";

jest.mock("../infrastructure/HttpClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("create user should", () => {
  test("call http client post method", () => {
    const user = {
      externalId: "someID",
      fullName: "test name",
      idToken: "weokwof",
    };
    const request = {
      url: process.env.REACT_APP_BASE_URL + "/login",
      body: { fullName: "test name", externalId: "someID" },
      headers: { token: "weokwof" },
    };
    createUser(user);
    expect(mockedHttpClient.post).toHaveBeenCalledWith(request);
  });
});
