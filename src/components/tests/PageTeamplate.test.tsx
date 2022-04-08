import { render, screen } from "@testing-library/react";

import PageTemplate from "../PageTemplate";

test("renders its children", () => {
  render(
    <PageTemplate>
      <p>Child</p>
    </PageTemplate>
  );
  const childElement = screen.getByText("Child");
  expect(childElement).toBeInTheDocument();
});

test("render the app bar at the top of the screen if logged in", () => {
  render(
    <PageTemplate>
      <p>Child</p>
    </PageTemplate>
  );

  const appBar = screen.queryAllByTestId("app-bar");
  expect(appBar.length).toBe(1);
});
