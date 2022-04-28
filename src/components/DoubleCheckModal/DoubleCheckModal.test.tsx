import React from "react";
import DoubleCheckModal from "./DoubleCheckModal";
import { render, screen } from "@testing-library/react";

describe("double check modal should", () => {
  const handleButton = jest.fn();

  test("should have heading", () => {
    render(
      <DoubleCheckModal
        open={true}
        handleConfirmButton={handleButton}
        heading={"Are you sure bro?"}
      />
    );

    const heading = screen.getByText("Are you sure bro?");
    expect(heading).toBeInTheDocument();
  });
});
