import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
export default function RegisterPage({ setShowSearchAndLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowSearchAndLogout(false);
  }, []);
  const onSubmit = async () => {
    // 1. fire register req
    // call maincomponent and pass jwt token to the main component
    let jwttoken = null;

    await axios({
      url: "http://localhost:8080/generate/register",
      method: "POST",
      data: {
        username: username,
        password: password,
        role: "ADMIN",
      },
    })
      .then((response) => {
        console.log("jwt token is " + response.data);
        setError(false);
        jwttoken = response.data;
      })
      .catch((err) => {
        setError(true);
        console.log("ERROR occured" + err);
      });
    if (jwttoken != null) navigate(`/main/${jwttoken}`);
  };
  return (
    <div className="h-screen flex justify-evenly fixed top-0 left-0 w-full">
      <div className="flex m-auto border-2 rounded-md shadow-2xl">
        <section className=" flex flex-col px-8 py-12 gap-6">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              onChange={(event) => setUsername(event.target.value)}
              placeholder="username"
              className="input input-lg"
            ></input>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
              className="input input-lg"
              type="password"
            ></input>
          </label>
          {/* <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6 opacity-70 text-red-500"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              onChange={(event) => setPassword(event.target.value)}
              placeholder="user-token"
              className="input input-lg"
              type="password"
            ></input>
          </label> */}
          {/*below error tag */}
          {error ? (
            <div className="flex">
              <p className="text-red-600 text-sm">
                user already exists please login !{" "}
              </p>
              <a
                className="text-blue-600 text-sm hover:underline cursor-pointer ml-2"
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </a>
            </div>
          ) : (
            ""
          )}
        </section>
        <button
          className=" bg-gray-800 hover:underline text-white w-[100px] rounded-tr-md rounded-br-md"
          onClick={onSubmit}
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}
