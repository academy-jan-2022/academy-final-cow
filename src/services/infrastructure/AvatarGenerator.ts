import avatar1 from "../../images/avatars/da.png";
import avatar2 from "../../images/avatars/ia.png";
import avatar3 from "../../images/avatars/sc.png";
import avatar4 from "../../images/avatars/nr.png";

class AvatarGenerator {
  avatars = [avatar1, avatar2, avatar3, avatar4];

  randomise() {
    const index = Math.floor(Math.random() * this.avatars.length);
    return this.avatars[index];
  }
}

const avatarGenerator = new AvatarGenerator();

export default avatarGenerator;
