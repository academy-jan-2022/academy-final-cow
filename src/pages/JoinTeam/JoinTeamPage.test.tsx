import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import JoinTeamPage from "./JoinTeamPage";

const LOGIN_BUTTON_TEXT = "Login";


describe("join teams page should", () => {
    test("render log in button", ()=> {

        render(
            <BrowserRouter>
                <JoinTeamPage />
            </BrowserRouter>
        );

        const loginButton = screen.getByText(LOGIN_BUTTON_TEXT);
        expect(loginButton).toBeVisible();
    });


})