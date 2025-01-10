import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import Dock from "./Dock.jsx";
import { CiEdit } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import {motion,AnimatePresence, useAnimation} from "framer-motion";
// for now using state uplifting
export default function UpdateModal({ updateBook, book }) {
    const animation = useAnimation();
  return (
    <div>
      <MdOutlineEdit
        className="text-lg text-black"
        onClick={(e) => {
          e.stopPropagation();
          document.getElementById(`showModal${book.id}`).showModal();
          console.log(
            "inside the update button note id : " +
              book.id +
              " and the note description " +
              book.description
          );
          animation.start({
              opacity: 1,
              translateY: 0,
              scale : 1,
              transition: {
                 duration: 0.4,
              }
          })
        }}
      >
        update
      </MdOutlineEdit>
      <dialog id={`showModal${book.id}`} className="modal">
        <motion.div className="w-full h-screen relative text-black"
                    animate={animation}
                    initial={{
                        opacity: 0,
                        translateY: 200,
                        scale: 0,
                    }}
                    exit={{
                        opacity: 0,
                        translateY: 200,
                        scale: 0,
                    }}
        >
          <textarea
            placeholder="start writing here .... "
            className="w-full h-full p-4"
            defaultValue={book.description}
            onChange={(event) => (book.description = event.target.value)}
          ></textarea>
          <Dock type="update" updateBook={updateBook} book={book} />{" "}
        </motion.div>
      </dialog>{" "}
    </div>
  );
}
