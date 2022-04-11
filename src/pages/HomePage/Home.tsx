import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import Template from "../TemplatePage/Template";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/application/loginService";
import logo from "../../images/teaminator_logo.png";

function Home() {
  const navigate = useNavigate();

  const googleLoginHandler = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const route = await loginService(res);
    navigate(route);
  };

  return (
    <Template>
      <header>
        <img aria-label={"logo"} src={logo} data-testid="logo" />
      </header>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENTID}`}
        buttonText="Login"
        onSuccess={googleLoginHandler}
        onFailure={googleLoginHandler}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </Template>
  );
}

export default Home;
