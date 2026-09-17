import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ArtifactStore {
  name: string;
  searchToken: number;
  setName: (name: string) => void;
}

export const useArtifactStore = create<ArtifactStore>()(
  persist(
    (set, get) => ({
      name: "",
      searchToken: 0,
      setName: (name) => set({ name: name.trim(), searchToken: get().searchToken + 1 }),
    }),
    { name: "maple-union-artifact-store", partialize: (state) => ({ name: state.name }) }
  )
);
