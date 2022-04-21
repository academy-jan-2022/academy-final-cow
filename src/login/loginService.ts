import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { storageHandler } from "../shared/storagehandler/StorageHandler";
import createUser from "../user/createUser";

export const loginService = async (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): Promise<string> => {
  const googleUserExists = "profileObj" in response;

  if (googleUserExists) {
    try {
      storageHandler.setJSONItem("tokenObject", response.tokenObj);
      storageHandler.setJSONItem("profile", response.profileObj);
      await createUser({
        externalId: response.profileObj.googleId,
        fullName: response.profileObj.name,
        idToken: response.tokenObj.id_token
      });

      return "/teams";
    } catch (e) {
      return "/error";
    }
  }
  return "/error";
};