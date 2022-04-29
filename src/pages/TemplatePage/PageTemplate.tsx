import React, { ReactChild, ReactChildren, useEffect } from "react";
import Container from "@mui/material/Container";
import "./template.css";
import AppBar from "../../components/Appbar/AppBar";
import { storageHandler } from "../../services/infrastructure/StorageHandler";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useGoogleLogout } from "react-google-login";
import { Settings } from "../../services/infrastructure/Settings";
import { AuthResponse } from "../../services/infrastructure/ApiClient";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../pageRoutes";

interface PageTemplateProps {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  isLoading?: boolean;
}

const PageTemplate = ({ children, isLoading = false }: PageTemplateProps) => {
  const userIsLoggedIn = () => {
    const tokenObject = storageHandler.getJSONItem("tokenObject");
    return !!tokenObject;
  };

  const themeOptions: ThemeOptions = {
    palette: {
      primary: {
        main: "#226894",
      },
      secondary: {
        main: "#E0AC61",
        dark: "#e8a445",
        light: "#ffdfaf",
      },
      background: {
        paper: "lightblue",
      },
    },
  };

  const theme = createTheme(themeOptions);

  const navigate = useNavigate();
  const handleSuccess = () => {
    storageHandler.removeItem("tokenObject");
    navigate(PageRoutes.HOME);
  };

  const handleFailure = () => {
    navigate(PageRoutes.ERROR);
  };

  const { signOut } = useGoogleLogout({
    clientId: Settings.getGoogleClientId(),
    onLogoutSuccess: handleSuccess,
    onFailure: handleFailure,
  });

  const checkIdTokenIsValid = () => {
    if (userIsLoggedIn()) {
      const tokenObject: AuthResponse | null =
        storageHandler.getJSONItem("tokenObject");
      if (tokenObject) {
        const expiryDate = new Date(tokenObject.expires_at);
        if (expiryDate < new Date()) {
          signOut();
        }
      }
    }
  };

  useEffect(() => {
    checkIdTokenIsValid();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {userIsLoggedIn() && <AppBar />}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container maxWidth="xl">
          <div className="centered-container">{children}</div>
        </Container>
      )}
    </ThemeProvider>
  );
};

export default PageTemplate;
