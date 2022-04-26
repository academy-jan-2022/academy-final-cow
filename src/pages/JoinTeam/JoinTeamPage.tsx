import React, { useEffect, useState } from "react";
import LoginButton from "../../components/LoginButton/LoginButton";
import { useNavigate } from "react-router-dom";
import { storageHandler } from "../../services/infrastructure/StorageHandler";

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
  return isLoggedIn ? (
    <>
      <h1>You're being added to a team...</h1>
    </>
  ) : (
    <LoginButton handleLoginRedirection={redirectTo} />
  );
}

export default JoinTeamPage;
