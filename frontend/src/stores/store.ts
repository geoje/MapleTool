import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { userKey, userReducer } from "./userSlice";
import { characterApi, characterReducer } from "./characterApi";
import globalQueryErrorMiddleware from "../middlewares/globalQueryErrorMiddleware";
import { queryKey, queryReducer } from "./querySlice";
import { unionApi, unionReducer } from "./unionApi";

const reducer = combineReducers({
  [userKey]: userReducer,
  [queryKey]: queryReducer,
  [characterApi.reducerPath]: characterReducer,
  [unionApi.reducerPath]: unionReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(globalQueryErrorMiddleware)
      .concat(characterApi.middleware)
      .concat(unionApi.middleware),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
