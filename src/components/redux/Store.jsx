import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
const Store = configureStore({
  reducer: {
    userdetails: UserSlice,
  },
});
export default Store;
