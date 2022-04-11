import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import PageTemplate from "../TemplatePage/PageTemplate";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/application/loginService";
import logo from "../../images/teaminator_logo.png";

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
        <h1 aria-label={"title"}>Teaminator</h1>
        <img aria-label={"logo"} src={logo} />
      </header>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENTID}`}
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
