import React from "react";
import { RxCross1 } from "react-icons/rx";
import { MdPreview } from "react-icons/md";
export default function Preview({ description, setShowPreview }) {
  console.log("description : " + description);

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex justify-evenly z-40">
      <div className="card bg-base-100 w-[60vw] shadow-2xl h-[60vh] m-auto relative p-3 overflow-auto">
        <section className="absolute top-1 left-2 flex gap-1">
          <MdPreview className="m-auto text-2xl"></MdPreview>
          <p>Preview</p>
        </section>
        <button>
          <RxCross1
            className="text-3xl absolute top-3 right-3 hover:scale-105"
            onClick={() => {
              setShowPreview(false);
            }}
          ></RxCross1>
        </button>
        <div className="card-body">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
