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
