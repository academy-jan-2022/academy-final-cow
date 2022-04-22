import React from "react";
import PageTemplate from "../shared/pages/TemplatePage/PageTemplate";
import {useNavigate} from "react-router-dom";
import {loginService} from "./loginService";
import logo from "../shared/images/teaminator_logo.png";
import {Settings} from "../shared/settings/Settings";
import "./homepage.css";
import GoogleLoginHandler from "./GoogleLoginHandler";

function HomePage() {
    const navigate = useNavigate();
    const handleLogin = (isLoggedIn: boolean) => {
        const route = getRedirectionRoute(isLoggedIn);
        navigate(route);
    }

    function getRedirectionRoute(isLoggedIn: boolean) {
        return isLoggedIn ? "/teams" : "/error"
    }

    return (
        <PageTemplate>
            <header>
                <img aria-label={"logo"} alt="Teaminator Logo" src={logo} data-testid="logo"/>
            </header>
            <GoogleLoginHandler handleLogin={handleLogin}/>
        </PageTemplate>
    );
}

export default HomePage;
