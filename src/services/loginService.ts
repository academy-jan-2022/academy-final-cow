import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "./user/createUser";

export const loginService = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): string => {
  if ("profileObj" in response) {
    createUser({
      externalId: "someID",
      fullName: "test name",
    });

    return "/teams";
  }
  return "/error";
};
