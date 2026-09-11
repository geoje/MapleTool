import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BossDifficulty, BossType } from "@/constants/boss";
import type { BossOrder, BossPlan } from "@/types";

interface BossStore {
  bossPlans: BossPlan[];
  setBossPlans: (plans: BossPlan[]) => void;
  addBossPlan: (name: string) => void;
  moveBossPlan: (from: string, to: string) => void;
  deleteBossPlan: (index: number) => void;
  setBossOrder: (index: number, order: BossOrder) => void;
  clearBossItems: (index: number) => void;
  putBossItem: (
    index: number,
    type: BossType,
    difficulty?: BossDifficulty,
    members?: number
  ) => void;
  removeBossItem: (index: number, type: BossType) => void;
}

export const useBossStore = create<BossStore>()(
  persist(
    (set) => ({
      bossPlans: [],

      setBossPlans: (bossPlans) => set({ bossPlans }),

      addBossPlan: (name) =>
        set((state) => {
          if (!name.trim() || state.bossPlans.some((plan) => plan.name == name))
            return state;

          return {
            bossPlans: [...state.bossPlans, { name, order: "", boss: [] }],
          };
        }),

      moveBossPlan: (from, to) =>
        set((state) => {
          const idxFrom = state.bossPlans.findIndex((plan) => plan.name == from);
          const idxTo = state.bossPlans.findIndex((plan) => plan.name == to);
          if (idxFrom == -1 || idxTo == -1) return state;

          const bossPlans = [...state.bossPlans];
          const [value] = bossPlans.splice(idxFrom, 1);
          bossPlans.splice(idxTo, 0, value);

          return { bossPlans };
        }),

      deleteBossPlan: (index) =>
        set((state) => ({
          bossPlans: state.bossPlans.filter((_, i) => i != index),
        })),

      setBossOrder: (index, order) =>
        set((state) => ({
          bossPlans: state.bossPlans.map((plan, i) =>
            i == index ? { ...plan, order } : plan
          ),
        })),

      clearBossItems: (index) =>
        set((state) => ({
          bossPlans: state.bossPlans.map((plan, i) =>
            i == index ? { ...plan, boss: [] } : plan
          ),
        })),

      putBossItem: (index, type, difficulty, members) =>
        set((state) => {
          const plan = state.bossPlans[index];
          if (!plan) return state;

          const itemIndex = plan.boss.findIndex((boss) => boss.type == type);
          if (itemIndex >= 0) {
            const boss = plan.boss.map((item, i) =>
              i == itemIndex
                ? {
                    ...item,
                    difficulty: difficulty ?? item.difficulty,
                    members: members ?? item.members,
                  }
                : item
            );

            return {
              bossPlans: state.bossPlans.map((p, i) =>
                i == index ? { ...plan, boss } : p
              ),
            };
          }

          if (!difficulty) return state;

          const types = Object.values(BossType);
          const boss = [...plan.boss, { type, difficulty, members: members ?? 1 }].sort(
            (a, b) => types.indexOf(a.type) - types.indexOf(b.type)
          );

          return {
            bossPlans: state.bossPlans.map((p, i) => (i == index ? { ...plan, boss } : p)),
          };
        }),

      removeBossItem: (index, type) =>
        set((state) => {
          const plan = state.bossPlans[index];
          if (!plan) return state;

          return {
            bossPlans: state.bossPlans.map((p, i) =>
              i == index ? { ...plan, boss: plan.boss.filter((b) => b.type != type) } : p
            ),
          };
        }),
    }),
    { name: "maple-boss-store" }
  )
);
