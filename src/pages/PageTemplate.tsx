import React from "react";
import Container from "@mui/material/Container";
import "./template.css";
import AppBar from "../components/AppBar";
import { storageHandler } from "../services/infrastructure/StorageHandler";

const PageTemplate: React.FC = ({ children }) => {
  const userIsLoggedIn = () => {
    const tokenObject = storageHandler.getJSONItem("tokenObject");
    return tokenObject ? true : false;
  };

  return (
    <>
      {userIsLoggedIn() && <AppBar />}
      <Container maxWidth="xl">
        <div className="centered-container">{children}</div>
      </Container>
    </>
  );
};

export default PageTemplate;
