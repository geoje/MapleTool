import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CharacterBasic } from "../types/character/characterBasic";
import { CharacterItemEquipment } from "../types/character/characterItemEquipment";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getCharacterBasic: builder.query<CharacterBasic, string>({
      query: (name) => `/character/basic?name=${name}`,
    }),
    getCharacterItemEquipment: builder.query<CharacterItemEquipment, string>({
      query: (name) => `/character/item-equipment?name=${name}`,
    }),
  }),
});

export const { useGetCharacterBasicQuery, useGetCharacterItemEquipmentQuery } =
  api;
export const apiReducerPath = api.reducerPath;
export const apiMiddleware = api.middleware;
export const apiReducer = api.reducer;
