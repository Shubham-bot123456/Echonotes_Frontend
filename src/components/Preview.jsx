import React from "react";
import { RxCross1 } from "react-icons/rx";

export default function Preview({ description, setShowPreview }) {
  console.log("description : " + description);

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex justify-evenly z-40">
      <div className="card bg-base-100 w-[600px] shadow-2xl h-96 m-auto relative p-3">
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
