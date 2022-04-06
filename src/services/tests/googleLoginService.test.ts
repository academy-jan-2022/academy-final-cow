import { googleLoginService } from "../googleLoginService";
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

    const returnValue = googleLoginService(successfulResponse);
    expect(returnValue).toEqual("/teams");
  });

  test("return '/error' when login is unsuccessful", () => {
    const unSuccessfulResponse = {} as GoogleLoginResponseOffline;

    const returnValue = googleLoginService(unSuccessfulResponse);
    expect(returnValue).toEqual("/error");
  });
});
