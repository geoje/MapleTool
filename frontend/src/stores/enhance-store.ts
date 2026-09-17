import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EnhanceStore {
  name: string;
  searchToken: number;
  setName: (name: string) => void;
}

export const useEnhanceStore = create<EnhanceStore>()(
  persist(
    (set, get) => ({
      name: "",
      searchToken: 0,
      setName: (name) => set({ name: name.trim(), searchToken: get().searchToken + 1 }),
    }),
    { name: "maple-enhance-store", partialize: (state) => ({ name: state.name }) }
  )
);
