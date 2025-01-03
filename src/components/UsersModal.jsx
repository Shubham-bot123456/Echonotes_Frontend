import React from "react";
import { MdOutlinePeople } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import avatarNameToImageFunction from "./AvatarImageHelper";
import { useSelector } from "react-redux";
import { IoReturnUpBackOutline } from "react-icons/io5";
export default function UserModal({ users, bookId }) {
  const loginUser = useSelector((state) => state.userdetails.value);
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
                if (user.username === loginUser) return;
                return (
                  <li
                    className="w-full py-4 px-10 my-2 rounded-md shadow-2xl text-center flex gap-5 "
                    key={user.username}
                  >
                    <div className="w-8 my-auto">
                      {avatarNameToImageFunction(user.avatar)}
                    </div>
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
