import createUser from "../../../src/services/application/createUser";
import client from "../../../src/services/infrastructure/HttpClient";

jest.mock("../HttpClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("create user should", () => {
  test("call http client post method", () => {
    const user = {
      externalId: "someID",
      fullName: "test name",
      idToken: "weokwof",
    };
    const request = {
      url: "htts://teaminator-backend.azurewebsites.net/login",
      body: { fullName: "test name", externalId: "someID" },
      headers: { token: "weokwof" },
    };
    createUser(user);
    expect(mockedHttpClient.post).toHaveBeenCalledWith(request);
  });
});
