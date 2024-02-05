import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, CharacterBasic, CharacterOcid } from "../model/character";
import CharacterService from "../service/character";

const characterSlice = createSlice({
  name: "character",
  initialState: <Character>{
    ocid: {},
    basic: CharacterService.loadBasic(),
  },
  reducers: {
    // Can be removed ocid. it does not need to save on store
    setCharacterOcid(state, action: PayloadAction<CharacterOcid>) {
      state.ocid = action.payload;
    },
    setCharacterBasic(state, action: PayloadAction<CharacterBasic>) {
      state.basic = action.payload;
      CharacterService.saveBasic(action.payload);
    },
  },
});

export const { setCharacterOcid, setCharacterBasic } = characterSlice.actions;
export default characterSlice.reducer;
