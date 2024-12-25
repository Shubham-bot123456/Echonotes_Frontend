import React, { useState } from "react";

import { FaRegCircle } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RiSaveLine } from "react-icons/ri";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export default function Dock({ type, id, title, addBook, book, updateBook }) {
  const [showDock, setShowDock] = useState(true);
  const navigate = useNavigate();
  return (
    <motion.div
      className="w-[100%] fixed bottom-6 left-0 flex justify-evenly"
      initial={{
        scale: 0,
        opacity: 0,
        borderRadius: 100,
      }}
      animate={{
        scale: [0, 0.2, 0.4, 0.6, 0.8, 1],
        opacity: [0, 0.2, 0.2, 0.4, 0.8, 1],
        borderRadius: [100, 80, 60, 40, 20, 15],
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.2,

        type: "tween",
        bounce: 0.1,
        delay: 1,
      }}
      enter={{
        scale: [0, 0.2, 0.4, 0.6, 0.8, 1],
        opacity: [0, 0.2, 0.2, 0.4, 0.8, 1],
        borderRadius: [100, 80, 60, 40, 20, 15],
      }}
    >
      {showDock ? (
        <motion.div
          className=" bg-black rounded-2xl  p-2 animate-bouce duration-300"
          initial={{
            scale: 0,
            opacity: 0,
            // translateY: 50,
            borderRadius: 100,
          }}
          animate={{
            scale: [0, 0.2, 0.4, 0.6, 0.8, 1],
            opacity: [0, 0.2, 0.2, 0.4, 0.8, 1],
            borderRadius: [100, 80, 60, 40, 20, 15],
            // translateY: 0,
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.2,

            type: "tween",
            bounce: 0.1,
          }}
          enter={{
            scale: [0, 0.2, 0.4, 0.6, 0.8, 1],
            opacity: [0, 0.2, 0.2, 0.4, 0.8, 1],
            borderRadius: [100, 80, 60, 40, 20, 15],
          }}
        >
          <form className="flex justify-evenly gap-3">
            <button>
              <IoIosArrowRoundBack
                className="text-white bg-black text-3xl hover:scale-105"
                onClick={() => navigate("/home")}
              ></IoIosArrowRoundBack>
            </button>
            <button>
              <FaRegCircle
                className="text-white bg-black text-3xl hover:scale-105"
                onClick={() => {
                  setShowDock(false);
                }}
              ></FaRegCircle>
            </button>
            <button
              onClick={() => {
                if (type == "add") addBook(id, title);
                else updateBook(book);
              }}
            >
              <RiSaveLine className="text-white bg-black text-3xl hover:scale-105"></RiSaveLine>
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.button
          initial={{
            scale: 2,
            opacity: 0,
            // translateY: 50,
          }}
          animate={{
            scale: [2, 1.8, 1.6, 1.4, 1.2, 1],
            opacity: [0, 0.2, 0.2, 0.4, 0.8, 1],
            // translateY: 0,
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.4,
            type: "tween",
            bounce: 0.1,
          }}
          onClick={() => {
            setShowDock(true);
          }}
        >
          <FaRegCircle id="onlycircle" className="text-3xl"></FaRegCircle>
        </motion.button>
      )}
    </motion.div>
  );
}
