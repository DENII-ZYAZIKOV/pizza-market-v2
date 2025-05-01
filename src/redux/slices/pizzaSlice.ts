import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartSlice";
type fetchPizzasArgs = {
  categoryid: number;
  sortProperty: string;
};
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params: fetchPizzasArgs) => {
    const { categoryid, sortProperty } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://667429ec75872d0e0a955cf5.mockapi.io/items?category=${categoryid}&sortBy=${sortProperty}&order=desc`
    );
    return data;
  }
);

type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};
interface PizzaSliceState {
  items: Pizza[];
}

const initialState: PizzaSliceState = {
  items: [],
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = [];
      });
  },
});
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
