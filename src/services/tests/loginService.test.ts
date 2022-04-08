import { loginService } from "../loginService";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "../user/createUser";
import { storageHandler } from "../StorageHandler";

jest.mock("../user/createUser");
const mockedCreateUser = createUser as jest.Mocked<typeof createUser>;

jest.mock("../StorageHandler");

describe("googleLoginServiceShould", () => {
  const successfulResponse = {
    profileObj: {
      name: "testProfile",
    },
    tokenObj: {id_token: "token"}
  } as GoogleLoginResponse;

  const unSuccessfulResponse = {} as GoogleLoginResponseOffline;
  test("should call createUser service when google login is successful", async () => {
    await loginService(successfulResponse);
    expect(mockedCreateUser).toHaveBeenCalledWith({
      externalId: "someID",
      fullName: "test name",
      idToken: "token"
    });
  });

  test("should not call createUser service when google login is unsuccessful", async () => {
    await loginService(unSuccessfulResponse);
    expect(mockedCreateUser).not.toHaveBeenCalled();
  });

  test("return '/teams' when login is successful", async () => {
    const returnValue = await loginService(successfulResponse);
    expect(returnValue).toEqual("/teams");
  });

  test("return '/error' when login is unsuccessful", async () => {
    const returnValue = await loginService(unSuccessfulResponse);
    expect(returnValue).toEqual("/error");
  });

  test("should set token object using storage handler", async () => {
    await loginService(successfulResponse);
    expect(storageHandler.setJSONItem).toHaveBeenCalled();
  })
});


