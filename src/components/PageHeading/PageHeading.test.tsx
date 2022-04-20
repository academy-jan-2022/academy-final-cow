import React from "react";
import { render, screen } from "@testing-library/react";
import PageHeading from "./PageHeading";

describe("render heading", () => {
  test("renders its children", () => {
    render(<PageHeading>it renders</PageHeading>);

    let heading = screen.getByText("it renders");
    expect(heading).toBeInTheDocument();
  });
});