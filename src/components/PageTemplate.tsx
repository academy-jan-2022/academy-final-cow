import React from "react";
import Container from "@mui/material/Container";
import "./styles/template.css";
import AppBar from "./AppBar";

const Template: React.FC = ({ children }) => {
  return (
    <Container maxWidth="sm">
      <AppBar />
      <div className="centered-container">{children}</div>
    </Container>
  );
};

export default Template;
