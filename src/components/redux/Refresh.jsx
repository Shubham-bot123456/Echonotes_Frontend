import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 1 };

const Refresh = createSlice({
  name: "jwtdetails",
  initialState: initialState,
  reducers: {
    setRefresh: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRefresh } = Refresh.actions;

export default Refresh.reducer;
