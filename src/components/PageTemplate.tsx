import React from "react";
import Container from "@mui/material/Container";
import "./styles/template.css";

const Template: React.FC = ({ children }) => {
  return (
    <Container maxWidth="sm">
      {" "}
      <div className="centered-container">{children}</div>
    </Container>
  );
};

export default Template;
