import React from "react";
import Dock from "./Dock";
import axios from "axios";



export default function ShareModal({shareBook, book}) {
    const[calledUser, setCalledUser] = React.useState("");

    return (
        <div className="z-30">
            <button
                className="hover:underline"
                onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById(`showModal`).showModal();
                }}
            >
                share
            </button>

            <dialog
                id="showModal"
                className="items-center justify-center bg-black/50 backdrop-blur-sm"
                onClick={(e) => e.target.tagName === 'DIALOG' && e.target.close()}
            >
                <div
                    className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                    onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal content from propagating
                >
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        onClick={() => document.getElementById('showModal').close()}
                    >
                        ✕
                    </button>
                    <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
                        Search and Share
                    </h2>
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            onChange={(e) => setCalledUser(e.target.value)}
                            placeholder="Send to User..."
                            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <button
                            onClick={() => shareBook(calledUser, book)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-4 py-2 transition duration-200">
                            Share
                        </button>
                    </div>
                    <div className="mt-4 text-center">

                    </div>
                </div>
            </dialog>


            {" "}
        </div>
    );

}