import React from "react";
import { render, screen } from "@testing-library/react";
import TeamMember from "./TeamMember";
import avatarGenerator from "../../services/infrastructure/AvatarGenerator";

jest.mock("../../services/infrastructure/AvatarGenerator");
const mockedAvatarGenerator = avatarGenerator as jest.Mocked<
  typeof avatarGenerator
>;

describe("team member component should", () => {
  beforeEach(() => {
    render(<TeamMember fullName={"Bob Johnson"} />);
  });

  test("have the full name", () => {
    const name = screen.getByText("Bob Johnson");
    expect(name).toBeInTheDocument();
  });

  test("have a random avatar", () => {
    const avatar = screen.getByTestId("team-member-avatar");
    expect(avatar).toBeInTheDocument();
    expect(mockedAvatarGenerator.randomise).toHaveBeenCalled();
  });
});
