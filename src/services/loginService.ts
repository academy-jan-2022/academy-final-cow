import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "./user/createUser";
import { ROUTES } from "../index";

export const loginService = async (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): Promise<ROUTES> => {
  const userExists = "profileObj" in response;

  if (userExists) {
    await createUser({
      externalId: "someID",
      fullName: "test name",
    });

    return ROUTES.teams;
  }
  return ROUTES.error;
};
