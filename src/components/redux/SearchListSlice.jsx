import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

const SearchListSlice = createSlice({
  name: "searchListDetails",
  initialState: initialState,
  reducers: {
    setSearchListFunction: (state, action) => {
      // below line removes all the elements from the array.
      state.value.splice(0, state.value.length);
      let earlierList = action.payload;
      for (let i = 0; i < earlierList.length; i++) {
        state.value.push(earlierList[i]);
      }
    },
  },
});

export const { setSearchListFunction } = SearchListSlice.actions;

export default SearchListSlice.reducer;
