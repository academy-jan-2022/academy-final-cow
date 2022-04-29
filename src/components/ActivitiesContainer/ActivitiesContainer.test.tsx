import React from "react";
import ActivitiesContainer from "./ActivitiesContainer";
import { render, screen } from "@testing-library/react";

describe("activites container should", () => {
  test("show the activities in reverse order", () => {
    const activityResponse = [
      {
        name: "First Activity",
        groups: [
          [{ name: "Bob" }, { name: "Marina" }],
          [{ name: "Angie" }, { name: "Marco" }],
        ],
      },
      {
        name: "Second Activity",
        groups: [
          [{ name: "Angie" }, { name: "Marina" }],
          [{ name: "Bob" }, { name: "Marco" }],
        ],
      },
      {
        name: "Third Activity",
        groups: [
          [{ name: "Angie" }, { name: "Marina" }],
          [{ name: "Bob" }, { name: "Marco" }],
        ],
      },
    ];

    render(<ActivitiesContainer activities={activityResponse} />);

    const selectElement = screen.getByTestId("activity-selector-container");
    const topItem = selectElement.firstElementChild;
    const bottomItem = selectElement.lastElementChild;

    expect(topItem).toHaveTextContent("Third Activity");
    expect(bottomItem).toHaveTextContent("First Activity");
  });
});