import React from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Box,
  Menu,
  Container,
} from "@mui/material";
import { AppBar as Bar } from "@mui/material";
import LogoutButton from "../LogoutButton/LogoutButton";

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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            data-testid="logo"
          >
            LOGO
          </Typography>
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

export default AppBar;
