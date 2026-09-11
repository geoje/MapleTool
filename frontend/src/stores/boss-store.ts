import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BossDifficulty, BossType } from "@/constants/boss";
import { capBossPlans } from "@/lib/boss-service";
import type { BossOrder, BossPlan } from "@/types";

interface BossStore {
  bossPlans: BossPlan[];
  setBossPlans: (plans: BossPlan[]) => void;
  addBossPlan: (name: string) => void;
  renameBossPlan: (index: number, name: string) => void;
  duplicateBossPlan: (index: number) => void;
  moveBossPlan: (from: number, to: number) => void;
  deleteBossPlan: (index: number) => void;
  setBossOrder: (index: number, order: BossOrder) => void;
  clearBossItems: (index: number) => void;
  putBossItem: (
    index: number,
    type: BossType,
    difficulty?: BossDifficulty,
    members?: number,
    complete_flag?: boolean
  ) => void;
  removeBossItem: (index: number, type: BossType) => void;
}

export const useBossStore = create<BossStore>()(
  persist(
    (set) => ({
      bossPlans: [],

      setBossPlans: (bossPlans) => set({ bossPlans: capBossPlans(bossPlans) }),

      addBossPlan: (name) =>
        set((state) => {
          if (!name.trim()) return state;

          return {
            bossPlans: [...state.bossPlans, { name, order: "", boss: [] }],
          };
        }),

      renameBossPlan: (index, name) =>
        set((state) => {
          if (!name.trim()) return state;

          return {
            bossPlans: state.bossPlans.map((plan, i) =>
              i == index ? { ...plan, name: name.trim() } : plan
            ),
          };
        }),

      duplicateBossPlan: (index) =>
        set((state) => {
          const plan = state.bossPlans[index];
          if (!plan) return state;

          const bossPlans = [...state.bossPlans];
          bossPlans.splice(index + 1, 0, { ...plan, boss: plan.boss.map((item) => ({ ...item })) });

          return { bossPlans };
        }),

      moveBossPlan: (from, to) =>
        set((state) => {
          if (from < 0 || from >= state.bossPlans.length || to < 0 || to >= state.bossPlans.length)
            return state;

          const bossPlans = [...state.bossPlans];
          const [value] = bossPlans.splice(from, 1);
          bossPlans.splice(to, 0, value);

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

      putBossItem: (index, type, difficulty, members, complete_flag) =>
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
                    complete_flag: complete_flag ?? item.complete_flag,
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
          const boss = [...plan.boss, { type, difficulty, members: members ?? 1, complete_flag }].sort(
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
    {
      name: "maple-boss-store",
      onRehydrateStorage: () => (state) => {
        if (state) state.bossPlans = capBossPlans(state.bossPlans);
      },
    }
  )
);
