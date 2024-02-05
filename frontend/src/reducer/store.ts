import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./characterSlice";

export const store = configureStore({
  reducer: {
    character: characterSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
