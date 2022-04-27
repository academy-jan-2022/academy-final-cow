import { MenuItem, Typography } from "@mui/material";
import React from "react";
import { useGoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { storageHandler } from "../../services/infrastructure/StorageHandler";
import { PageRoutes } from "../../pages/pageRoutes";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    storageHandler.removeItem("tokenObject");
    navigate(PageRoutes.HOME);
  };

  const handleFailure = () => {
    navigate(PageRoutes.ERROR);
  };

  const { signOut } = useGoogleLogout({
    clientId:
      "671208548253-hrd5a4nvrk4ovsscfskprsbodn7ate8k.apps.googleusercontent.com",
    onLogoutSuccess: handleSuccess,
    onFailure: handleFailure,
  });

  return (
    <MenuItem data-testid="logout" onClick={signOut}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  );
};

export default LogoutButton;
