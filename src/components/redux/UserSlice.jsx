import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "" };

const UserSlice = createSlice({
  name: "userdetails",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
