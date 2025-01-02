import React from "react";
import { MdOutlinePeople } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
export default function UserModal({ users, bookId }) {
  return (
    <div>
      <MdOutlinePeople
        className="absolute top-4 right-4 text-xl hover:scale-105"
        onClick={(e) => {
          console.log(
            "inside the people button and the users to display are " + users
          );
          console.log("inside the people button and the book id is " + bookId);
          e.stopPropagation();
          document.getElementById(`user_modal${bookId}`).showModal();
        }}
      />
      <dialog id={`user_modal${bookId}`} className="modal ">
        <div
          className="modal-box w-[60vw] h-[40vh] scroll-auto rounded-md "
          onClick={(e) => e.stopPropagation()}
        >
          <section className="flex gap-2">
            <MdOutlinePeople className="text-2xl my-auto"></MdOutlinePeople>
            <h1 className="Shared with:  text-md ">Shared with : </h1>
          </section>
          <section>
            <ul onClick={(e) => e.stopPropagation()} className="my-4">
              {users.map((user) => {
                return (
                  <li
                    className="w-full   p-4 my-2 rounded-md shadow-2xl text-center flex gap-4 "
                    key={user.username}
                  >
                    <CgProfile className="my-auto text-xl"></CgProfile>
                    <p className="text-md">{user.username}</p>
                  </li>
                );
              })}
            </ul>
          </section>

          <RxCross1
            className=" absolute top-6 right-5 text-2xl hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById(`user_modal${bookId}`).close();
            }}
          ></RxCross1>
        </div>
      </dialog>
    </div>
  );
}
