import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import SearchSlice from "./slices/searchSlice";
import cartSlice from "./slices/cartSlice";
import pizzaSlice from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterSlice,
    searchSlice: SearchSlice,
    cartSlice,
    pizzaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
