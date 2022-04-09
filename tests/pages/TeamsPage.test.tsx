import { render, screen } from "@testing-library/react";

import TeamsPage from "../../src/pages/TeamsPage";

test("renders the heading", () => {
  render(<TeamsPage />);
  const title = screen.getByRole("heading", { name: "title" });
  expect(title).toBeInTheDocument();
});
