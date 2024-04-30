import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CharacterService from "../service/character/character";
import Character from "../dto/character/character";
import { CharacterBasic } from "../dto/character/characterBasic";
import { CharacterItemEquipment } from "../dto/character/characterItemEquipment";

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
      CharacterService.saveBasic(action.payload);
    },
    setCharacterItemEquipment(
      state,
      action: PayloadAction<CharacterItemEquipment | undefined>
    ) {
      state.itemEquipment = action.payload;
      CharacterService.saveItemEquipment(action.payload);
    },
  },
});

export const { setCharacterBasic, setCharacterItemEquipment } =
  characterSlice.actions;
export default characterSlice.reducer;
