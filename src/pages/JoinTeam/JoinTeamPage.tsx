import GoogleLogin from "react-google-login";
import {Settings} from "../../services/infrastructure/Settings";
import React from "react";

function JoinTeamPage () {

    const googleLoginHandler = () => {};

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

export default JoinTeamPage;
