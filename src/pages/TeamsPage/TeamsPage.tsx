import {Button} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import PageTemplate from "../TemplatePage/PageTemplate";
import PageHeading from "../../components/PageHeading/PageHeading";

const TeamsPage = () => {
    const navigate = useNavigate();

    return (
        <PageTemplate>
            <PageHeading aria-label="title">Teams</PageHeading>
            <Button
                variant="outlined"
                className="create-team-btn"
                onClick={() => navigate("/create-team")}
            >
                Create New Team
            </Button>
        </PageTemplate>
    );
};

export default TeamsPage;