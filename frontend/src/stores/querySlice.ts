import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProblemDetail from "../types/query/problemDetail";

export const queryKey = "query";

const initialState: { error?: ProblemDetail } = {};

const querySlice = createSlice({
  name: queryKey,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ProblemDetail>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
});

export const queryReducer = querySlice.reducer;
export const { setError, clearError } = querySlice.actions;
