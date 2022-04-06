import { loginService } from "../loginService";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

describe("googleLoginServiceShould", () => {
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
