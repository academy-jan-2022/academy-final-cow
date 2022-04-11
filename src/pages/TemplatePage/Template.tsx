import React from "react";
import Container from "@mui/material/Container";
import "./template.css";
import AppBar from "../../components/Appbar/AppBar";
import { storageHandler } from "../../services/infrastructure/StorageHandler";

const Template: React.FC = ({ children }) => {
  const userIsLoggedIn = () => {
    const tokenObject = storageHandler.getJSONItem("tokenObject");

    return !!tokenObject;
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

export default Template;
