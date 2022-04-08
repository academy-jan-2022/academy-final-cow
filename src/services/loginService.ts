import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { storageHandler } from "./StorageHandler";
import createUser from "./user/createUser";

export const loginService = async (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): Promise<string> => {
  const googleUserExists = "profileObj" in response;

  if (googleUserExists) {
    try {
      storageHandler.setJSONItem("tokenObject",response.tokenObj);
      await createUser({
        externalId: "someID",
        fullName: "test name",
        idToken: response.tokenObj.id_token
      })

      return "/teams";
    } catch (e) {
      return "/error";
    }
  }
  return "/error";
};
