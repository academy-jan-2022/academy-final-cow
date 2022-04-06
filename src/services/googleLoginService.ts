import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

export const googleLoginService = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): string => {
  return "profileObj" in response ? "/teams" : "/error";
};
