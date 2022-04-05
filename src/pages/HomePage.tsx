import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import Template from "./PageTemplate";

function HomePage() {
  const responseGoogle = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in res) {
      window.location.href = "/teams";
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
        clientId="671208548253-hrd5a4nvrk4ovsscfskprsbodn7ate8k.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </Template>
  );
}

export default HomePage;
