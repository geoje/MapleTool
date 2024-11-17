import { BOSS, BOSS_DIFFICULTY, BOSS_TYPE } from "../constants/boss";
import BossPlan from "../types/user/bossPlan";

export function getPrice(bossType: BOSS_TYPE, difficulty: BOSS_DIFFICULTY) {
  return BOSS[bossType].prices[difficulty] ?? 0;
}
export function getBossIcon(bossType: BOSS_TYPE): string {
  return BOSS[bossType].icon ?? "";
}
export function calculateRevenue(bossPlan: BossPlan) {
  return bossPlan.boss
    .map(({ type, difficulty, members: partyMembers }) =>
      Math.round(getPrice(type, difficulty) / partyMembers)
    )
    .reduce((acc, cur) => acc + cur, 0);
}
export function getMaxMembers(
  bossType: BOSS_TYPE,
  difficulty?: BOSS_DIFFICULTY
) {
  return bossType == BOSS_TYPE.LOTUS && difficulty == BOSS_DIFFICULTY.EXTREME
    ? 2
    : bossType == BOSS_TYPE.LIMBO
    ? 3
    : 6;
}

export function convertPlansToParams(bossPlans: BossPlan[]) {
  const params: Record<string, string> = {};

  for (const bossPlan of bossPlans)
    params[bossPlan.name] = convertPlanToBits(bossPlan);

  const originPath =
    window.location.origin + window.location.pathname.replace(/\/$/, "");
  const search = new URLSearchParams(params).toString();

  return originPath + "?" + search;
}
function convertPlanToBits(bossPlan: BossPlan) {
  const BOSS_TYPE_KEYS = Object.keys(BOSS_TYPE);
  const BOSS_DIFFICULTY_KEYS = Object.keys(BOSS_DIFFICULTY);

  return String(
    bossPlan.boss
      .map((b) => {
        const typeIndex = BOSS_TYPE_KEYS.indexOf(b.type);
        const difficultyIndex = BOSS_DIFFICULTY_KEYS.indexOf(b.difficulty);

        return `${typeIndex}.${difficultyIndex}.${b.members}`;
      })
      .join("-")
  );
}
export function parsePlansFromParams(searchParams: URLSearchParams) {
  const bossPlans: BossPlan[] = [];

  for (const [key, value] of searchParams)
    bossPlans.push(parsePlanFromParam(key, value));

  return bossPlans;
}
function parsePlanFromParam(key: string, value: string): BossPlan {
  const boss = value
    .split("-")
    .map((vs) => vs.split("."))
    .map((vs) => {
      const type = Object.keys(BOSS_TYPE)[Number(vs[0])] as BOSS_TYPE;
      const difficulty = Object.keys(BOSS_DIFFICULTY)[
        Number(vs[1])
      ] as BOSS_DIFFICULTY;
      const members = Number(vs[2]);

      if (!type || !difficulty || !members) return;

      return { type, difficulty, members };
    })
    .filter((b) => b != undefined);

  return { name: key, order: "", boss };
}
