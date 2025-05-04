import { BOSS_DIFFICULTY, BOSS_TYPE } from "./boss";

interface bossItem {
  type: BOSS_TYPE;
  difficulty: BOSS_DIFFICULTY;
}

export const PREPARED_BOSS: {
  label: string;
  boss: bossItem[];
}[] = [
  {
    label: "스데",
    boss: [
      { type: BOSS_TYPE.ZZAKUM, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.MAGNUS, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.HILLA, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.PAPULATUS, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.PIERRE, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.VON_BON, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.CRIMSON_QUEEN, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.VELLUM, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.PINK_BEAN, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.CYGNUS, difficulty: BOSS_DIFFICULTY.NORMAL },
      { type: BOSS_TYPE.LOTUS, difficulty: BOSS_DIFFICULTY.NORMAL },
      { type: BOSS_TYPE.DAMIEN, difficulty: BOSS_DIFFICULTY.NORMAL },
    ],
  },
  {
    label: "이루윌",
    boss: [
      { type: BOSS_TYPE.ZZAKUM, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.MAGNUS, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.PAPULATUS, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.PIERRE, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.VON_BON, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.CRIMSON_QUEEN, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.VELLUM, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.LOTUS, difficulty: BOSS_DIFFICULTY.NORMAL },
      { type: BOSS_TYPE.DAMIEN, difficulty: BOSS_DIFFICULTY.NORMAL },
      {
        type: BOSS_TYPE.GUARDIAN_ANGEL_SLIME,
        difficulty: BOSS_DIFFICULTY.NORMAL,
      },
      { type: BOSS_TYPE.LUCID, difficulty: BOSS_DIFFICULTY.EASY },
      { type: BOSS_TYPE.WILL, difficulty: BOSS_DIFFICULTY.EASY },
    ],
  },
  {
    label: "노듄더",
    boss: [
      { type: BOSS_TYPE.MAGNUS, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.PAPULATUS, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.CRIMSON_QUEEN, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.VON_BON, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.VELLUM, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.LOTUS, difficulty: BOSS_DIFFICULTY.NORMAL },
      { type: BOSS_TYPE.DAMIEN, difficulty: BOSS_DIFFICULTY.NORMAL },
      {
        type: BOSS_TYPE.GUARDIAN_ANGEL_SLIME,
        difficulty: BOSS_DIFFICULTY.NORMAL,
      },
      { type: BOSS_TYPE.LUCID, difficulty: BOSS_DIFFICULTY.NORMAL },
      { type: BOSS_TYPE.WILL, difficulty: BOSS_DIFFICULTY.NORMAL },
      { type: BOSS_TYPE.GLOOM, difficulty: BOSS_DIFFICULTY.NORMAL },
      { type: BOSS_TYPE.DARKNELL, difficulty: BOSS_DIFFICULTY.NORMAL },
    ],
  },
  {
    label: "검밑솔",
    boss: [
      { type: BOSS_TYPE.MAGNUS, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.PAPULATUS, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.CRIMSON_QUEEN, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.VELLUM, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.LOTUS, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.DAMIEN, difficulty: BOSS_DIFFICULTY.HARD },
      {
        type: BOSS_TYPE.GUARDIAN_ANGEL_SLIME,
        difficulty: BOSS_DIFFICULTY.CHAOS,
      },
      { type: BOSS_TYPE.LUCID, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.WILL, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.GLOOM, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.VERUS_HILLA, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.DARKNELL, difficulty: BOSS_DIFFICULTY.HARD },
    ],
  },
  {
    label: "하세이칼",
    boss: [
      { type: BOSS_TYPE.MAGNUS, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.PAPULATUS, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.LOTUS, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.DAMIEN, difficulty: BOSS_DIFFICULTY.HARD },
      {
        type: BOSS_TYPE.GUARDIAN_ANGEL_SLIME,
        difficulty: BOSS_DIFFICULTY.CHAOS,
      },
      { type: BOSS_TYPE.LUCID, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.WILL, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.GLOOM, difficulty: BOSS_DIFFICULTY.CHAOS },
      { type: BOSS_TYPE.VERUS_HILLA, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.DARKNELL, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.CHOSEN_SEREN, difficulty: BOSS_DIFFICULTY.HARD },
      { type: BOSS_TYPE.KALOS_THE_GUARDIAN, difficulty: BOSS_DIFFICULTY.EASY },
    ],
  },
];
