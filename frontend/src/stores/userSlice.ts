import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTransform, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import User from "../types/user/user";
import { deepCopyWithTypeCheck } from "../utils/deepCopyWithTypeCheck";
import { BOSS_DIFFICULTY, BOSS_TYPE } from "../constants/boss";
import { ItemEquipmentDetail } from "../types/character/itemEquipment/itemEquipment";
import { POTENTIAL_GRADE } from "../constants/enhance/potential";
import { MATERIAL_TYPE } from "../constants/enhance/material";
import { Material } from "../types/user/enhancedItem";
import BossPlan from "../types/user/bossPlan";

export const userKey = "user";

const initialState: User = {
  name: "",
  histories: [],
  bossPlans: [],
  inventory: [],
  guarantees: {},
};

const slice = createSlice({
  name: userKey,
  initialState,
  reducers: {
    // name
    clearName: (state) => {
      state.name = "";
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setNameAndAddHistory: (state, action: PayloadAction<string>) => {
      if (!action.payload.trim().length) return;

      state.name = action.payload;
      const index = state.histories.indexOf(action.payload);
      if (index == -1) state.histories.push(action.payload);
    },

    // history
    moveHistory: (
      state,
      action: PayloadAction<{ from: string; to: string }>
    ) => {
      const idxFrom = state.histories.indexOf(action.payload.from);
      const idxTo = state.histories.indexOf(action.payload.to);
      if (idxFrom == -1 || idxTo == -1) return;

      const [value] = state.histories.splice(idxFrom, 1);
      state.histories.splice(idxTo, 0, value);
    },
    deleteHistory: (state, action: PayloadAction<string>) => {
      const index = state.histories.indexOf(action.payload);
      if (index > -1) state.histories.splice(index, 1);
    },

    // bossPlan
    setBossPlans(state, action: PayloadAction<BossPlan[]>) {
      state.bossPlans = action.payload;
    },
    newBossPlan(state, action: PayloadAction<string>) {
      if (state.bossPlans.find((plan) => plan.name == action.payload)) return;

      state.bossPlans.push({ name: action.payload, order: "", boss: [] });
    },
    moveBossPlan(state, action: PayloadAction<{ from: string; to: string }>) {
      const idxFrom = state.bossPlans.findIndex(
        (plan) => plan.name == action.payload.from
      );
      const idxTo = state.bossPlans.findIndex(
        (plan) => plan.name == action.payload.to
      );
      if (idxFrom == -1 || idxTo == -1) return;

      const [value] = state.bossPlans.splice(idxFrom, 1);
      state.bossPlans.splice(idxTo, 0, value);
    },
    deleteBossPlan(state, action: PayloadAction<number>) {
      state.bossPlans.splice(action.payload, 1);
    },
    setBossOrder(
      state,
      action: PayloadAction<{ index: number; order: string }>
    ) {
      state.bossPlans[action.payload.index].order = action.payload.order;
    },
    setBossItems(
      state,
      action: PayloadAction<{
        index: number;
        boss: {
          type: BOSS_TYPE;
          difficulty: BOSS_DIFFICULTY;
        }[];
      }>
    ) {
      state.bossPlans[action.payload.index].boss = action.payload.boss.map(
        (item) => ({
          ...item,
          members: 1,
        })
      );
    },
    putBossItem(
      state,
      action: PayloadAction<{
        index: number;
        type: BOSS_TYPE;
        difficulty?: BOSS_DIFFICULTY;
        members?: number;
      }>
    ) {
      const plan = state.bossPlans[action.payload.index];
      const itemIndex = plan.boss.findIndex(
        (boss) => boss.type == action.payload.type
      );
      if (itemIndex >= 0) {
        if (action.payload.difficulty)
          plan.boss[itemIndex].difficulty = action.payload.difficulty;
        if (action.payload.members)
          plan.boss[itemIndex].members = action.payload.members;
        return;
      }

      if (!action.payload.difficulty) return;

      const types = Object.values(BOSS_TYPE);
      plan.boss.push({
        type: action.payload.type,
        difficulty: action.payload.difficulty,
        members: action.payload.members ?? 1,
      });
      plan.boss.sort((a, b) => types.indexOf(a.type) - types.indexOf(b.type));
    },
    removeBossItem(
      state,
      action: PayloadAction<{
        index: number;
        type: BOSS_TYPE;
      }>
    ) {
      const plan = state.bossPlans[action.payload.index];
      const itemIndex = plan.boss.findIndex(
        (boss) => boss.type == action.payload.type
      );
      if (itemIndex < 0) return;

      plan.boss.splice(itemIndex, 1);
    },

    // inventory
    newInventory(state, action: PayloadAction<ItemEquipmentDetail>) {
      state.inventory.push({
        before: action.payload,
        after: action.payload,
        used: [],
      });
    },
    deleteInventory(state, action: PayloadAction<number>) {
      state.inventory.splice(action.payload, 1);
    },
    clearInventory(state) {
      state.inventory = [];
    },
    addMaterials(
      state,
      action: PayloadAction<{ index: number; materials: Material[] }>
    ) {
      const used = state.inventory[action.payload.index].used;
      for (const material of action.payload.materials) {
        const foundUsed = used.find((u) => u.name == material.name);
        if (foundUsed) {
          foundUsed.value += material.value;
          continue;
        }

        used.push(material);
      }
    },
    deleteMaterial(
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) {
      const used = state.inventory[action.payload.index].used;
      const materialIndex = used.findIndex(
        (material) => material.name == action.payload.name
      );

      used.splice(materialIndex, 1);
    },
    clearMaterials(state, action: PayloadAction<number>) {
      state.inventory[action.payload].used = [];
    },
    setInventoryPotential(
      state,
      action: PayloadAction<{
        index: number;
        addi: boolean;
        grade: string;
        options: string[];
      }>
    ) {
      const item = state.inventory[action.payload.index].after;
      if (action.payload.addi) {
        item.additional_potential_option_grade = action.payload.grade;
        item.additional_potential_option_1 = action.payload.options[0];
        item.additional_potential_option_2 = action.payload.options[1];
        item.additional_potential_option_3 = action.payload.options[2];
        return;
      }

      item.potential_option_grade = action.payload.grade;
      item.potential_option_1 = action.payload.options[0];
      item.potential_option_2 = action.payload.options[1];
      item.potential_option_3 = action.payload.options[2];
    },

    // guarantees
    setGuarantee(
      state,
      action: PayloadAction<{
        type: MATERIAL_TYPE;
        grade: POTENTIAL_GRADE;
        value: number;
      }>
    ) {
      if (!state.guarantees[action.payload.type]) {
        state.guarantees[action.payload.type] = {
          [action.payload.grade]: action.payload.value,
        };
        return;
      }

      state.guarantees[action.payload.type]![action.payload.grade] =
        action.payload.value;
    },
  },
});

const transform = createTransform(
  null,
  (state) => deepCopyWithTypeCheck(initialState, state),
  { whitelist: [userKey] }
);
export const userReducer = persistReducer<ReturnType<typeof slice.reducer>>(
  { key: userKey, storage, transforms: [transform] },
  slice.reducer
);
export const {
  clearName,
  setName,
  setNameAndAddHistory,

  moveHistory,
  deleteHistory,

  setBossPlans,
  newBossPlan,
  moveBossPlan,
  deleteBossPlan,
  setBossOrder,
  setBossItems,
  putBossItem,
  removeBossItem,

  newInventory,
  deleteInventory,
  clearInventory,
  addMaterials,
  deleteMaterial,
  clearMaterials,
  setInventoryPotential,

  setGuarantee,
} = slice.actions;
