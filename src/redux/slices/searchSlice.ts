import { createSlice } from "@reduxjs/toolkit";

interface searchState {
  searchValue: string;
}

const initialState: searchState = {
  searchValue: "",
};

export const SearchSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});
export const { setSearchValue } = SearchSlice.actions;
export default SearchSlice.reducer;
