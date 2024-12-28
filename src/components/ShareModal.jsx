import React from "react";

export default function ShareModal({ shareBook, book, setBlurr }) {
  const [calledUser, setCalledUser] = React.useState("");
  return (
    <div className="z-30">
      <button
        className="hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          document.getElementById(`showModal`).showModal();
          setBlurr(true);
        }}
      >
        share
      </button>
      <dialog
        id="showModal"
        className="items-center justify-center backdrop-blur-sm rounded-md shadow-2xl"
        onClick={(e) => e.target.tagName === "DIALOG" && e.target.close()}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal content from propagating
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => {
              document.getElementById("showModal").close();
              setBlurr(false);
            }}
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
              onClick={() => {
                shareBook(calledUser, book);
              }}
              className="bg-black text-white font-medium rounded-md px-4 py-2 transition duration-200"
            >
              Share
            </button>
          </div>
          <div className="mt-4 text-center"></div>
        </div>
      </dialog>{" "}
    </div>
  );
}
