import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CgLogOff } from "react-icons/cg";
import { BiSolidLeaf } from "react-icons/bi";

import { useSelector } from "react-redux";

export default function Header({ setsearch, showSearchAndLogout }) {
  const [localSearch, setLocalSearch] = useState("");
  const navigate = useNavigate();

  let userName = useSelector((state) => state.userdetails.value);

  // header parent div.
  return (
    <div className="w-full fixed top-0 left-0  flex justify-between px-8 py-4 shadow-lg z-50 bg-white">
      <section className="flex gap-1">
        <h1 className="text-semibold text-lg ">EchoNotes</h1>
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
                setLocalSearch("");
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
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
            </ul>
          </details>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}
