import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Character from "../model/character";
import { RootState } from "./store";

interface CharacterState {
  basic: Character;
}

const initialState: CharacterState = {
  basic: new Character(),
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacter(state, action: PayloadAction<Character>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setCharacter } = characterSlice.actions;
export default characterSlice.reducer;
