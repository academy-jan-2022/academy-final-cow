import avatar1 from "../../images/avatars/da.png";
import avatar2 from "../../images/avatars/ia.png";
import avatar3 from "../../images/avatars/sc.png";
import avatar4 from "../../images/avatars/nr.png";
import avatar5 from "../../images/avatars/sb.png";
import avatar6 from "../../images/avatars/bh.png";
import avatar7 from "../../images/avatars/lb.png";

class AvatarGenerator {
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

  generateAvatarList(numberOfAvatars: number): string[] {
    let avatarArray = [];
    for (let i = 0; i < numberOfAvatars; i++) {
      avatarArray.push(this.randomise());
    }
    return avatarArray;
  }
}

const avatarGenerator = new AvatarGenerator();

export default avatarGenerator;
