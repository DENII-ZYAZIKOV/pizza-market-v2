import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "./cartSlice";

export interface Pizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
  sizes: number[];
  types: number[];
}

export interface ApiResponse {
  data: Pizza[];
}

type FetchPizzasArgs = {
  categoryid: number;
  sortProperty: string;
  page?: number;
  limit?: number;
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params: FetchPizzasArgs) => {
    const { categoryid, sortProperty, page = 1, limit = 8 } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://667429ec75872d0e0a955cf5.mockapi.io/items?category=${categoryid}&sortBy=${sortProperty}&order=desc&page=${page}&limit=${limit}`
    );
    return { data, page, limit };
  }
);

interface PizzaSliceState {
  items: Pizza[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
}

const initialState: PizzaSliceState = {
  items: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  itemsPerPage: 8,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data;
        state.currentPage = action.payload.page;
        state.itemsPerPage = action.payload.limit;

        // Более реалистичная оценка общего количества
        // Если получили полную страницу, предполагаем что есть еще данные
        if (action.payload.data.length === action.payload.limit) {
          // Предполагаем что есть еще страницы
          state.totalCount = action.payload.page * action.payload.limit + 10; // Примерная оценка
        } else {
          // Это последняя страница
          state.totalCount =
            (action.payload.page - 1) * action.payload.limit +
            action.payload.data.length;
        }

        state.totalPages = Math.ceil(state.totalCount / state.itemsPerPage);

        // Минимум 1 страница
        if (state.totalPages < 1) {
          state.totalPages = 1;
        }
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Произошла ошибка при загрузке пицц";
        state.items = [];
      });
  },
});

export const { setItems, setCurrentPage } = pizzaSlice.actions;
export default pizzaSlice.reducer;
