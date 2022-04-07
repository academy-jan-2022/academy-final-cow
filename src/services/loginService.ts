import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

export const loginService = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): string => {
  return "profileObj" in response ? "/teams" : "/error";
};
