import React from "react";
import Container from "@mui/material/Container";
import "./styles/template.css";
import AppBar from "./AppBar";
import { storageHandler } from "../services/StorageHandler";

const Template: React.FC = ({ children }) => {
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

export default Template;
