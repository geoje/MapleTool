import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTransform, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import User from "../types/user/user";
import { deepCopyWithTypeCheck } from "../utils/deepCopyWithTypeCheck";
import BossPlan from "../types/user/bossPlan";

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
    addBossPlan(state, action: PayloadAction<BossPlan>) {
      state.bossPlans.push(action.payload);
    },
    setBossPlan(
      state,
      action: PayloadAction<{ index: number; value: BossPlan }>
    ) {
      state.bossPlans.splice(action.payload.index, 1, action.payload.value);
    },
    insertBossPlan(
      state,
      action: PayloadAction<{ index: number; value: BossPlan }>
    ) {
      state.bossPlans.splice(action.payload.index, 0, action.payload.value);
    },
    deleteBossPlan(state, action: PayloadAction<number>) {
      state.bossPlans.splice(action.payload, 1);
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
  addBossPlan,
  setBossPlan,
  insertBossPlan,
  deleteBossPlan,
} = slice.actions;
