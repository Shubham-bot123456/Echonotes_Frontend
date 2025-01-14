import React, { useEffect, useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, useAnimation } from "framer-motion";

export default function ShareModal({ shareBook, book, setBlurr }) {
    const animation = useAnimation();
    const [calledUser, setCalledUser] = useState("");
    // animation.start({
    //     scale: 1,
    //     opacity: 1,
    //     translateY:0,
    //     transition: {
    //         duration:0.4 ,
    //     }
    // })

    const openModal = () => {
        const modal = document.getElementById(`shareModal${book.id}`);
        modal.showModal();
        setBlurr(true);

        animation.start({
            scale: 1,
            opacity: 1,
            translateY: 0,
            transition: {
                duration: 0.4,
            },
        });
    };

    const closeModal = () => {
        const modal = document.getElementById(`shareModal${book.id}`);
        modal.close();
        setBlurr(false);

        animation.start({
            scale: 0,
            opacity: 0,

            transition: {
                duration: 0.4,
            },
        });
    };

    return (
        <div className="z-30">
            <IoShareSocialOutline
                className="text-lg text-black"
                onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                }}
            >
                share
            </IoShareSocialOutline>
            <dialog
                id={`shareModal${book.id}`}
                className="modal items-center justify-center backdrop-blur-sm rounded-md shadow-2xl"
                onClick={(e) => e.target.tagName === "DIALOG" && closeModal()}
            >
                <motion.div
                    initial={{
                        scale: 0.2,
                        opacity: 0,
                        translateY: 200,
                    }}
                    animate={animation}
                    className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-xl text-semibold"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                    <section className="flex gap-2 mb-4">
                        <IoShareSocialOutline className="text-xl my-auto"></IoShareSocialOutline>
                        <h2 className="text-lg font-semibold text-gray-700 my-auto">
                            Share
                        </h2>
                    </section>
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            onChange={(e) => setCalledUser(e.target.value)}
                            placeholder="Send to User..."
                            className="text-black flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <form>
                            <button
                                type="button"
                                onClick={() => {
                                    console.log("getting into share note method");
                                    shareBook(calledUser, book);
                                    setBlurr(false);
                                    document.getElementById(`shareModal${book.id}`).close();
                                }}
                                className="bg-black text-white font-medium rounded-md px-4 py-2 transition duration-200"
                            >
                                Share
                            </button>
                        </form>
                    </div>
                </motion.div>
            </dialog>
        </div>
    );
}
