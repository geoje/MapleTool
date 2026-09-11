import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import QueryError from "../types/query/queryError";

export const queryKey = "query";

const initialState: { error?: QueryError } = {};

const querySlice = createSlice({
  name: queryKey,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<QueryError>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
});

export const queryReducer = querySlice.reducer;
export const { setError, clearError } = querySlice.actions;
