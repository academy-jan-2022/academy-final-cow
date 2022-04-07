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
