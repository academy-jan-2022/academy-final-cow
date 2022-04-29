import { AvatarGenerator } from "./AvatarGenerator";

let avatarGenerator: AvatarGenerator;

describe("avatar generator should", () => {
  beforeEach(() => {
    avatarGenerator = new AvatarGenerator();
  });

  test("reduce the number of avatars on every call", () => {
    let randomAvatar = avatarGenerator.randomise();
    expect(avatarGenerator.avatars.length).toEqual(6);
    expect(avatarGenerator.avatars.includes(randomAvatar)).toBeFalsy();
  });

  test("reload the avatars once theyre depleted", () => {
    avatarGenerator.originalAvatars.forEach(() => {
      avatarGenerator.randomise();
    });
    expect(avatarGenerator.avatars.length).toEqual(
      avatarGenerator.originalAvatars.length
    );
  });

  test("generate a list based on number of members", () => {
    const list = avatarGenerator.generateAvatarList([
      { id: "1", fullName: "Jose" },
      { id: "1", fullName: "Sandro" },
      { id: "1", fullName: "Mash" },
    ]);
    expect(list.length).toEqual(3);
  });
});
