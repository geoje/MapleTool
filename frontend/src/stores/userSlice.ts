import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import User from "../types/user/user";
import { createTransform } from "redux-persist";
import deepCopyWithTypeCheck from "../utils/deepCopyWithTypeCheck";

const name = "user";
const initialState: User = {
  name: "",
  history: [],
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearName: (state) => {
      state.name = "";
    },

    addHistory: (state, action: PayloadAction<string>) => {
      console.log(current(state));

      const index = state.history.indexOf(action.payload);
      if (index == -1) state.history.push(action.payload);
    },
    deleteHistory: (state, action: PayloadAction<string>) => {
      const index = state.history.indexOf(action.payload);
      if (index > -1) state.history.splice(index, 1);
    },
  },
});

export const { setName, clearName, addHistory, deleteHistory } = slice.actions;
export const userReducer = slice.reducer;
export const userTransform = createTransform(
  null,
  (state) => deepCopyWithTypeCheck(initialState, state),
  { whitelist: [name] }
);
