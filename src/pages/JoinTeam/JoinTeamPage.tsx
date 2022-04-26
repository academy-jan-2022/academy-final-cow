import React, { useEffect, useState } from "react";
import LoginButton from "../../components/LoginButton/LoginButton";
import { useNavigate, useParams } from "react-router-dom";
import { storageHandler } from "../../services/infrastructure/StorageHandler";
import PageTemplate from "../TemplatePage/PageTemplate";
import teamService from "../../services/team/teamService";
import {AxiosError} from "axios";

function JoinTeamPage() {
  const navigate = useNavigate();
  const { joinTokenId } = useParams();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  function handleError(error: AxiosError) {
    setIsLoading(false);
    if (error.code === "500") {
      navigate("/error");
      return
    }
    setErrorMessage(error.message);
  }

  function addMemberWhenLoggedIn() {
    const tokenObject = storageHandler.getJSONItem("tokenObject");
    if (tokenObject) {
      setIsLoggedIn(true);

      teamService
        .addMember(joinTokenId)
        .then((teamId) => {
          setIsLoading(false);
          return teamId;
        })
        .then((teamId) => navigate(`/team/${teamId}`))
        .catch(handleError);
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    addMemberWhenLoggedIn();
  }, []);

  const handleLogin = (isSuccessful: boolean) => {
    if (!isSuccessful) {
      navigate("/error");
      return
    }

    addMemberWhenLoggedIn();
  };
  
  return (
    <PageTemplate isLoading={isLoading}>
      {isLoggedIn ? (
        <>
        {errorMessage && <h5>{errorMessage}</h5>}
        </>
      ) : (
        <>
          <h1>Please, log in so we can add you to a team</h1>
          <LoginButton onLogin={handleLogin} />
        </>
      )}
    </PageTemplate>
  );
}

export default JoinTeamPage;
