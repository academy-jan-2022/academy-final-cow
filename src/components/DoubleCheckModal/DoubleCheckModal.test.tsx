import React from "react";
import DoubleCheckModal from "./DoubleCheckModal";
import { render, screen } from "@testing-library/react";

describe("double check modal should", () => {
  const handleButton = jest.fn();
  const handleClose = jest.fn();
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

  test("should have confirm button", () => {
    render(
      <DoubleCheckModal
        open={true}
        handleConfirmButton={handleButton}
        heading={"Are you sure bro?"}
      />
    );

    const confirmButton = screen.getByText("Yes");
    confirmButton.click();
    expect(confirmButton).toBeInTheDocument();
    expect(handleButton).toBeCalled();
  });

  test("should have cancel button", () => {
    render(
      <DoubleCheckModal
        open={true}
        handleConfirmButton={handleButton}
        handleClose={handleClose}
        heading={"Are you sure bro?"}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    cancelButton.click();
    expect(cancelButton).toBeInTheDocument();
  });
});
