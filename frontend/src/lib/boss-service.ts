import { BOSS, BossDifficulty, BossType } from "@/constants/boss";
import type { BossPlan } from "@/types";

const FORMATION62 =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const DIFFICULTY_ORDER = Object.keys(BossDifficulty) as BossDifficulty[];

export function getPrice(bossType: BossType, difficulty: BossDifficulty) {
  return BOSS[bossType].prices[difficulty] ?? 0;
}

export function getPreviousPrice(bossType: BossType, difficulty: BossDifficulty) {
  return BOSS[bossType].previousPrices?.[difficulty] ?? getPrice(bossType, difficulty);
}

export function getMaxDifficulty(bossType: BossType): BossDifficulty {
  const prices = BOSS[bossType].prices;
  return DIFFICULTY_ORDER.filter((difficulty) => prices[difficulty] != undefined).at(-1)!;
}

export function getBossIcon(bossType: BossType): string {
  return BOSS[bossType].icon ?? "";
}

function sumRevenue(
  bossPlan: BossPlan,
  category: "weekly" | "monthly",
  priceFn: (type: BossType, difficulty: BossDifficulty) => number
) {
  return bossPlan.boss
    .filter(({ type }) => (BOSS[type].category ?? "weekly") == category)
    .map(({ type, difficulty, members }) => Math.round(priceFn(type, difficulty) / members))
    .reduce((acc, cur) => acc + cur, 0);
}

export function calculateRevenue(bossPlan: BossPlan) {
  return sumRevenue(bossPlan, "weekly", getPrice);
}

export function calculateMonthlyRevenue(bossPlan: BossPlan) {
  return sumRevenue(bossPlan, "monthly", getPrice);
}

export function calculatePreviousRevenue(bossPlan: BossPlan) {
  return sumRevenue(bossPlan, "weekly", getPreviousPrice);
}

export function calculatePreviousMonthlyRevenue(bossPlan: BossPlan) {
  return sumRevenue(bossPlan, "monthly", getPreviousPrice);
}

export interface CubeTotals {
  silver: number;
  gold: number;
}

function getCubeReward(bossType: BossType, difficulty: BossDifficulty) {
  return BOSS[bossType].cubes?.[difficulty];
}

function getPreviousCubeReward(bossType: BossType, difficulty: BossDifficulty) {
  return BOSS[bossType].previousCubes?.[difficulty] ?? getCubeReward(bossType, difficulty);
}

function sumCubes(
  bossPlan: BossPlan,
  cubeFn: (type: BossType, difficulty: BossDifficulty) => { silver?: number; gold?: number } | undefined
): CubeTotals {
  return bossPlan.boss.reduce(
    (acc, { type, difficulty }) => {
      const reward = cubeFn(type, difficulty);
      return {
        silver: acc.silver + (reward?.silver ?? 0),
        gold: acc.gold + (reward?.gold ?? 0),
      };
    },
    { silver: 0, gold: 0 }
  );
}

export function calculateCubes(bossPlan: BossPlan): CubeTotals {
  return sumCubes(bossPlan, getCubeReward);
}

export function calculatePreviousCubes(bossPlan: BossPlan): CubeTotals {
  return sumCubes(bossPlan, getPreviousCubeReward);
}

export function getMaxMembers(bossType: BossType, difficulty?: BossDifficulty) {
  return bossType == BossType.LOTUS && difficulty == BossDifficulty.EXTREME
    ? 2
    : bossType == BossType.LIMBO
    ? 3
    : 6;
}

export function convertPlansToParams(bossPlans: BossPlan[]) {
  const params: Record<string, string> = {};

  for (const bossPlan of bossPlans) params[bossPlan.name] = convertPlanToBits(bossPlan);

  const originPath =
    window.location.origin + window.location.pathname.replace(/\/$/, "");
  const search = new URLSearchParams(params).toString();

  return originPath + "?" + search;
}

// 000     000        00000
// members difficulty type
function convertPlanToBits(bossPlan: BossPlan) {
  const BOSS_TYPE_KEYS = Object.keys(BossType);
  const BOSS_DIFFICULTY_KEYS = Object.keys(BossDifficulty);

  return String(
    bossPlan.boss
      .map((b) => {
        const typeIndex = BOSS_TYPE_KEYS.indexOf(b.type);
        const difficultyIndex = BOSS_DIFFICULTY_KEYS.indexOf(b.difficulty);
        const num = typeIndex | (difficultyIndex << 5) | (b.members << 8);

        return formatNumberTo62(num);
      })
      .join(".")
  );
}

function formatNumberTo62(num: number) {
  let result = "";

  if (!num) return FORMATION62[0];

  while (num) {
    result = FORMATION62[num % FORMATION62.length] + result;
    num = Math.floor(num / FORMATION62.length);
  }

  return result;
}

export function parsePlansFromParams(searchParams: URLSearchParams) {
  const bossPlans: BossPlan[] = [];

  for (const [key, value] of searchParams) bossPlans.push(parsePlanFromParam(key, value));

  return bossPlans;
}

function parsePlanFromParam(key: string, value: string): BossPlan {
  const boss = value
    .split(".")
    .map((formatted) => {
      const num = parseNumberFrom62(formatted);
      const typeIndex = num & 31;
      const difficultyIndex = (num >> 5) & 7;
      const members = (num >> 8) & 7;

      const type = Object.keys(BossType)[typeIndex] as BossType;
      const difficulty = Object.keys(BossDifficulty)[difficultyIndex] as BossDifficulty;

      if (!type || !difficulty || !members) return;

      return { type, difficulty, members };
    })
    .filter((b) => b != undefined);

  return { name: key, order: "", boss };
}

function parseNumberFrom62(formatted: string) {
  let result = 0;

  for (let i = 0; i < formatted.length; i++) {
    const char = formatted[i];
    const index = FORMATION62.indexOf(char);
    result = result * FORMATION62.length + (index == -1 ? 0 : index);
  }

  return result;
}
