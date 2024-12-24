import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CgLogOff } from "react-icons/cg";
import { BiSolidLeaf } from "react-icons/bi";
import axios from "axios";

import { useSelector } from "react-redux";
import Cat from "../iconimages/cat.png";
import Panda from "../iconimages/panda.png";
import Man from "../iconimages/man.png";
import Woman from "../iconimages/woman.png";
import Hacker from "../iconimages/hacker.png";
import Gamer from "../iconimages/gamer.png";
import Cookies from "universal-cookie";

export default function Header({ setsearch, showSearchAndLogout }) {
  const [localSearch, setLocalSearch] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  let userName = useSelector((state) => state.userdetails.value);
  let jwttoken = useSelector((state) => state.jwtdetails.value);
  let refresh = useSelector((state) => state.refreshdetails.value);

  //init
  useEffect(() => {
    (async () => {
      console.log("Inside the header useEffect function");
      console.log("in header the jwt token is " + jwttoken);
      const cookie = new Cookies();
      if (showSearchAndLogout === false) return;
      let avatarName = "";
      await axios({
        url: "https://estimated-corrianne-echonotes-5e2e8076.koyeb.app/todo/getAvatar",
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
    <div className="w-full fixed top-0 left-0  flex justify-between px-8 py-4 shadow-lg z-50 bg-white">
      <section className="flex gap-1">
        <h1 className="text-semibold text-lg">EchoNotes</h1>
        <BiSolidLeaf className="text-3xl"></BiSolidLeaf>
      </section>
      {showSearchAndLogout ? (
        <section className="flex gap-4">
          <div className="relative">
            <input
              placeholder="search .."
              className="input input-sm relative border-2 border-black"
              value={localSearch}
              onChange={(event) => setLocalSearch(event.target.value)}
            />
            <button
              className="h-full bg-black text-white px-2 py-1 text-sm absolute top-0 right-0  rounded-tr-md rounded-br-md"
              onClick={() => {
                setsearch(localSearch);
              }}
            >
              search
            </button>
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
