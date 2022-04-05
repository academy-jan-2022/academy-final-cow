import React from "react";
import "./App.css";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";

function HomePage() {
  const responseGoogle = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in res) {
      window.location.href = "/teams";
    }
  };

  return (
    <div>
      <header>
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
    </div>
  );
}

export default HomePage;
