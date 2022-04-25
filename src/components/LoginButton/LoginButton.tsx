import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {Settings} from "../../services/infrastructure/Settings";
import React from "react";
import {loginService} from "../../services/application/loginService";
import {useNavigate} from "react-router-dom";

function LoginButton () {

    const navigate = useNavigate();

    const googleLoginHandler = async (
        res: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        const route = await loginService(res);
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