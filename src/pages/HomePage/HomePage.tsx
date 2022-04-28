import React from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import { useNavigate } from "react-router-dom";
import logo from "../../images/teaminator_logo.png";
import "./homepage.css";
import LoginButton from "../../components/LoginButton/LoginButton";
import { PageRoutes } from "../pageRoutes";

function HomePage() {
  const navigate = useNavigate();

  const redirectTo = (isSuccessful: boolean) => {
    if (isSuccessful) {
      navigate(PageRoutes.TEAMS);
      return;
    }
    navigate(PageRoutes.ERROR);
  };

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
      <LoginButton onLogin={redirectTo} />
    </PageTemplate>
  );
}

export default HomePage;
