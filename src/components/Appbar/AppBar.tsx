import React from "react";
import {
  AppBar as Bar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Tooltip
} from "@mui/material";
import LogoutButton from "../LogoutButton/LogoutButton";
import logo from "../../images/teaminator_logo.png";

const AppBar = () => {
  const [anchorElUser, setAnchorElUser] =
    React.useState<HTMLAnchorElement | null>();

  const handleOpenUserMenu = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Bar data-testid="app-bar" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <img
            className="app-bar-logo"
            src={logo}
            alt="logo"
            data-testid="logo"
          />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                data-testid="avatar"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                href=""
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
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

export default AppBar;