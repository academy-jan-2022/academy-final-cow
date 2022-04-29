import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import ActivityModal from "./ActivityModal";
import renderWithMemoryRouter from "../../testUtils/renderWithMemoryRouter";

describe("activity modal should", () => {
  let activityModal = (
    <ActivityModal
      handleClose={jest.fn}
      open={true}
      fetchedMembers={[
        { id: "1", fullName: "daniel" },
        { id: "2", fullName: "juan" },
        { id: "4", fullName: "brian" },
      ]}
      teamId={"1"}
      getTeam={jest.fn}
      toggleLoading={jest.fn}
    />
  );

  test("disable button on less than 3 members", async () => {
    renderWithMemoryRouter(activityModal, {});

    const allCheckboxes = screen.getAllByTestId("user-checkbox");

    allCheckboxes[0].click();

    const submitButton = screen.getByTestId("activity-submit-button");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);

    await waitFor(() => {
      const tooltip = screen.getByText(
        "You need at least 3 team members to create an activity"
      );

      expect(tooltip).toBeInTheDocument();
    });
  });

  test("not show tooltip on more than 3 members", async () => {
    renderWithMemoryRouter(activityModal, {});

    const submitButton = screen.getByTestId("activity-submit-button");
    fireEvent.mouseOver(submitButton);

    const tooltip = screen.queryByText(
      "You need at least 3 team members to create an activity"
    );

    expect(tooltip).not.toBeInTheDocument();
  });
});
