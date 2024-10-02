import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer, userTransform } from "./userSlice";
import { apiMiddleware, apiReducer, apiReducerPath } from "./characterSlice";

const reducers = combineReducers({
  user: userReducer,
  [apiReducerPath]: apiReducer,
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [userTransform],
};
const persistedReducer = persistReducer<ReturnType<typeof reducers>>(
  persistConfig,
  reducers
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiMiddleware),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
