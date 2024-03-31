import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterItemEquipmentDetail } from "../domain/character/characterItemEquipment";

const userSlice = createSlice({
  name: "user",
  initialState: <{ inventory: CharacterItemEquipmentDetail[] }>{
    inventory: [],
  },
  reducers: {
    pushUserInventory(
      state,
      action: PayloadAction<CharacterItemEquipmentDetail>
    ) {
      state.inventory.push(action.payload);
      localStorage.setItem("user:inventory", JSON.stringify(state.inventory));
    },
  },
});

export const { pushUserInventory } = userSlice.actions;
export default userSlice.reducer;
