import React from "react";
import { IoShareSocialOutline } from "react-icons/io5";

export default function ShareModal({ shareBook, book, setBlurr }) {
  const [calledUser, setCalledUser] = React.useState("");
  return (
    <div className="z-30">
      <IoShareSocialOutline
        className="text-lg text-black"
        onClick={(e) => {
          e.stopPropagation();
          document.getElementById(`shareModal${book.id}`).showModal();
          console.log(book.id);
          setBlurr(true);
        }}
      >
        share
      </IoShareSocialOutline>
      <dialog
        id={`shareModal${book.id}`}
        className="modal items-center justify-center backdrop-blur-sm rounded-md shadow-2xl"
        onClick={(e) => e.target.tagName === "DIALOG" && e.target.close()}
      >
        <div
          className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal content from propagating
        >
          <button
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-xl text-semibold"
            onClick={() => {
              document.getElementById(`shareModal${book.id}`).close();
              setBlurr(false);
            }}
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
              className=" text-black flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <form>
              <button
                onClick={() => {
                  console.log("getting into share note method");
                  console.log(book.id);
                  shareBook(calledUser, book);
                  console.log("getting out of share note method");
                }}
                className="bg-black text-white font-medium rounded-md px-4 py-2 transition duration-200"
              >
                Share
              </button>
            </form>
          </div>
          <div className="mt-4 text-center"></div>
        </div>
      </dialog>{" "}
    </div>
  );
}
