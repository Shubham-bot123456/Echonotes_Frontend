import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import JwtSlice from "./JwtSlice";
import Refresh from "./Refresh";

const Store = configureStore({
  reducer: {
    userdetails: UserSlice,
    jwtdetails: JwtSlice,
    refreshdetails: Refresh,
  },
});
export default Store;
