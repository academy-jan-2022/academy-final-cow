import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../SecondPage";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/home page/i);
  expect(linkElement).toBeInTheDocument();
});
