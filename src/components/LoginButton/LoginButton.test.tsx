import {render, screen, waitFor} from "@testing-library/react";
import loginService from "../../services/application/loginService";
import {BrowserRouter} from "react-router-dom";

import React from "react";
import LoginButton from "./LoginButton";

const LOGIN_BUTTON_TEXT = "Login";

jest.mock("../../services/application/loginService");

jest.mock("react-google-login", () => {
    return ({
                onSuccess,
                buttonText,
            }: {
        onSuccess: any;
        buttonText: string;
    }) => {
        const handleClick = () => {
            onSuccess({
                profileObj: { name: "test name" },
            });
        };

        return <button onClick={handleClick}>{buttonText}</button>;
    };
});

const handleLoginRedirection = jest.fn();

describe("LoginButton should", () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <LoginButton onLogin={handleLoginRedirection} />
            </BrowserRouter>
        );
    });

    test("renders log in button", () => {
        const button = screen.getByText(LOGIN_BUTTON_TEXT);
        expect(button).toBeInTheDocument();
    });

    test("calls login service after clicking login button", async () => {
        const button = screen.getByText(LOGIN_BUTTON_TEXT);
        button.click();
        expect(loginService).toHaveBeenCalled();
    });

    test("calls handleRedirectionFunction after login service", async () => {
        const button = screen.getByText(LOGIN_BUTTON_TEXT);
        button.click();
        await waitFor(() => expect(handleLoginRedirection).toHaveBeenCalled());
    })

});