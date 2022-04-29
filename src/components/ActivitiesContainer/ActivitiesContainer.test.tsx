import React from "react";
import ActivitiesContainer from "./ActivitiesContainer";
import { render, screen } from "@testing-library/react";

describe("activites container should", () => {
  test("show the most recent activity", () => {
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

    const currentActivity = screen.getByTestId("activity-name-text");

    expect(currentActivity).toHaveTextContent("Third Activity");
  });
});