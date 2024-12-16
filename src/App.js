import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import MainComponent from "./components/MainComponent.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import Header from "./components/Header.jsx";
import { useState } from "react";
import Preview from "./components/Preview.jsx";

function App() {
  const [search, setsearch] = useState("");
  const [showSearchAndLogout, setShowSearchAndLogout] = useState(false);
  return (
    <>
      {/* <div className="w-full h-screen relative">
        <textarea
          placeholder="start writing here .... "
          className="w-full h-full"
        ></textarea>
        <button className=" btn bg-black text-white hover:underline absolute bottom-4 right-4 z-50 hover:bg-black">
          add
        </button>
        <button className=" btn bg-black text-white hover:underline absolute bottom-4 left-4 z-50 hover:bg-black">
          back
        </button>
      </div> */}
      <BrowserRouter>
        <Header
          setsearch={setsearch}
          showSearchAndLogout={showSearchAndLogout}
        />

        <div className="mt-16">
          <Routes>
            <Route
              path="/main/:token"
              element={
                <MainComponent
                  search={search}
                  setShowSearchAndLogout={setShowSearchAndLogout}
                />
              }
            ></Route>
            <Route
              path="/register"
              element={
                <RegisterPage setShowSearchAndLogout={setShowSearchAndLogout} />
              }
            ></Route>
            <Route
              path="/login"
              element={
                <LoginPage setShowSearchAndLogout={setShowSearchAndLogout} />
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
