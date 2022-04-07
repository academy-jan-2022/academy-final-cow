import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";

const mockedUsedNavigate = jest.fn();

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

test("renders logo", () => {
  render(<HomePage />);
  const logo = screen.getByRole("img", { name: "logo" });
  expect(logo).toBeInTheDocument();
});

test("renders app name", () => {
  render(<HomePage />);
  const title = screen.getByRole("heading", { name: "title" });
  expect(title).toBeInTheDocument();
});

test("renders log in button", () => {
  render(<HomePage />);
  const button = screen.getByText("Login");
  expect(button).toBeInTheDocument();
});

test("navigates to the provided route after login", () => {
  render(<HomePage />);
  const button = screen.getByText("Login");
  button.click();
  expect(mockedUsedNavigate).toHaveBeenCalled();
});
