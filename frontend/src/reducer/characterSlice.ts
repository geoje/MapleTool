import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Character,
  CharacterBasic,
  CharacterItemEquipment,
} from "../domain/character";
import CharacterService from "../service/character";

const characterSlice = createSlice({
  name: "character",
  initialState: <Character>{
    basic: CharacterService.loadBasic(),
    itemEquipment: CharacterService.loadItemEquipment(),
  },
  reducers: {
    setCharacterBasic(state, action: PayloadAction<CharacterBasic>) {
      state.basic = action.payload;
      CharacterService.saveBasic(action.payload);
    },
    setCharacterItemEquipment(
      state,
      action: PayloadAction<CharacterItemEquipment>
    ) {
      state.itemEquipment = action.payload;
      CharacterService.saveItemEquipment(action.payload);
    },
  },
});

export const { setCharacterBasic } = characterSlice.actions;
export default characterSlice.reducer;
