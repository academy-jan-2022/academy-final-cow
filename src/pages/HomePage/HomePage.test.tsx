import React from "react";
import { screen, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import * as loginService from "../../services/application/loginService";
import renderWithMemoryRouter from "../../testUtils/renderWithMemoryRouter";
import { PageRoutes } from "../pageRoutes";

const mockedUsedNavigate = jest.fn();

jest.mock("../../services/application/loginService");
const mockedLoginService = loginService as jest.Mocked<typeof loginService>;

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
    renderWithMemoryRouter(<HomePage />, {});
  });

  test("renders logo", () => {
    const logo = screen.getByRole("img", { name: "logo" });
    expect(logo).toBeInTheDocument();
  });

  test("renders log in button", () => {
    const button = screen.getByText(LOGIN_BUTTON_TEXT);
    expect(button).toBeInTheDocument();
  });

  test("navigates to the provided route after successful login", async () => {
    mockedLoginService.default.mockResolvedValue(true);

    const button = screen.getByText(LOGIN_BUTTON_TEXT);
    button.click();
    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith(PageRoutes.TEAMS)
    );
  });

  test("navigates to the provided route after unsuccessful login", async () => {
    mockedLoginService.default.mockResolvedValue(false);

    const button = screen.getByText(LOGIN_BUTTON_TEXT);
    button.click();
    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith("/error")
    );
  });
});
