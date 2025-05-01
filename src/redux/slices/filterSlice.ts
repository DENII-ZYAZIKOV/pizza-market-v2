import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum sortType {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}

type Sort = {
  name: string;
  sortProperty: sortType;
};

interface filterSliceState {
  categoryid: number;
  sort: Sort;
}

const initialState: filterSliceState = {
  categoryid: 0,
  sort: {
    name: "популярности",
    sortProperty: sortType.RATING,
  },
};
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryid(state, action: PayloadAction<number>) {
      state.categoryid = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      state.categoryid = Number(action.payload.categoryid);
      state.sort = action.payload.sort;
    },
  },
});
export const { setCategoryid, setSort, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
