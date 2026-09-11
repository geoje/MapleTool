import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ArtifactStore {
  name: string;
  setName: (name: string) => void;
}

export const useArtifactStore = create<ArtifactStore>()(
  persist(
    (set) => ({
      name: "",
      setName: (name) => set({ name: name.trim() }),
    }),
    { name: "maple-union-artifact-store" }
  )
);
