import { render, screen } from "@testing-library/react";
import AppBar from "../AppBar";

test("renders avatar", () => {
  render(<AppBar />);
  const avatar = screen.getByTestId("avatar");
  expect(avatar).toBeInTheDocument();
});

test("renders logo", () => {
  render(<AppBar />);
  const logo = screen.getByTestId("logo");
  expect(logo).toBeInTheDocument();
});

test("see logout button when you click avatar", () => {
  render(<AppBar />);
  const avatar = screen.getByTestId("avatar");
  avatar.click();
  const logoutButton = screen.getByText("Logout");
  expect(logoutButton).toBeInTheDocument();
});
