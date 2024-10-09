import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Basic } from "../types/union/basic";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const key = "union";

export const unionApi = createApi({
  reducerPath: key,
  baseQuery: fetchBaseQuery({ baseUrl: "/api/union" }),
  endpoints: (builder) => ({
    basic: builder.query<Basic, string>({
      query: (name) => `/basic?name=${name}`,
    }),
  }),
});

export const unionReducer = persistReducer<ReturnType<typeof unionApi.reducer>>(
  { key, storage },
  unionApi.reducer
);
export const { useBasicQuery } = unionApi;
