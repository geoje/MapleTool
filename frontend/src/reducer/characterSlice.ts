import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Character from "../model/character";
import { RootState } from "./store";

const characterSlice = createSlice({
  name: "character",
  initialState: new Character(),
  reducers: {
    setCharacter(state, action: PayloadAction<Character>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setCharacter } = characterSlice.actions;
export const selectCharacter = (state: RootState) => state.character;
export default characterSlice.reducer;
