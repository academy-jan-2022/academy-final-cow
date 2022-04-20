import React from "react";
import Container from "@mui/material/Container";
import "./template.css";
import AppBar from "../../components/Appbar/AppBar";
import { storageHandler } from "../../services/infrastructure/StorageHandler";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";

const PageTemplate: React.FC = ({ children }) => {
  const userIsLoggedIn = () => {
    const tokenObject = storageHandler.getJSONItem("tokenObject");

    return !!tokenObject;
  };

  const themeOptions: ThemeOptions = {
    palette: {
      primary: {
        main: "#226894"
      },
      secondary: {
        main: "#E0AC61",
        dark: "#e8a445",
        light: "#ffdfaf"
      },
      background: {
        paper: "rgba(96,175,224,0.43)"
      }
    }
  };

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      {userIsLoggedIn() && <AppBar />}
      <Container maxWidth="xl">
        <div className="centered-container">
          {children}
        </div>
      </Container>l
    </ThemeProvider>
  );
};

export default PageTemplate;
