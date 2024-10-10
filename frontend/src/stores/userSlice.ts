import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTransform, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import User from "../types/user/user";
import { deepCopyWithTypeCheck } from "../utils/deepCopyWithTypeCheck";
import { BOSS_DIFFICULTY, BOSS_TYPE } from "../constants/boss";

export const userKey = "user";

const initialState: User = {
  name: "",
  histories: [],
  bossPlans: [],
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
      state.bossPlans.push({ name: action.payload, order: "", boss: [] });
    },
    deleteBossPlan(state, action: PayloadAction<number>) {
      state.bossPlans.splice(action.payload, 1);
    },
    setBossOrder(
      state,
      action: PayloadAction<{ index: number; order: string }>
    ) {
      if (
        action.payload.index < 0 ||
        action.payload.index >= state.bossPlans.length
      )
        return;

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
          partyMembers: 1,
        })
      );
    },
    putBossItem(
      state,
      action: PayloadAction<{
        index: number;
        type: BOSS_TYPE;
        difficulty?: BOSS_DIFFICULTY;
        partyMembers?: number;
      }>
    ) {
      if (
        action.payload.index < 0 ||
        action.payload.index >= state.bossPlans.length
      )
        return;

      const plan = state.bossPlans[action.payload.index];
      const itemIndex = plan.boss.findIndex(
        (boss) => boss.type == action.payload.type
      );
      if (itemIndex >= 0) {
        if (action.payload.difficulty)
          plan.boss[itemIndex].difficulty = action.payload.difficulty;
        if (action.payload.partyMembers)
          plan.boss[itemIndex].partyMembers = action.payload.partyMembers;
        return;
      }

      if (!action.payload.difficulty) return;

      plan.boss.push({
        type: action.payload.type,
        difficulty: action.payload.difficulty,
        partyMembers: action.payload.partyMembers ?? 1,
      });
    },
    removeBossItem(
      state,
      action: PayloadAction<{
        index: number;
        type: BOSS_TYPE;
        difficulty: BOSS_DIFFICULTY;
      }>
    ) {
      if (
        action.payload.index < 0 ||
        action.payload.index >= state.bossPlans.length
      )
        return;

      const plan = state.bossPlans[action.payload.index];
      const itemIndex = plan.boss.findIndex(
        (boss) =>
          boss.type == action.payload.type &&
          boss.difficulty == action.payload.difficulty
      );
      if (itemIndex < 0) return;

      plan.boss.splice(itemIndex, 1);
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
  deleteBossPlan,
  setBossOrder,
  putBossItem,
  removeBossItem,
} = slice.actions;
