import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Basic } from "../types/character/basic";
import { ItemEquipment } from "../types/character/itemEquipment/itemEquipment";
import { persistReducer, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

const key = "character";

export const characterApi = createApi({
  reducerPath: key,
  baseQuery: fetchBaseQuery({ baseUrl: "/api/character" }),
  endpoints: (builder) => ({
    basic: builder.query<Basic, string>({
      query: (name) => `/basic?name=${name}`,
    }),
    itemEquipment: builder.query<ItemEquipment, string>({
      query: (name) => `/item-equipment?name=${name}`,
    }),
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (action.type === REHYDRATE) {
      if (action.key == reducerPath) {
        return action.payload;
      }
    }
  },
  // Wonder if it's possible to keep old data on browser
  // keepUnusedDataFor: undefined
});

export const characterReducer = persistReducer<
  ReturnType<typeof characterApi.reducer>
>({ key, storage }, characterApi.reducer);
export const { useBasicQuery, useItemEquipmentQuery } = characterApi;
