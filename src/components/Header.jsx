import React, { useEffect, useState } from "react";
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
import { IoMdArrowDropdown } from "react-icons/io";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
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
      await axios({
        url: `${backendUrl}/todo/getAvatar`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.get("authorization")}`,
        },
      })
        .then((res) => {
          avatarName = res.data;
          console.log("avatar is " + avatarName);
        })
        .catch((err) => {
          console.error("Error while fetching avatar name for the user");
        });
      if (avatarName == "Panda") setAvatar(<img src={Panda}></img>);
      else if (avatarName == "Man") setAvatar(<img src={Man}></img>);
      else if (avatarName == "Woman") setAvatar(<img src={Woman}></img>);
      else if (avatarName == "Hacker") setAvatar(<img src={Hacker}></img>);
      else if (avatarName == "Cat") setAvatar(<img src={Cat}></img>);
      else if (avatarName == "Gamer") setAvatar(<img src={Gamer}></img>);
    })();
  }, [refresh, showSearchAndLogout]);

  // header parent div.
  return (
    <div className="w-full fixed top-0 left-0 flex justify-between px-4 md:px-8 py-4 shadow-lg z-50 bg-white">
      <section className="flex gap-1">
        <h1 className="text-semibold text-lg">EchoNotes</h1>
        <BiSolidLeaf className="text-3xl"></BiSolidLeaf>
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
                      }}
                    ></MdOutlineKeyboardDoubleArrowDown>
                  ) : (
                    <MdOutlineKeyboardDoubleArrowUp
                      className="text-2xl my-auto animate-pulse"
                      onClick={() => {
                        setSearchListOpen(false);
                      }}
                    ></MdOutlineKeyboardDoubleArrowUp>
                  )}
                </summary>{" "}
                <ul className="menu dropdown-content bg-base-100 rounded-md z-[1] w-40 p-2 shadow">
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
                </ul>
              </details>
            ) : (
              ""
            )}
            <div className="relative">
              <input
                placeholder="search .."
                className="input input-sm w-[140px]  relative border-2 border-black"
                value={localSearch}
                onChange={(event) => setLocalSearch(event.target.value)}
              />
              <button
                className="h-full bg-black text-white px-2 py-1 text-md  absolute top-0 right-0  rounded-tr-md rounded-br-md"
                onClick={() => {
                  if (localSearch.trim().length == 0) {
                    dispatcher(setSearchListFunction(searchList));
                    return;
                  }
                  searchList.push(localSearch);
                  setsearch(localSearch);
                  dispatcher(setSearchListFunction(searchList));
                }}
              >
                <IoSearch></IoSearch>
              </button>
            </div>
          </div>
          <details className="dropdown dropdown-end">
            <summary className="list-none">
              <div
                className="w-8 bg-green-500 rounded-full overflow-hidden"
                type="button"
              >
                {avatar}
              </div>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <div className="flex justify-between">
                  <p>hi {userName}!</p>

                  <CgLogOff
                    className="text-2xl hover:scale-105 "
                    onClick={() => {
                      navigate("/login");
                      cookie.remove("authorization");
                    }}
                  ></CgLogOff>
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
          </details>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}
