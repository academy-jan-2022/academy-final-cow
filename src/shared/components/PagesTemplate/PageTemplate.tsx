import React, {ReactChild, ReactChildren, useEffect} from "react";
import Container from "@mui/material/Container";
import "./template.css";
import AppBar from "../Appbar/AppBar";
import {storageHandler} from "../../infrastructure/StorageHandler";
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material";
import {useNavigate} from "react-router-dom";


const PageTemplate = ({children,
                                isProtected=true }: {children: ReactChildren[] | ReactChild[] | ReactChildren | ReactChild, isProtected?: boolean}) => {
    const navigate = useNavigate();

    const userIsLoggedIn = () => {
        const tokenObject = storageHandler.getJSONItem("tokenObject");
        return !!tokenObject;
    };

    useEffect(() => {
        if (!userIsLoggedIn() && isProtected) {
            navigate("/");
        }
    }, []);


    const themeOptions: ThemeOptions = {
        palette: {
            primary: {
                main: "#226894",
            },
            secondary: {
                main: "#E0AC61",
                dark: "#e8a445",
                light: "#ffdfaf",
            },
            background: {
                paper: "#60afe06e"
            },
        },
    };

    const theme = createTheme(themeOptions);

    return (
        <ThemeProvider theme={theme}>
            {userIsLoggedIn() && <AppBar/>}
            <Container maxWidth="xl">
                <div className="centered-container">
                    {children}
                </div>
            </Container>l
        </ThemeProvider>
    );
};

export default PageTemplate;
