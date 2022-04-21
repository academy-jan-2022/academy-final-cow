import React, {useState, useEffect} from "react";
import {
    AppBar as Bar,
    Box,
    Container,
    IconButton,
    Menu,
    Toolbar,
    Tooltip,
} from "@mui/material";
import LogoutButton from "../../../login/LogoutButton/LogoutButton";
import logo from "../../images/teaminator_logo_white.png";
import {storageHandler} from "../../storagehandler/StorageHandler";
import "./appbar.css"

const AppBar = () => {
    const [anchorElUser, setAnchorElUser] = useState<HTMLAnchorElement | null>();

    const [profileImage, setProfileImage] = useState('');

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
    }, [])

    return (
        <Bar data-testid="app-bar" position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
                    <img
                        className="app-bar-logo"
                        src={logo}
                        alt="logo"
                        data-testid="logo"
                    />
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open menu">
                            <IconButton
                                data-testid="avatar"
                                onClick={handleOpenUserMenu}
                                sx={{p: 0}}
                                href=""
                            >
                                <img alt="Profile" className="avatar" src={profileImage}
                                     referrerPolicy="no-referrer"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: "45px"}}
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
                            <LogoutButton/>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </Bar>
    );
};

type UserProfile = {
    imageUrl: string
}

export default AppBar;