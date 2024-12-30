import React from "react";
import { RxCross1 } from "react-icons/rx";
import { MdPreview } from "react-icons/md";
export default function Preview({ description, setShowPreview }) {
  console.log("description : " + description);

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex justify-evenly z-40">
      <div className="card bg-base-100 w-[80vw] h-[70vh] shadow-2xl  m-auto relative p-3 overflow-auto">
        <section className="absolute top-5 left-5 flex gap-1">
          <MdPreview className="m-auto text-2xl"></MdPreview>
          <p>Preview</p>
        </section>
        <button>
          <RxCross1
            className="text-2xl absolute top-5 right-5 hover:scale-105"
            onClick={() => {
              setShowPreview(false);
            }}
          ></RxCross1>
        </button>
        <div className="card-body mt-5">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
