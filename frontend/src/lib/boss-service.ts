import { BOSS, BOSS_CODE, BossDifficulty, BossType, DIFFICULTY_CODE } from "@/constants/boss";
import type { BossPlan } from "@/types";

const DIFFICULTY_ORDER = Object.keys(BossDifficulty) as BossDifficulty[];

const CODE_TO_BOSS_TYPE: Record<string, BossType> = Object.fromEntries(
  Object.entries(BOSS_CODE).map(([type, code]) => [code, type as BossType])
);
const CODE_TO_DIFFICULTY: Record<string, BossDifficulty> = Object.fromEntries(
  Object.entries(DIFFICULTY_CODE).map(([difficulty, code]) => [code, difficulty as BossDifficulty])
);

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

export function countWeeklyBoss(bossPlan: BossPlan) {
  return bossPlan.boss.filter(({ type }) => (BOSS[type].category ?? "weekly") == "weekly").length;
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

  for (const bossPlan of bossPlans) params[bossPlan.name] = convertPlanToCode(bossPlan);

  const originPath =
    window.location.origin + window.location.pathname.replace(/\/$/, "");
  const search = new URLSearchParams(params).toString();

  return originPath + "?" + search;
}

// bossCode-difficultyCode-members(.bossCode-difficultyCode-members)*
// e.g. z-e-3.m-h-2 -> Zakum Easy 3 members, Magnus Hard 2 members
function convertPlanToCode(bossPlan: BossPlan) {
  return bossPlan.boss
    .map((b) => `${BOSS_CODE[b.type]}-${DIFFICULTY_CODE[b.difficulty]}-${b.members}`)
    .join(".");
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
      const [bossCode, difficultyCode, membersRaw] = formatted.split("-");

      const type = CODE_TO_BOSS_TYPE[bossCode];
      const difficulty = CODE_TO_DIFFICULTY[difficultyCode];
      const members = Number(membersRaw);

      if (!type || !difficulty || !members) return;

      return { type, difficulty, members };
    })
    .filter((b) => b != undefined);

  return { name: key, order: "", boss };
}
