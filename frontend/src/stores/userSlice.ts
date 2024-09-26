import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterItemEquipmentDetail } from "../types/character/characterItemEquipment";
import BossPlan from "../types/user/crystal/bossPlan";

const KEY_INVENTORY = "user:inventory";
const KEY_SPENT = "user:spent";
const KEY_GUARANTEE = "user:guarantee";
const KEY_BOSS_PLAN = "user:boss-plan";

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
    bossPlan: <BossPlan[]>(
      JSON.parse(localStorage.getItem(KEY_BOSS_PLAN) ?? "[]")
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
    setUserInventoryPotentials(
      state,
      action: PayloadAction<{ index: number; grade: string; values: string[] }>
    ) {
      const item = state.inventory[action.payload.index];
      item.potential_option_grade = action.payload.grade;
      item.potential_option_1 = action.payload.values[0];
      item.potential_option_2 = action.payload.values[1];
      item.potential_option_3 = action.payload.values[2];
      localStorage.setItem(KEY_INVENTORY, JSON.stringify(state.inventory));
    },
    setUserInventoryAdditionalPotentials(
      state,
      action: PayloadAction<{ index: number; grade: string; values: string[] }>
    ) {
      const item = state.inventory[action.payload.index];
      item.additional_potential_option_grade = action.payload.grade;
      item.additional_potential_option_1 = action.payload.values[0];
      item.additional_potential_option_2 = action.payload.values[1];
      item.additional_potential_option_3 = action.payload.values[2];
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

    setUserGuarantee(
      state: { guarantee: number[][] },
      action: PayloadAction<{ value: number; i: number; j: number }>
    ) {
      state.guarantee[action.payload.i][action.payload.j] =
        action.payload.value;
      localStorage.setItem(KEY_GUARANTEE, JSON.stringify(state.guarantee));
    },

    addUserBossPlan(state, action: PayloadAction<BossPlan>) {
      state.bossPlan.push(action.payload);
      localStorage.setItem(KEY_BOSS_PLAN, JSON.stringify(state.bossPlan));
    },
    setUserBossPlan(
      state,
      action: PayloadAction<{ index: number; value: BossPlan }>
    ) {
      state.bossPlan.splice(action.payload.index, 1, action.payload.value);
      localStorage.setItem(KEY_BOSS_PLAN, JSON.stringify(state.bossPlan));
    },
    insertUserBossPlan(
      state,
      action: PayloadAction<{ index: number; value: BossPlan }>
    ) {
      state.bossPlan.splice(action.payload.index, 0, action.payload.value);
      localStorage.setItem(KEY_BOSS_PLAN, JSON.stringify(state.bossPlan));
    },
    deleteUserBossPlan(state, action: PayloadAction<number>) {
      state.bossPlan.splice(action.payload, 1);
      localStorage.setItem(KEY_BOSS_PLAN, JSON.stringify(state.bossPlan));
    },
  },
});

export const {
  pushUserInventory,
  spliceUserInventory,
  setUserInventoryPotentials,
  setUserInventoryAdditionalPotentials,

  addUserSpent,
  clearUserSpent,

  setUserGuarantee,

  addUserBossPlan,
  setUserBossPlan,
  insertUserBossPlan,
  deleteUserBossPlan,
} = userSlice.actions;
export default userSlice.reducer;
