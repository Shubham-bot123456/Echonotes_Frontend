import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CgLogOff } from "react-icons/cg";
import { BiSolidLeaf } from "react-icons/bi";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowUp, IoMdArrowDropup } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Cat from "../iconimages/cat.png";
import Panda from "../iconimages/panda.png";
import Man from "../iconimages/man.png";
import Woman from "../iconimages/woman.png";
import Hacker from "../iconimages/hacker.png";
import Gamer from "../iconimages/gamer.png";
import Cookies from "universal-cookie";
import { IoIosClose } from "react-icons/io";
import { setSearchListFunction } from "./redux/SearchListSlice";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import echonote_icon from "../iconimages/echonotes icon.png";
import avatarNameToImageFunction from "./AvatarImageHelper";

export default function Header({ setsearch, showSearchAndLogout }) {
  const [localSearch, setLocalSearch] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  let userName = useSelector((state) => state.userdetails.value);
  let jwttoken = useSelector((state) => state.jwtdetails.value);
  let refresh = useSelector((state) => state.refreshdetails.value);
  const [searchList, setSearchList] = useState([]);
  const [searchListOpen, setSearchListOpen] = useState(false);
  const dispatcher = useDispatch();
  const cookie = new Cookies();
  const searchAnimation = useAnimation();
  const searchButtonAnimation = useAnimation();
  const [dropDownStatus, setDropDownStatus] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     console.log(
  //       "inside useeffect hook in header and the searchlist is " + searchList
  //     );
  //     dispatcher(setSearchListFunction(searchList));
  //   })();
  // }, searchList);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const removeElementFromTheList = (item) => {
    let tempArray = [];
    for (let i = 0; i < searchList.length; i++) {
      if (item != searchList[i]) {
        tempArray.push(searchList[i]);
      }
    }
    setSearchList(tempArray);
    dispatcher(setSearchListFunction(tempArray));
    if (tempArray.length == 0) {
      setSearchListOpen(false);
    }
  };
  //init
  useEffect(() => {
    (async () => {
      console.log("Inside the header useEffect function");
      console.log("in header the jwt token is " + jwttoken);
      const cookie = new Cookies();
      if (showSearchAndLogout === false) return;
      let avatarName = "";
      axios({
        url: `${backendUrl}/todo/getAvatar`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.get("authorization")}`,
        },
      })
        .then((res) => {
          avatarName = res.data;
          setAvatar(avatarNameToImageFunction(avatarName));
          console.log("avatar is " + avatarName);
        })
        .catch((err) => {
          console.error("Error while fetching avatar name for the user");
        });
    })();
  }, [refresh, showSearchAndLogout]);

  // header parent div.
  return (
    <div className="w-full fixed top-0 left-0 flex justify-between px-4 md:px-8 py-4 shadow-lg z-50 bg-white">
      <section className="flex gap-1">
        <div className="overflow-hidden w-[110px] h-[32px] relative items-center">
          <img
            className="absolute top-[-3px] left-[-5px] w-[98px] h-[38px] m-auto"
            src={echonote_icon}
          />
        </div>
      </section>
      {showSearchAndLogout ? (
        <section className="flex gap-4">
          <div className="flex gap-1">
            {searchList.length > 0 ? (
              <details className=" dropdown dropdown-end m-auto">
                <summary className="list-none">
                  {!searchListOpen ? (
                    <MdOutlineKeyboardDoubleArrowDown
                      className="text-2xl my-auto animate-pulse"
                      onClick={() => {
                        setSearchListOpen(true);
                        searchAnimation.start({
                          opacity: 1,
                          scale: 1,
                          translateY: 0,
                          transition: {
                            duration: 0.4,
                          },
                        });
                      }}
                    ></MdOutlineKeyboardDoubleArrowDown>
                  ) : (
                    <MdOutlineKeyboardDoubleArrowUp
                      className="text-2xl my-auto animate-pulse"
                      onClick={() => {
                        setSearchListOpen(false);
                        searchAnimation.start({
                          opacity: 0,
                          scale: 0,
                          translateY: -20,
                        });
                      }}
                    ></MdOutlineKeyboardDoubleArrowUp>
                  )}
                </summary>{" "}
                <motion.ul
                  className="menu dropdown-content bg-base-100 rounded-md z-[1] w-40 p-2 shadow"
                  initial={{
                    scale: 0,
                    translateY: -20,
                    opacity: 0,
                  }}
                  animate={searchAnimation}
                >
                  {searchList.map((item) => {
                    return (
                      <li
                        key={item}
                        className="p-1 my-1 shadow-md relative rounded-md"
                      >
                        <p>{item}</p>
                        <div className="absolute top-1.5 right-1 text-xl">
                          <IoIosClose
                            onClick={() => {
                              removeElementFromTheList(item);
                            }}
                          ></IoIosClose>
                        </div>
                      </li>
                    );
                  })}
                </motion.ul>
              </details>
            ) : (
              ""
            )}
            <div className="relative overflow-hidden">
              <input
                placeholder="search .."
                className="input input-sm w-[28vw] md:w-[140px]  relative border-2 border-black"
                value={localSearch}
                onChange={(event) => setLocalSearch(event.target.value)}
              />
              <motion.button
                className="h-full bg-black text-white px-2 py-1 text-md  absolute top-0 right-0  rounded-tr-md rounded-br-md"
                initial={{
                  opacity: 1,
                  scale: 1,
                }}
                animate={searchButtonAnimation}
                transition={{
                  duration: 1,
                }}
                onClick={() => {
                  if (localSearch.trim().length == 0) {
                    dispatcher(setSearchListFunction(searchList));
                    return;
                  }
                  searchList.push(localSearch);
                  setsearch(localSearch);
                  setLocalSearch("");
                  dispatcher(setSearchListFunction(searchList));
                  searchButtonAnimation.start({
                    opacity: [1, 0.4, 0.4, 1],
                    scale: [1, 0.4, 0.4, 1],
                    borderTopLeftRadius: [0, 10, 50, 10, 0],
                    borderTopRightRadius: [5, 10, 50, 10, 5],
                    borderBottomLeftRadius: [0, 10, 50, 10, 0],
                    borderBottomRightRadius: [5, 10, 50, 10, 5],
                    translateX: [0, 10, -140, -140, 10, 0],
                    transition: {
                      duration: 1,
                    },
                  });
                }}
              >
                <IoSearch></IoSearch>
              </motion.button>
            </div>
          </div>
          <div className="dropdown dropdown-end relative">
            <div>
              <div
                className="w-8 bg-green-500 rounded-full overflow-hidden"
                type="button"
                onClick={() => {
                  setDropDownStatus(!dropDownStatus);
                }}
              >
                {avatar}
              </div>
            </div>
            {dropDownStatus ? (
              <ul className="absolute top-11 right-2 menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
                <li>
                  <div className="flex justify-between">
                    <p>hi {userName}!</p>
                    <div className="p-1 rounded-full bg-gray-800">
                      <CgLogOff
                        className="text-2xl hover:scale-105 text-white"
                        onClick={() => {
                          navigate("/login");
                          cookie.remove("authorization");
                        }}
                      ></CgLogOff>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate("/avatar");
                    }}
                  >
                    Change Avatar
                  </button>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}
