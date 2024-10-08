import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { setError } from "../stores/querySlice";
import { store } from "../stores/store";
import QueryError from "../types/query/queryError";

const globalQueryErrorMiddleware: Middleware =
  () => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      store.dispatch(setError(action.payload as QueryError));
    }

    return next(action);
  };

export default globalQueryErrorMiddleware;
