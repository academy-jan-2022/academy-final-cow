import { render, screen } from "@testing-library/react";
import TeamPage from "./TeamPage";

beforeEach(() => {
  render(<TeamPage />);
});

describe("Team page should", () => {
  test("render the team name as a title", () => {
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Team 1");
  });
});
