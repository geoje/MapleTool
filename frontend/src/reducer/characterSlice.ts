import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, CharacterBasic } from "../domain/character";
import CharacterService from "../service/character";

const characterSlice = createSlice({
  name: "character",
  initialState: <Character>{
    basic: CharacterService.loadBasic(),
  },
  reducers: {
    setCharacterBasic(state, action: PayloadAction<CharacterBasic>) {
      state.basic = action.payload;
      CharacterService.saveBasic(action.payload);
    },
  },
});

export const { setCharacterBasic } = characterSlice.actions;
export default characterSlice.reducer;
