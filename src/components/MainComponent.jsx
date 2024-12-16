import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import Preview from "./Preview";

import { useDispatch } from "react-redux";
import { setUser } from "./redux/UserSlice";

const MainComponent = ({ search, setShowSearchAndLogout }) => {
  const [bookList, setBookList] = useState([]);
  const { token } = useParams();
  // preview attributes.
  const [showPreview, setShowPreview] = useState(false);
  const [previewText, setPreviewText] = useState("");
  // loading attributes.
  const [loading, setLoading] = useState(false);

  const dispatcher = useDispatch();

  useEffect(() => {
    loadBooks();
    setShowSearchAndLogout(true);
    axios({
      url: "http://localhost:8080/todo/username",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    await axios({
      url: "http://localhost:8080/todo/add",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
    loadBooks();
  };
  const loadBooks = async () => {
    setLoading(true);
    let tempArray = [];
    console.log("token : " + token);
    await axios({
      url: "http://localhost:8080/todo/get",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    setLoading(false);
    return tempArray;
  };
  const deleteUser = async (bookId) => {
    await axios({
      url: `http://localhost:8080/todo/${bookId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
      .then((res) => {
        console.log("axios response " + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("error : " + err);
      });

    loadBooks();
  };
  const updateBook = async (book) => {
    let id = book.id;
    console.log(
      "firing the update request with the payload " + JSON.stringify(book)
    );
    await axios({
      url: `http://localhost:8080/todo/${book.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
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
    loadBooks();
  };

  const searchFunction = async () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
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
                  className={`card card-compact bg-base-100 w-80  h-[120px] shadow-2xl rounded-lg  transition-all ${
                    showPreview ? "blur-sm" : "blur-none"
                  }`}
                  key={book.id}
                >
                  <div className="card-body">
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        setPreviewText(book.description);
                        setShowPreview(true);
                      }}
                    >
                      {trimDescription(book.description)}
                    </p>
                    <div className="card-actions justify-end">
                      <div className="dropdown ">
                        <div tabIndex={0} className="list-none">
                          <BsThreeDotsVertical className="text-2xl hover:scale-105"></BsThreeDotsVertical>
                        </div>
                        <ul
                          tabIndex={0}
                          className=" dropdown-content menu dropdown-end bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
                        >
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
