import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EnhanceStore {
  name: string;
  setName: (name: string) => void;
}

export const useEnhanceStore = create<EnhanceStore>()(
  persist(
    (set) => ({
      name: "",
      setName: (name) => set({ name: name.trim() }),
    }),
    { name: "maple-enhance-store" }
  )
);
