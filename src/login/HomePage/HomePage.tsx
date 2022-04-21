import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import PageTemplate from "../../shared/pages/TemplatePage/PageTemplate";
import { useNavigate } from "react-router-dom";
import { loginService } from "../loginService";
import logo from "../../shared/images/teaminator_logo.png";
import { Settings } from "../../shared/settings/Settings";
import "./homepage.css";

function HomePage() {
  const navigate = useNavigate();

    function getRedirectionRoute(isLoggedIn: boolean) {
        return isLoggedIn ? "/teams" : "/error"
    }

    const googleLoginHandler = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const isLoggedIn = await loginService(res);
    const route = getRedirectionRoute(isLoggedIn);
    navigate(route);
  };

  return (
    <PageTemplate>
      <header>
        <img aria-label={"logo"} alt="Teaminator Logo" src={logo} data-testid="logo" />
      </header>
      <GoogleLogin
        clientId={`${Settings.getGoogleClientId()}`}
        buttonText="Login"
        onSuccess={googleLoginHandler}
        onFailure={googleLoginHandler}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </PageTemplate>
  );
}

export default HomePage;
