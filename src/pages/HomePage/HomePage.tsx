import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import PageTemplate from "../TemplatePage/PageTemplate";
import { useNavigate } from "react-router-dom";
import logo from "../../images/teaminator_logo.png";
import "./homepage.css";
import LoginButton from "../../components/LoginButton/LoginButton";

function HomePage() {
  const navigate = useNavigate();

  const redirectTo = (isSuccessful: boolean) => {
      if (isSuccessful) {
          navigate("/teams");
          return
      }
      navigate("/error");
  }

  return (
    <PageTemplate>
      <header>
        <img
          aria-label={"logo"}
          alt="Teaminator Logo"
          src={logo}
          data-testid="logo"
        />
      </header>
      <LoginButton handleLoginRedirection={redirectTo}
      />
    </PageTemplate>
  );
}

export default HomePage;
