import avatar1 from "../../images/avatars/da.png";
import avatar2 from "../../images/avatars/ia.png";
import avatar3 from "../../images/avatars/sc.png";
import avatar4 from "../../images/avatars/nr.png";
import avatar5 from "../../images/avatars/sb.png";
import avatar6 from "../../images/avatars/bh.png";
import avatar7 from "../../images/avatars/lb.png";
import { TeamMember } from "../team/Team";

export class AvatarGenerator {
  originalAvatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
  ];
  avatars = [...this.originalAvatars];

  randomise() {
    const index = Math.floor(Math.random() * this.avatars.length);

    let randomAvatar = this.avatars[index];
    this.avatars.splice(index, 1);

    if (this.avatars.length === 0) {
      this.avatars = [...this.originalAvatars];
    }
    return randomAvatar;
  }

  nameToColour(name: string) {
    const stringArray = Array.from(name);
    const stringUniqueHash = [...stringArray].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `hsl(${stringUniqueHash % 360}, 95%, 35%, 0.5)`;
  }

  generateAvatarList(members: TeamMember[]): Avatar[] {
    return members.map((member) => {
      const link = this.randomise();
      const bgColor = this.nameToColour(member.fullName);
      return {
        link,
        bgColor,
      };
    });
  }
}

export type Avatar = {
  link: string;
  bgColor: string;
};

const avatarGenerator = new AvatarGenerator();

export default avatarGenerator;
