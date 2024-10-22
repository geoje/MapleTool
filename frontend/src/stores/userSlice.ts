import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTransform, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import User from "../types/user/user";
import { deepCopyWithTypeCheck } from "../utils/deepCopyWithTypeCheck";
import { BOSS_DIFFICULTY, BOSS_TYPE } from "../constants/boss";
import { EnhancedItem } from "../types/user/enhancedItem";

export const userKey = "user";

const initialState: User = {
  name: "",
  histories: [],
  bossPlans: [],
  inventory: [],
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
    addInventory(state, action: PayloadAction<EnhancedItem>) {
      state.inventory.push(action.payload);
    },
    deleteInventory(state, action: PayloadAction<number>) {
      state.inventory.splice(action.payload, 1);
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

  newBossPlan,
  moveBossPlan,
  deleteBossPlan,
  setBossOrder,
  setBossItems,
  putBossItem,
  removeBossItem,

  addInventory,
  deleteInventory,
} = slice.actions;
