import React from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShareModal({ shareBook, book, setBlurr }) {
  const [calledUser, setCalledUser] = React.useState("");

  // const handlePromise = () => {
  //   const fakePromise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const isSuccess = Math.random() > 0.5;
  //       isSuccess
  //         ? resolve("Operation successful!")
  //         : reject("Operation failed!");
  //     }, 2000);
  //   });

  //   toast.promise(
  //     fakePromise,
  //     {
  //       pending: "Processing your request...",
  //       success: "Done! 👌",
  //       error: "Oops, something went wrong! 🤯",
  //     },
  //     {
  //       className: "bg-blue-600 text-white",
  //       bodyClassName: "text-sm font-semibold",
  //       progressClassName: "bg-green-500",
  //       position: "top-right",
  //       autoClose: 3000,
  //     }
  //   );
  // };

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
        <ToastContainer
          className="fixed top-0 left-0"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />

        <div
          className=" relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
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
                  try {
                    shareBook(calledUser, book);
                    toast("Note shared! ", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    });
                  } catch (err) {
                    toast("User not found !", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    });
                  }
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
