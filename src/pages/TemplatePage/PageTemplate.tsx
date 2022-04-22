import React, { ReactChild, ReactChildren } from "react";
import Container from "@mui/material/Container";
import "./template.css";
import AppBar from "../../components/Appbar/AppBar";
import { storageHandler } from "../../services/infrastructure/StorageHandler";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

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
        paper: "#60afe06e",
      },
    },
  };

  const theme = createTheme(themeOptions);

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
