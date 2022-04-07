import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "./user/createUser";

export const loginService = async (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): Promise<string> => {
  if ("profileObj" in response) {
    await createUser({
      externalId: "someID",
      fullName: "test name",
    });

    return "/teams";
  }
  return "/error";
};
