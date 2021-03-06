import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {Settings} from "../../services/infrastructure/Settings";
import React from "react";
import loginService from "../../services/application/loginService";

function LoginButton ( {onLogin} : {onLogin : any}) {

    const googleLoginHandler = async (
        res: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        const isSuccessful = await loginService(res);
        onLogin(isSuccessful)
    };

    return (
        <GoogleLogin
        clientId={`${Settings.getGoogleClientId()}`}
        buttonText="Login"
        onSuccess={googleLoginHandler}
        onFailure={googleLoginHandler}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
    />)
}

export default LoginButton