import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "./user/createUser";

export const loginService = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): string => {
  createUser({
    externalId: "someID",
    fullName: "test name",
  })
  return "profileObj" in response ? "/teams" : "/error";
};
