import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterItemEquipmentDetail } from "../dto/character/characterItemEquipment";

const KEY_INVENTORY = "user:inventory";
const KEY_SPENT = "user:spent";

const userSlice = createSlice({
  name: "user",
  initialState: {
    inventory: <CharacterItemEquipmentDetail[]>(
      JSON.parse(localStorage.getItem(KEY_INVENTORY) ?? "[]")
    ),
    spent: <number>JSON.parse(localStorage.getItem(KEY_SPENT) ?? "0"),
  },
  reducers: {
    pushUserInventory(
      state,
      action: PayloadAction<CharacterItemEquipmentDetail>
    ) {
      state.inventory.push(action.payload);
      localStorage.setItem(KEY_INVENTORY, JSON.stringify(state.inventory));
    },
    spliceUserInventory(
      state: { inventory: CharacterItemEquipmentDetail[] },
      action: PayloadAction<number>
    ) {
      state.inventory.splice(action.payload, 1);
      localStorage.setItem(KEY_INVENTORY, JSON.stringify(state.inventory));
    },
    addUserSpent(state, action: PayloadAction<number>) {
      state.spent += action.payload;
      localStorage.setItem(KEY_SPENT, JSON.stringify(state.spent));
    },
    clearUserSpent(state) {
      state.spent = 0;
      localStorage.removeItem(KEY_SPENT);
    },
  },
});

export const {
  pushUserInventory,
  spliceUserInventory,
  addUserSpent,
  clearUserSpent,
} = userSlice.actions;
export default userSlice.reducer;
