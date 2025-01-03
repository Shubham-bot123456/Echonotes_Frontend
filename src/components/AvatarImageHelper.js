import Cat from "../iconimages/cat.png";
import Panda from "../iconimages/panda.png";
import Hacker from "../iconimages/hacker.png";
import Woman from "../iconimages/woman.png";
import Man from "../iconimages/man.png";
import Gamer from "../iconimages/gamer.png";

export default function avatarNameToImageFunction(avatarName) {
  if (avatarName == "Panda") return <img src={Panda}></img>;
  else if (avatarName == "Man") return <img src={Man}></img>;
  else if (avatarName == "Woman") return <img src={Woman}></img>;
  else if (avatarName == "Hacker") return <img src={Hacker}></img>;
  else if (avatarName == "Cat") return <img src={Cat}></img>;
  else if (avatarName == "Gamer") return <img src={Gamer}></img>;
}
