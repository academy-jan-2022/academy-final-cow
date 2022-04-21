import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import PageTemplate from "../TemplatePage/PageTemplate";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/application/loginService";
import logo from "../../images/teaminator_logo.png";
import { Settings } from "../../services/infrastructure/Settings";
import "./homepage.css";

function HomePage() {
  const navigate = useNavigate();

  const googleLoginHandler = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const route = await loginService(res);
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
