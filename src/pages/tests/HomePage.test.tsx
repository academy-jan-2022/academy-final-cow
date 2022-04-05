import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";

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
