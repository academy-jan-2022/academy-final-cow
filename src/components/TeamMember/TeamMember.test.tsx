import React from "react";
import { render, screen } from "@testing-library/react";
import TeamMember from "./TeamMember";
import avatarGenerator from "../../services/infrastructure/AvatarGenerator";

describe("team member component should", () => {
  beforeEach(() => {
    render(
      <TeamMember
        fullName={"Bob Johnson"}
        avatar={{ link: "avatar", bgColor: "#333" }}
      />
    );
  });

  test("have the full name", () => {
    const name = screen.getByText("Bob Johnson");
    expect(name).toBeInTheDocument();
  });

  test("have a random avatar", () => {
    const avatar = screen.getByTestId("team-member-avatar");
    expect(avatar).toBeInTheDocument();
  });
});
