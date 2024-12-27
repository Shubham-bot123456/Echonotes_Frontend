import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import JwtSlice from "./JwtSlice";
import Refresh from "./Refresh";
import SearchListSlice from "./SearchListSlice";
const Store = configureStore({
  reducer: {
    userdetails: UserSlice,
    jwtdetails: JwtSlice,
    refreshdetails: Refresh,
    searchListDetails: SearchListSlice,
  },
});
export default Store;
