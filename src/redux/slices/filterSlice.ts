import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Sort = {
  name: string;
  sortProperty: string;
};

interface FilterSliceState {
  categoryid: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  categoryid: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
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
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryid = Number(action.payload.categoryid);
      state.sort = action.payload.sort;
    },
  },
});

export const { setCategoryid, setSort, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
