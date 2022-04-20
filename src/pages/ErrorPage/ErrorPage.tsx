import React from "react";
import PageTemplate from "../TemplatePage/PageTemplate";
import sadcowboy from "../../images/sadcowboy.png"
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export enum ERRORS {
    PAGE_NOT_FOUND = "Page not found",
    SERVER_ERROR = "Something went wrong",
    UNAUTHORISED = "Unauthorised",
}

const ErrorPage = ({error}: { error: ERRORS }) => {
    const navigate = useNavigate();

    return (
        <PageTemplate>
            <h1 aria-label="title">Error</h1>
            <img src={sadcowboy} alt="sad cowboy"/>
            <p>{error}</p>
            <Button variant="outlined" onClick={() => navigate("/")}>Return to homepage</Button>
        </PageTemplate>
    );
};

export default ErrorPage;
