import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { storageHandler } from "../infrastructure/StorageHandler";
import createUser from "../domain/createUser";

export const loginService = async (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): Promise<boolean> => {
  const googleUserExists = "profileObj" in response;

  if (googleUserExists) {
    try {
      storageHandler.setJSONItem("tokenObject", response.tokenObj);
      storageHandler.setJSONItem("profile", response.profileObj);
      await createUser({
        externalId: response.profileObj.googleId,
        fullName: response.profileObj.name,
        idToken: response.tokenObj.id_token,
      });

      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};
