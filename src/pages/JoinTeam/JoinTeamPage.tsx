
import React from "react";
import LoginButton from "../../components/LoginButton/LoginButton";
import {useNavigate} from "react-router-dom";

function JoinTeamPage () {
    const navigate = useNavigate()

    const redirectTo = (isSuccessful: boolean) => {
        if (!isSuccessful) {
            navigate("/error")
        }
    };
    return (
        <LoginButton handleLoginRedirection={redirectTo}   />)
}

export default JoinTeamPage;
