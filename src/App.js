import {BrowserRouter, Routes, Route} from "react-router";
import "./App.css";
import MainComponent from "./components/MainComponent.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import Header from "./components/Header.jsx";
import {useState} from "react";
import Preview from "./components/Preview.jsx";
import AvatarChangePage from "./components/AvatarChangePage.jsx";
import backgroundImage from "./iconimages/echnotes_background image.jpg";
import doodleBackgroundImage from "./iconimages/doodlewallpaper.jpg";
import blackandwithbackground from "./iconimages/blackandwithbackground.jpg";
import somethingnewbackgrouund from "./iconimages/somethingnewbackground.jpg";
import mainbackground from "./iconimages/mainbackground.jpg";

function App() {
    const [search, setsearch] = useState("");
    const [showSearchAndLogout, setShowSearchAndLogout] = useState(false);
    return (
        <>
            <div className="overflow w-full h-full fixed top-0 left-0 bg-green-100 grid xl:grid-cols-2 grid-cols-1">
                <img src={mainbackground} className="opacity-20 "/>
                <img src={mainbackground} className="opacity-20 "/>
                <img src={mainbackground} className="opacity-20 "/>
                <img src={mainbackground} className="opacity-20 "/>
            </div>
            <BrowserRouter basename="/Echonotes_Frontend">
                <Header
                    setsearch={setsearch}
                    showSearchAndLogout={showSearchAndLogout}
                />

                <div className="mt-16">
                    <Routes>
                        <Route
                            path="/main"
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
                                <RegisterPage setShowSearchAndLogout={setShowSearchAndLogout}/>
                            }
                        ></Route>
                        <Route
                            path="/login"
                            element={
                                <LoginPage setShowSearchAndLogout={setShowSearchAndLogout}/>
                            }
                        ></Route>
                        <Route
                            path="/"
                            element={
                                <LoginPage setShowSearchAndLogout={setShowSearchAndLogout}/>
                            }
                        ></Route>
                        <Route path="/avatar" element={<AvatarChangePage/>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
            {/* <AvatarChangePage></AvatarChangePage> */}
        </>
    );

}
export default App;

