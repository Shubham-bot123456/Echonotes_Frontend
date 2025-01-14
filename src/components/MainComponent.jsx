import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {CiTimer} from "react-icons/ci";
import ShareModal from "./ShareModal";
import {BsThreeDotsVertical} from "react-icons/bs";
import Preview from "./Preview";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./redux/UserSlice";
import {setJwt} from "./redux/JwtSlice";
import {MdDeleteOutline} from "react-icons/md";
import {AnimatePresence, motion} from "motion/react";

import {setRefresh} from "./redux/Refresh";
import Cookies from "universal-cookie";
import UserModal from "./UsersModal";
import {jwtDecode} from "jwt-decode";

const MainComponent = ({search, setShowSearchAndLogout}) => {
    const [bookList, setBookList] = useState([]);
    const [actionList, setActionList] = useState([]);
    // preview attributes.
    const [showPreview, setShowPreview] = useState(false);
    const [previewText, setPreviewText] = useState("");
    // loading attributes.
    const [loading, setLoading] = useState(false);

    const [blurr, setBlurr] = useState(false);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate();
    let searchList = useSelector((state) => state.searchListDetails.value);

    const dispatcher = useDispatch();
    let refresh = useSelector((state) => state.refreshdetails.value);
    let jwttoken = useSelector((state) => state.jwtdetails.value);
    const cookie = new Cookies();

    useEffect(() => {
        //loadBooks();
        setShowSearchAndLogout(true);
        let user = jwtDecode(cookie.get("authorization"));
        dispatcher(setUser(user.sub));
    }, []);

    const addBook = async (description) => {
        let prevTime = Date.now();
        setLoading(true);
        await axios({
            url: `${backendUrl}/todo/add`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${cookie.get("authorization")}`,
            },
            data: {
                description: description,
            },
        })
            .then((res) => {
                console.log("axios response adding" + res.data);
                let dummyId = Math.random();
                bookList.push({
                    id: dummyId,
                    description: description,
                });
                actionList.push(dummyId);
            })
            .catch((err) => {
                console.log("error : " + err);
            });

        loadBooks();
        navigate(`/main`);
        setLoading(false);
        console.log(
            "the time taken to add new note is : " + (Date.now() - prevTime)
        );
    };

    const loadBooks = async () => {
        let prevTime = Date.now();
        let tempArray = [];
        await axios({
            url: `${backendUrl}/todo/get`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${cookie.get("authorization")}`,
            },
        })
            .then((res) => {
                tempArray = res.data.sort((a, b) => a.id - b.id);
                setBookList(tempArray);
                setActionList([]);
            })
            .catch((err) => {
                console.log("error : " + err);
                setBookList([]);
            });

        // dispatcher(setRefresh(refresh + 1));
        dispatcher(setJwt(cookie.get("authorization")));
        console.log("the time taken to load users : " + (Date.now() - prevTime));
        return tempArray;
    };
    const deleteUser = async (bookId) => {
        let prevTime = Date.now();
        let temp = JSON.parse(JSON.stringify(actionList));
        temp.push(bookId);
        setActionList(temp);
        await axios({
            url: `${backendUrl}/todo/${bookId}`,
            headers: {
                Authorization: `Bearer ${cookie.get("authorization")}`,
            },
            method: "DELETE",
        })
            .then((res) => {
                console.log("deleted the note with id : " + bookId);
            })
            .catch((err) => {
                console.log("error : " + err);
            });

        loadBooks();
        console.log("delete action time : " + (Date.now() - prevTime));
    };

    const updateBook = async (book) => {
        setLoading(true);
        await axios({
            url: `${backendUrl}/todo/${book.id}`,
            headers: {
                Authorization: `Bearer ${cookie.get("authorization")}`,
            },
            method: "PUT",
            data: book,
        })
            .then((res) => {
                console.log("axios response from update " + JSON.stringify(res.data));
                actionList.push(book.id);
            })
            .catch((err) => {
                console.log("error : " + err);
            });
        setLoading(false);
        loadBooks();
    };

    const shareBook = async (calledUser, book) => {
        if (calledUser === "") {
            return;
        }
        actionList.push(book.id);
        await axios({
            url: `${backendUrl}/todo/share-book`,
            headers: {
                Authorization: `Bearer ${cookie.get("authorization")}`,
            },
            method: "PUT",
            data: {calledUser: calledUser, sharableTodo: book},
        })
            .then((res) => {
                console.log("axios response from share " + JSON.stringify(res.data));
            })
            .catch((err) => {
                console.log("error : " + err);
                throw err;
            });
        loadBooks();
    };

    useEffect(() => {
        (async () => {
            let prevTime = Date.now();
            setLoading(true);
            let tempArray = await loadBooks();

            if (searchList.length === 0) {
                setLoading(false);
                return;
            }

            searchList.map((item) => {
                let filteredArray = new Array();
                tempArray.map((i) => {
                    if (i.description.toLowerCase().includes(item.toLowerCase())) {
                        filteredArray.push(i);
                    }
                });
                tempArray = filteredArray;
            });

            setBookList(tempArray);
            setLoading(false);
            console.log(
                "finished the execution of init method and total time it took is " +
                (Date.now() - prevTime)
            );
        })();
    }, [searchList]);

    const trimDescription = (description) => {
        if (description.length <= 20) return description;
        return description.substring(0, 21) + " .... ";
    };


    return (
        <div>
            <AnimatePresence>
                {loading ? (
                    //loading html will come here !
                    //   <span className="fixed top-[50%] left-[50%] loading loading-spinner loading-lg mx-auto"></span>
                    <div className="fixed top-0 left-0 w-full h-screen flex justify-evenly">
                        <motion.div
                            initial={{
                                scale: 0.2,
                                opacity: 0,
                                translateY: 200,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                translateY: 0,
                            }}
                            exit={{
                                scale: 1.5,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                            }}
                            className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 py-20 md:px-20 px-16"
                        >
                            <div className="skeleton h-28 w-full rounded-lg"></div>
                            <div className="skeleton h-28 w-full rounded-lg"></div>
                            <div className="skeleton h-28 w-full rounded-lg"></div>
                            <div className="skeleton h-28 w-full rounded-lg"></div>
                            <div className="skeleton h-28 w-full rounded-lg"></div>
                            <div className="skeleton h-28 w-full rounded-lg"></div>
                        </motion.div>
                    </div>
                ) : (
                    <div className="flex justify-evenly">
                        <AddModal addBook={addBook}></AddModal>
                        {bookList.length == 0 ? (
                            <p className="m-auto">
                                You have no notes ! Please create one by tapping add !
                            </p>
                        ) : (
                            <div
                                className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 bg-green-500`">
                                {showPreview ? (
                                    <Preview
                                        description={previewText}
                                        setShowPreview={setShowPreview}
                                    ></Preview>
                                ) : (
                                    ""
                                )}

                                {bookList.map((book, index) => {
                                    return (
                                        // will animate the card

                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.4,
                                                translateY: 200,
                                            }}
                                            animate={{
                                                opacity: [0, 0.2, 0.4, 0.6, 0.8, 1],
                                                scale: [0, 0.2, 0.4, 0.6, 0.8, 1],
                                                translateY: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0,
                                                translateY: 200,
                                            }}
                                            transition={{
                                                delay: `${index / 5}`,
                                                duration: 0.4,
                                                type: "tween",
                                                ease: "easeInOut",
                                            }}
                                            id="card"
                                            className={`relative card card-compact bg-base-100 w-[80vw] md:w-[40vw] lg:w-[30vw] xl:w-[22vw]  h-[120px] shadow-2xl rounded-lg  transition-all ${
                                                showPreview ? "blur-sm" : "blur-none"
                                            } ${blurr ? "blur-sm" : "blur-none"}
                      ${
                                                actionList.includes(book.id) ? "blur-sm" : "blur-none"
                                            }`}
                                            onClick={() => {
                                                setPreviewText(book.description);
                                                setShowPreview(true);
                                            }}
                                            key={book.id}
                                        >
                                            {actionList.includes(book.id) ?
                                                <div
                                                    className="w-full h-full flex justify-evenly absolute top-0 left-0">
                                                    <span
                                                        className="m-auto loading loading-ring loading-lg blur-0"></span>
                                                </div> : ""}

                                            {
                                                book.users != null && book.users.length > 1 ? (
                                                    <UserModal
                                                        users={book.users}
                                                        bookId={book.id}
                                                    ></UserModal>
                                                ) : (
                                                    ""
                                                )
                                            }

                                            <div className="card-body ">
                                                <p className="cursor-pointer">
                                                    {trimDescription(book.description)}
                                                </p>
                                                <div className="card-actions justify-end">
                                                    {/* created on updated on time  */}
                                                    <section className="flex gap-1 absolute bottom-2 left-2">
                                                        <CiTimer className="text-sm text-slate-800"/>
                                                        <p className="text-xs text-slate-500">
                                                            {book.lastUpdatedOn != null
                                                                ? new Date(book.lastUpdatedOn).toDateString()
                                                                : ""}
                                                        </p>
                                                    </section>
                                                    <div className="dropdown dropdown-end">
                                                        <div tabIndex={0} className="list-none">
                                                            <BsThreeDotsVertical
                                                                className="text-2xl hover:scale-105"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                }}
                                                            ></BsThreeDotsVertical>
                                                        </div>
                                                        <ul
                                                            tabIndex={0}
                                                            className=" dropdown-content menu dropdown-end bg-base-100 rounded-lg z-[1] w-25 p-2 shadow-2xl "
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <li>
                                                                <div>
                                                                    <MdDeleteOutline
                                                                        className="text-black text-lg"
                                                                        onClick={(e) => {
                                                                            deleteUser(book.id);
                                                                            e.stopPropagation();
                                                                        }}
                                                                    >
                                                                        delete
                                                                    </MdDeleteOutline>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <UpdateModal
                                                                    updateBook={updateBook}
                                                                    book={book}
                                                                ></UpdateModal>
                                                            </li>
                                                            <li>
                                                                <ShareModal
                                                                    shareBook={shareBook}
                                                                    book={book}
                                                                    setBlurr={setBlurr}
                                                                ></ShareModal>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                        ;
                                })}
                            </div>
                        )}
                    </div>
                )}{" "}
            </AnimatePresence>
        </div>
    );
};

export default MainComponent;
