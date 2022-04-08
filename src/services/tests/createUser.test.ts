import createUser from "../user/createUser";
import client from "../HttpClient";

jest.mock("../HttpClient");
const mockedHttpClient = client as jest.Mocked<typeof client>;

describe("create user should", () => {
  test("call http client post method", () => {
    const user = { externalId: "someID", fullName: "test name" };
    const request = {
      url: "https://teaminator-backend.azurewebsites.net/create-user",
      body: user,
    };
    createUser(user);
    expect(mockedHttpClient.post).toHaveBeenCalledWith(request);
  });
});
