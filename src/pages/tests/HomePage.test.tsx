import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react-google-login", () => {
  const defaultMockSuccess = {
    tokenId: "tokenId",
    profileObj: { name: "test name" },
  };

  const GoogleLogin = ({
    onSuccess,
    buttonText,
  }: {
    onSuccess: any;
    buttonText: string;
  }) => {
    const handleClick = () => {
      onSuccess(defaultMockSuccess);
    };

    return <button onClick={handleClick}>{buttonText}</button>;
  };

  return GoogleLogin;
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

test("redirects to teams page on successful login", () => {
  render(<HomePage />);
  const button = screen.getByText("Login");
  button.click();
  expect(mockedUsedNavigate).toHaveBeenCalledWith("/teams");
});
