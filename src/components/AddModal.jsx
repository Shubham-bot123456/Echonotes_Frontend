import React, {useState} from "react";
import {FaSquarePlus} from "react-icons/fa6";
import Dock from "./Dock";
import {motion, AnimatePresence, useAnimation} from "framer-motion";

export default function AddModal({addBook}) {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const animation = useAnimation();

    return (
        <div className=" flex justify-evenly my-5">
            <FaSquarePlus
                className="bg-white text-6xl text-black rounded-lg p-[-10px] fixed bottom-4 right-4 hover:scale-105 z-10"
                onClick={() => {
                    document.getElementById("my_modal_1").showModal();
                    setId("");
                    setTitle("");
                    animation.start({
                        opacity: 1,
                        translateY: 0,
                        scale: 1,
                        transition: {
                            duration: 0.4,
                        }
                    });
                }}
            >
                <div className></div>
            </FaSquarePlus>
            <dialog id="my_modal_1" className="modal">
                <AnimatePresence>
                    < motion.div className="w-full h-screen relative text-black"
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
              defaultValue={title}
              onChange={(event) => setTitle(event.target.value)}
          ></textarea>
                        <Dock type="add" id={id} title={title} addBook={addBook}></Dock>
                    </motion.div>
                </AnimatePresence>
            </dialog>
        </div>
    );
}
