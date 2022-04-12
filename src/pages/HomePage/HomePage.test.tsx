import React from "react";
import {logDOM, render, screen, waitFor} from "@testing-library/react";
import HomePage from "./HomePage";
import { loginService } from "../../services/application/loginService";
import { BrowserRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("../../services/application/loginService");
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

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

const LOGIN_BUTTON_TEXT = "Login";

describe("HomePage test should", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  });

  test("renders logo", () => {
    const logo = screen.getByRole("img", { name: "logo" });
    expect(logo).toBeInTheDocument();
  });

  test("renders log in button", () => {
    const button = screen.getByText(LOGIN_BUTTON_TEXT);
    expect(button).toBeInTheDocument();
  });

  test("calls login service after clicking login button", () => {
    const button = screen.getByText(LOGIN_BUTTON_TEXT);
    button.click();
    expect(loginService).toHaveBeenCalled();
  });

  test("navigates to the provided route after login", async () => {
    const button = screen.getByText(LOGIN_BUTTON_TEXT);
    button.click();
    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalled());
  });
});
