import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiTimer } from "react-icons/ci";

import { BsThreeDotsVertical } from "react-icons/bs";
import Preview from "./Preview";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/UserSlice";
import { setJwt } from "./redux/JwtSlice";

import { setRefresh } from "./redux/Refresh";
import Cookies from "universal-cookie";

const MainComponent = ({ search, setShowSearchAndLogout }) => {
  const [bookList, setBookList] = useState([]);
  // preview attributes.
  const [showPreview, setShowPreview] = useState(false);
  const [previewText, setPreviewText] = useState("");
  // loading attributes.
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatcher = useDispatch();
  let refresh = useSelector((state) => state.refreshdetails.value);
  let jwttoken = useSelector((state) => state.jwtdetails.value);
  const cookie = new Cookies();

  useEffect(() => {
    loadBooks();
    setShowSearchAndLogout(true);
    axios({
      url: "https://estimated-corrianne-echonotes-5e2e8076.koyeb.app/todo/username",
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.get("authorization")}`,
      },
    })
      .then((res) => {
        console.log("username is " + JSON.stringify(res.data));
        dispatcher(setUser(res.data));
      })
      .catch((err) => {
        console.log("error : " + err);
        setBookList([]);
      });
  }, []);

  useEffect(() => {
    searchFunction();
  }, [search]);

  const addBook = async (id, description) => {
    setLoading(true);
    await axios({
      url: "https://estimated-corrianne-echonotes-5e2e8076.koyeb.app/todo/add",
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie.get("authorization")}`,
      },
      data: {
        id: id,
        description: description,
      },
    })
      .then((res) => {
        console.log("axios response adding" + res.data);
      })
      .catch((err) => {
        console.log("error : " + err);
      });

    await loadBooks();
    navigate(`/main`);
    setLoading(false);
  };
  const loadBooks = async () => {
    let tempArray = [];
    console.log("token : " + cookie.get("authorization"));
    await axios({
      url: "https://estimated-corrianne-echonotes-5e2e8076.koyeb.app/todo/get",
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie.get("authorization")}`,
      },
    })
      .then((res) => {
        console.log("axios response " + JSON.stringify(res.data));
        tempArray = res.data.sort((a, b) => a.id - b.id);
        setBookList(tempArray);
        console.log("the list after sorting is " + JSON.stringify(bookList));
      })
      .catch((err) => {
        console.log("error : " + err);
        setBookList([]);
      });

    dispatcher(setRefresh(refresh + 1));
    dispatcher(setJwt(cookie.get("authorization")));
    return tempArray;
  };
  const deleteUser = async (bookId) => {
    setLoading(true);
    await axios({
      url: `https://estimated-corrianne-echonotes-5e2e8076.koyeb.app/todo/${bookId}`,
      headers: {
        Authorization: `Bearer ${cookie.get("authorization")}`,
      },
      method: "DELETE",
    })
      .then((res) => {
        console.log("axios response " + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("error : " + err);
      });

    await loadBooks();
    setLoading(false);
  };
  const updateBook = async (book) => {
    setLoading(true);
    let id = book.id;
    console.log(
      "firing the update request with the payload " + JSON.stringify(book)
    );
    await axios({
      url: `https://estimated-corrianne-echonotes-5e2e8076.koyeb.app/todo/${book.id}`,
      headers: {
        Authorization: `Bearer ${cookie.get("authorization")}`,
      },
      method: "PUT",
      data: book,
    })
      .then((res) => {
        console.log("axios response from update " + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("error : " + err);
      });
    await loadBooks();
    setLoading(false);
  };

  const searchFunction = async () => {
    // setLoading(true);
    console.log("running search function");
    let tempArray = await loadBooks();
    console.log(
      "sorted array in search function initially is : " +
        JSON.stringify(bookList)
    );
    if (search == null || search === "") return;
    let filteredArray = new Array();
    tempArray.map((i) => {
      if (i.description.includes(search)) {
        filteredArray.push(i);
      }
    });
    console.log("filtered array is : " + JSON.stringify(filteredArray));
    setBookList(filteredArray);
    console.log("came here !");
    // setLoading(false);
  };

  const trimDescription = (description) => {
    if (description.length <= 20) return description;
    return description.substring(0, 21) + " .... ";
  };

  return (
    <div>
      {loading ? (
        //loading html will come here !
        <span className="fixed top-[50%] left-[50%] loading loading-spinner loading-lg mx-auto"></span>
      ) : (
        <div className="flex justify-evenly">
          <AddModal addBook={addBook}></AddModal>
          {bookList.length == 0 ? (
            <p className="m-auto">
              You have no notes ! Please create one by tapping add !
            </p>
          ) : (
            <div className="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {/* <table className="table table-zebra w-[80%] mx-auto ">
            <thead>
              <tr className="text-black text-sm">
                <th>note description</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((book) => {
                return (
                  <tr key={book.id}>
                    <td>{trimDescription(book.description)} </td>
                    <td>
                      <details className="dropdown">
                        <summary className="hover:underline cursor-pointer">
                          options
                        </summary>
                        <ul className="menu dropdown-content dropdown-end bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                          <li>
                            <button
                              className=" hover:underline hover:bg-black hover:text-white
                  "
                              onClick={() => deleteUser(book.id)}
                            >
                              delete
                            </button>
                          </li>
                          <li className="hover:bg-black hover:text-white rounded-sm">
                            <UpdateModal
                              updateBook={updateBook}
                              book={book}
                            ></UpdateModal>
                          </li>
                        </ul>
                      </details>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
              {showPreview ? (
                <Preview
                  description={previewText}
                  setShowPreview={setShowPreview}
                ></Preview>
              ) : (
                ""
              )}

              {bookList.map((book) => (
                <div
                  id="card"
                  className={`card card-compact bg-base-100 w-60 md:w-80  h-[120px] shadow-2xl rounded-lg  transition-all ${
                    showPreview ? "blur-sm" : "blur-none"
                  }`}
                  onClick={() => {
                    setPreviewText(book.description);
                    setShowPreview(true);
                  }}
                  key={book.id}
                >
                  <div className="card-body ">
                    <p className="cursor-pointer">
                      {trimDescription(book.description)}
                    </p>
                    <div className="card-actions justify-end">
                      {/* created on updated on time  */}
                      <section className="flex gap-1 absolute bottom-2 left-2">
                        <CiTimer className="text-sm text-slate-800" />
                        <p className="text-xs text-slate-500">
                          {book.lastUpdatedOn != null
                            ? new Date(book.lastUpdatedOn).toDateString()
                            : ""}
                        </p>
                      </section>
                      <div className="dropdown ">
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
                          className=" dropdown-content menu dropdown-end bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
                        >
                          <li>
                            <button
                              className=" hover:underline hover:bg-black hover:text-white
                  "
                              onClick={(e) => {
                                deleteUser(book.id);
                                e.stopPropagation();
                              }}
                            >
                              delete
                            </button>
                          </li>
                          <li className="hover:bg-black hover:text-white rounded-sm">
                            <UpdateModal
                              updateBook={updateBook}
                              book={book}
                            ></UpdateModal>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* <CiSquarePlus className="text-7xl absolute bottom-2 right-2 hover:scale-105" /> */}
          {/* <input
        className="input input-md"
        placeholder="search"
        onChange={(event) => setsearchtext(event.target.value)}
      ></input>
      <button onClick={() => searchFunction()}>search</button> */}
        </div>
      )}{" "}
    </div>
  );
};

export default MainComponent;
