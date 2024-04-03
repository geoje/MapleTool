import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterItemEquipmentDetail } from "../dto/character/characterItemEquipment";

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
    spliceUserInventory(
      state: { inventory: CharacterItemEquipmentDetail[] },
      action: PayloadAction<number>
    ) {
      state.inventory.splice(action.payload, 1);
      localStorage.setItem("user:inventory", JSON.stringify(state.inventory));
    },
  },
});

export const { pushUserInventory, spliceUserInventory } = userSlice.actions;
export default userSlice.reducer;
