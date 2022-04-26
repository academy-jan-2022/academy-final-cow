import React, { useEffect, useState } from "react";
import LoginButton from "../../components/LoginButton/LoginButton";
import { useNavigate } from "react-router-dom";
import { storageHandler } from "../../services/infrastructure/StorageHandler";
import PageTemplate from "../TemplatePage/PageTemplate";

function JoinTeamPage() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenObject = storageHandler.getJSONItem("tokenObject");
    if (tokenObject) {
      setIsLoggedIn(true);
    }
  }, []);

  const redirectTo = (isSuccessful: boolean) => {
    if (!isSuccessful) {
      navigate("/error");
    }
  };
  return (<PageTemplate>
    isLoggedIn ? (
    <></>
    ) : (
    <>
      <h1>Please, log in so we can add you to a team</h1>
      <LoginButton handleLoginRedirection={redirectTo} />
    </>
    );
  </PageTemplate>)
}

export default JoinTeamPage;
