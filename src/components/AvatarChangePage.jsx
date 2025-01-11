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
import Cookies from "universal-cookie";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AvatarChangePage() {
  let token = useSelector((state) => state.jwtdetails.value);
  let refresh = useSelector((state) => state.refreshdetails.value);
  const dispatcher = useDispatch();
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const updateUserAvatar = async (avatarName) => {
    setLoading(true);
    //estimated-corrianne-echonotes-5e2e8076.koyeb.app
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    await axios({
      url: `${backendUrl}/todo/updateAvatar/${avatarName}`,
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
    setLoading(false);
    navigate("/main");
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-evenly">
      <AnimatePresence>
        <motion.div
          className="p-5 m-auto w-[80vw] h-[80vh]  rounded-xl shadow-2xl relative"
          initial={{
            opacity: 0,
            scale: 0.4,
            translateY: 200,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            translateY: 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >
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
          {loading ? (
            <span className="fixed top-[50%] left-[50%] loading loading-spinner loading-lg mx-auto"></span>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center h-[90%] p-3 overflow-auto">
              <div
                className="flex justify-center w-full h-full  rounded-lg shadow-xl"
                onClick={() => updateUserAvatar("Cat")}
              >
                <img
                  src={Cat}
                  className="w-[70px] h-[70px] rounded-full m-auto"
                />
              </div>
              <div
                className="flex justify-center  rounded-lg shadow-xl w-full h-full"
                onClick={() => updateUserAvatar("Gamer")}
              >
                <img
                  src={Gamer}
                  className="w-[70px] h-[70px] rounded-full m-auto"
                />
              </div>
              <div
                className="flex justify-center shadow-xl w-full h-full"
                onClick={() => updateUserAvatar("Man")}
              >
                <img
                  src={Man}
                  className="w-[70px] h-[70px] rounded-full m-auto"
                />
              </div>
              <div
                className="flex justify-center shadow-xl w-full h-full"
                onClick={() => updateUserAvatar("Woman")}
              >
                <img
                  src={Woman}
                  className="w-[70px] h-[70px] rounded-full m-auto"
                />
              </div>
              <div
                className="flex justify-center shadow-xl w-full h-full"
                onClick={() => updateUserAvatar("Panda")}
              >
                <img
                  src={Panda}
                  className="w-[70px] h-[70px] rounded-full m-auto"
                />
              </div>
              <div
                className="flex justify-center shadow-xl w-full h-full"
                onClick={() => updateUserAvatar("Panda")}
              >
                <img
                  src={Hacker}
                  className="w-[70px] h-[70px] rounded-full m-auto"
                  x
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
