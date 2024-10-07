import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { setError } from "../stores/querySlice";
import ProblemDetail from "../types/query/problemDetail";
import { store } from "../stores/store";

const globalQueryErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    store.dispatch(setError(action.payload as ProblemDetail));
  }

  return next(action);
};

export default globalQueryErrorMiddleware;
