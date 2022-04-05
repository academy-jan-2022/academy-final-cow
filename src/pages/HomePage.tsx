import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";

function HomePage() {
  let navigate = useNavigate();
  const responseGoogle = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in res) {
      navigate("/teams");
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId="671208548253-hrd5a4nvrk4ovsscfskprsbodn7ate8k.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default HomePage;
