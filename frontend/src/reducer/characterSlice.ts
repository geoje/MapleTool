import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Character,
  CharacterBasic,
  CharacterItemEquipment,
} from "../domain/character/character";
import CharacterService from "../service/character/character";

const characterSlice = createSlice({
  name: "character",
  initialState: <Character>{
    basic: CharacterService.loadBasic(),
    itemEquipment: CharacterService.loadItemEquipment(),
  },
  reducers: {
    setCharacterBasic(
      state,
      action: PayloadAction<CharacterBasic | undefined>
    ) {
      state.basic = action.payload;
      if (action.payload) CharacterService.saveBasic(action.payload);
    },
    setCharacterItemEquipment(
      state,
      action: PayloadAction<CharacterItemEquipment | undefined>
    ) {
      state.itemEquipment = action.payload;
      if (action.payload) CharacterService.saveItemEquipment(action.payload);
    },
  },
});

export const { setCharacterBasic } = characterSlice.actions;
export default characterSlice.reducer;
