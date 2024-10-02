import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CharacterBasic } from "../types/character/characterBasic";
import { CharacterItemEquipment } from "../types/character/characterItemEquipment";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const key = "character";

export const characterApi = createApi({
  reducerPath: key,
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    basic: builder.query<CharacterBasic, string>({
      query: (name) => `/character/basic?name=${name}`,
    }),
    itemEquipment: builder.query<CharacterItemEquipment, string>({
      query: (name) => `/character/item-equipment?name=${name}`,
    }),
  }),
});

export const characterReducer = persistReducer<
  ReturnType<typeof characterApi.reducer>
>({ key, storage }, characterApi.reducer);
export const { useBasicQuery, useItemEquipmentQuery } = characterApi;
