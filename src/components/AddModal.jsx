import React, { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";

import { FaSquarePlus } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
// for now using state uplifting
export default function AddModal({ addBook }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  return (
    <div className=" flex justify-evenly my-5">
      <FaSquarePlus
        className="bg-white text-6xl text-black rounded-lg p-[-10px] fixed bottom-4 right-4 hover:scale-105 z-10"
        onClick={() => {
          document.getElementById("my_modal_1").showModal();
          setId("");
          setTitle("");
        }}
      >
        <div className></div>
      </FaSquarePlus>
      <dialog id="my_modal_1" className="modal">
        <div className="w-full h-screen relative text-black">
          <textarea
            placeholder="   start writing here .... "
            className="w-full h-full p-4"
            defaultValue={title}
            onChange={(event) => setTitle(event.target.value)}
          ></textarea>
          <form>
            <button>
              <IoIosAdd
                onClick={() => {
                  addBook(id, title);
                }}
                className="text-6xl absolute bottom-4 right-5 hover:scale-105"
              ></IoIosAdd>
            </button>
            <button>
              <IoIosArrowRoundBack className="text-6xl absolute bottom-4 left-4 hover:scale-105"></IoIosArrowRoundBack>
            </button>
          </form>
        </div>
      </dialog>{" "}
    </div>
  );
}
