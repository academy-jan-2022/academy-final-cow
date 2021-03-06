import React, { useEffect, useState } from "react";
import {
  AppBar as Bar,
  Box,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
} from "@mui/material";
import LogoutButton from "../LogoutButton/LogoutButton";
import logo from "../../images/teaminator_logo_white.png";
import { storageHandler } from "../../services/infrastructure/StorageHandler";
import "./appbar.css";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../pages/pageRoutes";

const AppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<HTMLAnchorElement | null>();

  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  const handleOpenUserMenu = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const profile: UserProfile | null = storageHandler.getJSONItem("profile");
    if (profile) {
      setProfileImage(profile.imageUrl);
    }
  }, []);

  return (
    <Bar data-testid="app-bar" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <img
            className="app-bar-logo"
            src={logo}
            alt="logo"
            data-testid="logo"
            onClick={() => navigate(PageRoutes.TEAMS)}
          />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open menu">
              <IconButton
                data-testid="avatar"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                href=""
              >
                <img
                  alt="Profile"
                  className="avatar"
                  src={profileImage}
                  referrerPolicy="no-referrer"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <LogoutButton />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </Bar>
  );
};

type UserProfile = {
  imageUrl: string;
};

export default AppBar;
