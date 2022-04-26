import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import JoinTeamPage from "./JoinTeamPage";
import * as loginService from "../../services/application/loginService";
import { storageHandler } from "../../services/infrastructure/StorageHandler";

const LOGIN_BUTTON_TEXT = "Login";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));

jest.mock("../../services/application/loginService");
const mockedLoginService = loginService as jest.Mocked<typeof loginService>;

const mockedGetJSONItem = jest.fn();

jest.mock("../../services/infrastructure/StorageHandler");
const mockedStorageHandler = storageHandler as jest.Mocked<typeof storageHandler>;

jest.mock("react-google-login", () => {
    return ({
                onSuccess,
                buttonText
            }: {
        onSuccess: any;
        buttonText: string;
    }) => {
        const handleClick = () => {
            onSuccess({
                profileObj: { name: "test name" }
            });
        };

        return <button onClick={handleClick}>{buttonText}</button>;
    };
});

describe("join teams page should", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("when user is not logged in", () => {
        beforeEach(() => {
            mockedStorageHandler.getJSONItem = jest.fn().mockReturnValue(null);

            render(
              <BrowserRouter>
                  <JoinTeamPage />
              </BrowserRouter>
            );
        });

        test("render log in button", () => {
            const loginButton = screen.getByText(LOGIN_BUTTON_TEXT);
            expect(loginButton).toBeVisible();
        });

        test("redirects to error page if login is unsuccessful", async () => {
            mockedLoginService.default.mockResolvedValue(false);

            const loginButton = screen.getByText(LOGIN_BUTTON_TEXT);
            loginButton.click();
            await waitFor(() =>
              expect(mockedUsedNavigate).toHaveBeenCalledWith("/error")
            );
        });
    });

    describe("when user is logged in", () => {
        beforeEach(() => {
            const TOKEN_OBJECT = { token: "token" };
            mockedStorageHandler.getJSONItem = jest
              .fn()
              .mockReturnValue(TOKEN_OBJECT);

            render(
              <BrowserRouter>
                  <JoinTeamPage />
              </BrowserRouter>
            );
        });

        test("render title", () => {
            const title = screen.getByText("You're being added to a team...");
            expect(title).toBeInTheDocument();
        });


        test("not show the login button if the user is logged in", async () => {
            const loginButton = screen.queryByText(LOGIN_BUTTON_TEXT);
            expect(loginButton).not.toBeInTheDocument();
        });
    });
});
