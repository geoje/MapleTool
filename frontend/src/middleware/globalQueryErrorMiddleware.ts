import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { setError } from "../stores/querySlice";
import ProblemDetail from "../types/query/problemDetail";
import { store } from "../stores/store";

const globalQueryErrorMiddleware: Middleware =
  () => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      console.log(action.payload?.data as ProblemDetail);

      store.dispatch(setError(action.payload?.data as ProblemDetail));
    }

    return next(action);
  };

export default globalQueryErrorMiddleware;
