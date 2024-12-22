import React from "react";
import Cat from "../iconimages/cat.png";
import Gamer from "../iconimages/gamer.png";
import Man from "../iconimages/man.png";
import Woman from "../iconimages/woman.png";
import Hacker from "../iconimages/hacker.png";
import Panda from "../iconimages/panda.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { RxAvatar } from "react-icons/rx";
import { setRefresh } from "./redux/Refresh";

export default function AvatarChangePage() {
  let token = useSelector((state) => state.jwtdetails.value);
  let refresh = useSelector((state) => state.refreshdetails.value);
  const dispatcher = useDispatch();

  const navigate = useNavigate();
  const updateUserAvatar = async (avatarName) => {
    await axios({
      url: `https://estimated-corrianne-echonotes-5e2e8076.koyeb.app/todo/updateAvatar/${avatarName}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatcher(setRefresh(refresh + 1));
      })
      .catch((err) => {
        console.error(err.data);
      });
    navigate("/Echonotes_Frontend/main/" + token);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-evenly">
      <div className="p-5 m-auto w-[60vw] h-[60vh]  rounded-xl shadow-2xl">
        <section className="flex gap-1">
          <RxAvatar className="text-2xl"></RxAvatar>
          <p className="text-lg">Change Avatar</p>
        </section>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 m-5 h-[90%]  overflow-auto">
          <div>
            <img
              src={Cat}
              className="w-[70px] h-[70px] rounded-full"
              onClick={() => updateUserAvatar("Cat")}
            ></img>
          </div>
          <div>
            <img
              src={Gamer}
              className="w-[70px] h-[70px] rounded-full"
              onClick={() => updateUserAvatar("Gamer")}
            ></img>
          </div>
          <div>
            <img
              src={Man}
              className="w-[70px] h-[70px] rounded-full"
              onClick={() => updateUserAvatar("Man")}
            ></img>
          </div>
          <div>
            <img
              src={Woman}
              className="w-[70px] h-[70px] rounded-full"
              onClick={() => updateUserAvatar("Woman")}
            ></img>
          </div>
          <div>
            <img
              src={Panda}
              className="w-[70px] h-[70px] rounded-full"
              onClick={() => updateUserAvatar("Panda")}
            ></img>
          </div>
          <div>
            <img
              src={Hacker}
              className="w-[70px] h-[70px] rounded-full"
              onClick={() => updateUserAvatar("Hacker")}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
