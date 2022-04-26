import React, { useEffect, useState } from "react";
import LoginButton from "../../components/LoginButton/LoginButton";
import { useNavigate, useParams } from "react-router-dom";
import { storageHandler } from "../../services/infrastructure/StorageHandler";
import PageTemplate from "../TemplatePage/PageTemplate";
import teamService from "../../services/team/teamService";

function JoinTeamPage() {
  const navigate = useNavigate();
  const { joinTokenId } = useParams();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenObject = storageHandler.getJSONItem("tokenObject");
    if (tokenObject) {
      setIsLoggedIn(true);
      teamService
        .addMember(joinTokenId)
        .then((teamId) => {
          setIsLoading(false);
          return teamId;
        })
        .then((teamId) => navigate(`/team/${teamId}`));
    } else {
      setIsLoading(false);
    }
  }, []);

  const redirectTo = (isSuccessful: boolean) => {
    if (!isSuccessful) {
      navigate("/error");
    }
  };
  return (
    <PageTemplate isLoading={isLoading}>
      {isLoggedIn ? (
        <></>
      ) : (
        <>
          <h1>Please, log in so we can add you to a team</h1>
          <LoginButton handleLoginRedirection={redirectTo} />
        </>
      )}
    </PageTemplate>
  );
}

export default JoinTeamPage;
