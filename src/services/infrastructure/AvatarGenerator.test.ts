import avatarGenerator from "./AvatarGenerator";

describe("avatar generator should", () => {
  test("reduce the number of avatars on every call", () => {
    let rondomAvatar = avatarGenerator.randomise();
    expect(avatarGenerator.avatars.length).toEqual(6);
    expect(avatarGenerator.avatars.includes(rondomAvatar)).toBeFalsy();
  });

  test("reload the avatars once theyre depleted", () => {
    avatarGenerator.randomise();
    avatarGenerator.randomise();
    avatarGenerator.randomise();
    expect(avatarGenerator.avatars.length).toEqual(3);
  });
});
