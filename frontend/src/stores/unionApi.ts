import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Basic } from "../types/union/basic";
import { persistReducer, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Artifact } from "../types/union/artifact";

const key = "union";

export const unionApi = createApi({
  reducerPath: key,
  baseQuery: fetchBaseQuery({ baseUrl: "/api/union" }),
  endpoints: (builder) => ({
    basic: builder.query<Basic, string>({
      query: (name) => `/basic?name=${name}`,
    }),
    artifact: builder.query<Artifact, string>({
      query: (name) => `/artifact?name=${name}`,
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
});

export const unionReducer = persistReducer<ReturnType<typeof unionApi.reducer>>(
  { key, storage },
  unionApi.reducer
);
export const { useBasicQuery, useArtifactQuery } = unionApi;
