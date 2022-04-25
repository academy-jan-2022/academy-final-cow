import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import JoinTeamPage from "./JoinTeamPage";
import * as loginService from "../../services/application/loginService";

const LOGIN_BUTTON_TEXT = "Login";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../services/application/loginService");
const mockedLoginService = loginService as jest.Mocked<typeof loginService>;

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


describe("join teams page should", () => {
    beforeEach( () => {
        render(
            <BrowserRouter>
                <JoinTeamPage />
            </BrowserRouter>
        );
    })

    test("render log in button", ()=> {
        const loginButton = screen.getByText(LOGIN_BUTTON_TEXT);
        expect(loginButton).toBeVisible();
    });

    test("redirects to error page if login is unsuccessful", async () => {
        mockedLoginService.default.mockResolvedValue(false);

        const loginButton = screen.getByText(LOGIN_BUTTON_TEXT);
        loginButton.click();
        await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith("/error"));
    })


})