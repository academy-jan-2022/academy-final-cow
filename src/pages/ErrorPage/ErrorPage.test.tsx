import { render, screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";

describe("Error page should", () => {
  test("renders the heading", () => {
    render(<ErrorPage />);
    const title = screen.getByRole("heading", { name: "title" });
    expect(title).toBeInTheDocument();
  });
});
