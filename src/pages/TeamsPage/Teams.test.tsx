import { render, screen } from "@testing-library/react";

import Teams from "./Teams";

describe("Teams page should", () => {
  test("renders the heading", () => {
    render(<Teams />);
    const title = screen.getByRole("heading", { name: "title" });
    expect(title).toBeInTheDocument();
  });
});
