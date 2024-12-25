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
import { MdSystemSecurityUpdate } from "react-icons/md";
import Cookies from "universal-cookie";
import { MdClose } from "react-icons/md";

export default function AvatarChangePage() {
  let token = useSelector((state) => state.jwtdetails.value);
  let refresh = useSelector((state) => state.refreshdetails.value);
  const dispatcher = useDispatch();
  const cookie = new Cookies();
  const navigate = useNavigate();
  const updateUserAvatar = async (avatarName) => {
    await axios({
      url: `https://estimated-corrianne-echonotes-5e2e8076.koyeb.app/todo/updateAvatar/${avatarName}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookie.get("authorization")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatcher(setRefresh(refresh + 1));
      })
      .catch((err) => {
        console.error(err.data);
      });
    navigate("/main");
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-evenly">
      <div className="p-5 m-auto w-[60vw] h-[60vh]  rounded-xl shadow-2xl relative">
        <MdClose
            className="absolute top-4 right-4"
            size={35}
            onClick={() => {
              navigate(`/main`);
            }}
        />
        <section className="flex gap-1">
          <RxAvatar className="text-2xl"></RxAvatar>
          <p className="text-lg">Change Avatar</p>
        </section>
        <div
            className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center h-[90%] p-3 overflow-auto">
          <div className="flex justify-center">
            <img
                src={Cat}
                className="w-[70px] h-[70px] rounded-full"
                onClick={() => updateUserAvatar("Cat")}
            />
          </div>
          <div className="flex justify-center">
            <img
                src={Gamer}
                className="w-[70px] h-[70px] rounded-full"
                onClick={() => updateUserAvatar("Gamer")}
            />
          </div>
          <div className="flex justify-center">
            <img
                src={Man}
                className="w-[70px] h-[70px] rounded-full"
                onClick={() => updateUserAvatar("Man")}
            />
          </div>
          <div className="flex justify-center">
            <img
                src={Woman}
                className="w-[70px] h-[70px] rounded-full"
                onClick={() => updateUserAvatar("Woman")}
            />
          </div>
          <div className="flex justify-center">
            <img
                src={Panda}
                className="w-[70px] h-[70px] rounded-full"
                onClick={() => updateUserAvatar("Panda")}
            />
          </div>
          <div className="flex justify-center">
            <img
                src={Hacker}
                className="w-[70px] h-[70px] rounded-full"
                onClick={() => updateUserAvatar("Hacker")}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
