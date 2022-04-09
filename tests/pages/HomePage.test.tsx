import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../../src/pages/HomePage";
import { loginService } from "../../src/services/application/loginService";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("../../services/loginService");
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

test("renders app name", () => {
  const title = screen.getByRole("heading", { name: "title" });
  expect(title).toBeInTheDocument();
});

test("renders log in button", () => {
  const button = screen.getByText("Login");
  expect(button).toBeInTheDocument();
});

test("calls login service after clicking login button", () => {
  const button = screen.getByText("Login");
  button.click();
  expect(loginService).toHaveBeenCalled();
});

test("navigates to the provided route after login", async () => {
  const button = screen.getByText("Login");
  button.click();
  await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalled());
});
