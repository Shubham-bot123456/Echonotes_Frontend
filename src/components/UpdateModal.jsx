import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
// for now using state uplifting
export default function UpdateModal({ updateBook, book }) {
  return (
    <div>
      <button
        className="hover:underline"
        onClick={() => {
          document.getElementById(`showModal${book.id}`).showModal();
          console.log(
            "inside the update button note id : " +
              book.id +
              " and the note description " +
              book.description
          );
        }}
      >
        update
      </button>
      <dialog id={`showModal${book.id}`} className="modal">
        <div className="w-full h-screen relative text-black">
          <textarea
            placeholder="start writing here .... "
            className="w-full h-full p-4"
            defaultValue={book.description}
            onChange={(event) => (book.description = event.target.value)}
          ></textarea>
          <form>
            <button>
              <IoIosAdd
                className="text-6xl absolute bottom-4 right-5"
                onClick={() => {
                  updateBook(book);
                  document.getElementById(`showModal${book.id}`);
                  console.log(
                    "value : " + book.description + " id : " + book.id
                  );
                }}
              >
                {" "}
              </IoIosAdd>
            </button>
            <button>
              <IoIosArrowRoundBack className="text-6xl absolute bottom-4 left-4"></IoIosArrowRoundBack>
            </button>
          </form>
        </div>
      </dialog>{" "}
    </div>
  );
}
