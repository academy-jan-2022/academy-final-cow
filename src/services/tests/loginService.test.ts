import { loginService } from "../loginService";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "../user/createUser";

jest.mock("../user/createUser");
const mockedCreateUser = createUser as jest.Mocked<typeof createUser>;

describe("googleLoginServiceShould", () => {
  test("should call createUser service when google login is successful", () => {
    const successfulResponse = {
      profileObj: {
        name: "testProfile",
      },
    } as GoogleLoginResponse;

    loginService(successfulResponse);
    expect(mockedCreateUser).toHaveBeenCalledWith({
      externalId: "someID",
      fullName: "test name",
    });
  });

  test("should not call createUser service when google login is unsuccessful", () => {
    const unSuccessfulResponse = {} as GoogleLoginResponseOffline;

    loginService(unSuccessfulResponse);
    expect(mockedCreateUser).not.toHaveBeenCalled();
  });

  test("return '/teams' when login is successful", () => {
    const successfulResponse = {
      profileObj: {
        name: "testProfile",
      },
    } as GoogleLoginResponse;

    const returnValue = loginService(successfulResponse);
    expect(returnValue).toEqual("/teams");
  });

  test("return '/error' when login is unsuccessful", () => {
    const unSuccessfulResponse = {} as GoogleLoginResponseOffline;

    const returnValue = loginService(unSuccessfulResponse);
    expect(returnValue).toEqual("/error");
  });
});
