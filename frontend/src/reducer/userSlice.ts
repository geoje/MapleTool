import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterItemEquipmentDetail } from "../dto/character/characterItemEquipment";

const KEY_INVENTORY = "user:inventory";
const KEY_SPENT = "user:spent";
const KEY_GUARANTEE = "user:guarantee";

const DEFAULT_GUARANTEE_JSON = "[[0,0,0],[0,0,0]]";

const userSlice = createSlice({
  name: "user",
  initialState: {
    inventory: <CharacterItemEquipmentDetail[]>(
      JSON.parse(localStorage.getItem(KEY_INVENTORY) ?? "[]")
    ),
    spent: <number>JSON.parse(localStorage.getItem(KEY_SPENT) ?? "0"),
    guarantee: <number[][]>(
      JSON.parse(localStorage.getItem(KEY_GUARANTEE) ?? DEFAULT_GUARANTEE_JSON)
    ),
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
    setGuarantee(
      state: { guarantee: number[][] },
      action: PayloadAction<{ value: number; i: number; j: number }>
    ) {
      state.guarantee[action.payload.i][action.payload.j] =
        action.payload.value;
      localStorage.setItem(KEY_GUARANTEE, JSON.stringify(state.guarantee));
    },
  },
});

export const {
  pushUserInventory,
  spliceUserInventory,
  addUserSpent,
  clearUserSpent,
  setGuarantee,
} = userSlice.actions;
export default userSlice.reducer;
