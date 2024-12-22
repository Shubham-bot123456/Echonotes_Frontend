import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import MainComponent from "./components/MainComponent.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import Header from "./components/Header.jsx";
import { useState } from "react";
import Preview from "./components/Preview.jsx";
import AvatarChangePage from "./components/AvatarChangePage.jsx";

function App() {
  const [search, setsearch] = useState("");
  const [showSearchAndLogout, setShowSearchAndLogout] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Header
          setsearch={setsearch}
          showSearchAndLogout={showSearchAndLogout}
        />

        <div className="mt-16">
          <Routes>
            <Route
              path="/Echonotes_Frontend/main/:token"
              element={
                <MainComponent
                  search={search}
                  setShowSearchAndLogout={setShowSearchAndLogout}
                />
              }
            ></Route>
            <Route
              path="/Echonotes_Frontend/register"
              element={
                <RegisterPage setShowSearchAndLogout={setShowSearchAndLogout} />
              }
            ></Route>
            <Route
              path="/Echonotes_Frontend/login"
              element={
                <LoginPage setShowSearchAndLogout={setShowSearchAndLogout} />
              }
            ></Route>
            <Route
              path="/Echonotes_Frontend"
              element={
                <LoginPage setShowSearchAndLogout={setShowSearchAndLogout} />
              }
            ></Route>
            <Route
              path="/Echonotes_Frontend/avatar"
              element={<AvatarChangePage />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
      {/* <AvatarChangePage></AvatarChangePage> */}
    </>
  );
}

export default App;
