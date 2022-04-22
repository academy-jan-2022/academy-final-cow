import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { storageHandler } from "../shared/infrastructure/StorageHandler";
import createUser from "../user/createUser";

type tokenObject = {
  externalId: string;
  provider: string;
  fullName: string;
  idToken: string;
};

export const loginService = async (
  tokenObject: tokenObject
): Promise<boolean> => {
  try {
    storageHandler.setJSONItem("tokenObject", tokenObject);
    await createUser({
      externalId: tokenObject.externalId,
      fullName: tokenObject.fullName,
      idToken: tokenObject.idToken,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const handleGoogleAuthResponse = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): tokenObject | null => {
  const googleUserExists = "profileObj" in response;
  if (googleUserExists) {
    storageHandler.setJSONItem("profile", response.profileObj);
    return {
      externalId: response.profileObj.googleId,
      provider: "google",
      fullName: response.profileObj.name,
      idToken: response.tokenId,
    };
  }
  return null;
};
