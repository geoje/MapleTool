import { QueryClient, QueryKey } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import axios from "axios";

async function queryFn({ queryKey }: { queryKey: QueryKey }) {
  return (
    await axios.get(queryKey[0] as string, { params: queryKey[1] as Object })
  ).data;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      queryFn,
    },
  },
});

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
});
