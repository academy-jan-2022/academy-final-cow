import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "./user/createUser";

export const loginService = async (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): Promise<string> => {
  if ("profileObj" in response) {
    try {
      await createUser({
        externalId: "someID",
        fullName: "test name",
      });

      return "/teams";
    } catch (e) {
      return "/error";
    }
  }
  return "/error";
};
