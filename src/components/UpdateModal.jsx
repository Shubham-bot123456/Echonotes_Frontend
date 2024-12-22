import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import Dock from "./Dock.jsx";
// for now using state uplifting
export default function UpdateModal({ updateBook, book }) {
  return (
    <div>
      <button
        className="hover:underline"
        onClick={(e) => {
          e.stopPropagation();
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
          <Dock type="update" updateBook={updateBook} book={book} />{" "}
        </div>
      </dialog>{" "}
    </div>
  );
}
