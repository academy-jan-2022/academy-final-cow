import React from "react";
import { Settings } from "../shared/settings/Settings";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { loginService, handleGoogleAuthResponse } from "./loginService";

const GoogleLoginHandler = ({ handleLogin }: { handleLogin: any }) => {
  const googleLoginHandler = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const tokenObject = handleGoogleAuthResponse(res);
    if (tokenObject) {
      const isLoggedIn = await loginService(tokenObject);
      handleLogin(isLoggedIn);
    }
  };

  return (
    <GoogleLogin
      clientId={`${Settings.getGoogleClientId()}`}
      buttonText="Login"
      onSuccess={googleLoginHandler}
      onFailure={googleLoginHandler}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};

export default GoogleLoginHandler;
