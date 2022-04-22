import React from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import sadcowboy from "../../images/sadcowboy.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./error.css";
import PageHeading from "../../components/PageHeading/PageHeading";

export enum ERRORS {
  PAGE_NOT_FOUND = "Page not found",
  SOMETHING_WENT_WRONG = "Something went wrong",
}

const ErrorPage = ({ error }: { error: ERRORS }) => {
  const navigate = useNavigate();

  return (
    <PageTemplate>
      <PageHeading aria-label="title">Error</PageHeading>
      <img className="sad-cowboy" src={sadcowboy} alt="sad cowboy" />
      <p>{error}</p>
      <Button variant="outlined" onClick={() => navigate("/")}>
        Return to homepage
      </Button>
    </PageTemplate>
  );
};

export default ErrorPage;
