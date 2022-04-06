import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import Template from "../components/PageTemplate";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const googleLoginHandler = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in res) {
      navigate("/teams");
    } else {
      navigate("/error");
    }
  };

  return (
    <Template>
      <header>
        <h1 aria-label={"title"}>Teaminator</h1>
        <img
          aria-label={"logo"}
          src="https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Cowboy_emoji_large.png"
        />
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

export default HomePage;
