import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "" };

const JwtSlice = createSlice({
  name: "jwtdetails",
  initialState: initialState,
  reducers: {
    setJwt: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setJwt } = JwtSlice.actions;

export default JwtSlice.reducer;
