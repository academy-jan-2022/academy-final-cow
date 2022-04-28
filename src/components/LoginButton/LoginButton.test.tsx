import { screen, waitFor } from "@testing-library/react";
import loginService from "../../services/application/loginService";

import React from "react";
import LoginButton from "./LoginButton";
import renderWithMemoryRouter from "../../testUtils/renderWithMemoryRouter";

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
  let button: HTMLElement;

  beforeEach(() => {
    renderWithMemoryRouter(
      <LoginButton onLogin={handleLoginRedirection} />,
      {}
    );

    button = screen.getByText(LOGIN_BUTTON_TEXT);
  });

  test("renders log in button", () => {
    expect(button).toBeInTheDocument();
  });

  test("calls login service after clicking login button", async () => {
    button.click();
    expect(loginService).toHaveBeenCalled();
  });

  test("calls handleRedirectionFunction after login service", async () => {
    button.click();
    await waitFor(() => expect(handleLoginRedirection).toHaveBeenCalled());
  });
});
