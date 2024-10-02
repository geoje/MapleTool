import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { userKey, userReducer } from "./userSlice";
import { characterApi, characterReducer } from "./characterApi";

const reducer = combineReducers({
  [userKey]: userReducer,
  [characterApi.reducerPath]: characterReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(characterApi.middleware),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
