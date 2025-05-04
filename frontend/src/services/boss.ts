import { BOSS, BOSS_DIFFICULTY, BOSS_TYPE } from "../constants/boss";
import BossPlan from "../types/user/bossPlan";

const FORMATION62 =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
// 000     000        00000
// members difficulty type
function convertPlanToBits(bossPlan: BossPlan) {
  const BOSS_TYPE_KEYS = Object.keys(BOSS_TYPE);
  const BOSS_DIFFICULTY_KEYS = Object.keys(BOSS_DIFFICULTY);

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

  if (!num) {
    return FORMATION62[0];
  }

  while (num) {
    result = FORMATION62[num % FORMATION62.length] + result;
    num = Math.floor(num / FORMATION62.length);
  }

  return result;
}
export function parsePlansFromParams(searchParams: URLSearchParams) {
  const bossPlans: BossPlan[] = [];

  for (const [key, value] of searchParams)
    bossPlans.push(parsePlanFromParam(key, value));

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

      const type = Object.keys(BOSS_TYPE)[typeIndex] as BOSS_TYPE;
      const difficulty = Object.keys(BOSS_DIFFICULTY)[
        difficultyIndex
      ] as BOSS_DIFFICULTY;

      if (!type || !difficulty || !members) return;

      return { type, difficulty, members };
    })
    .filter((b) => b != undefined);

  return { name: key, order: "", boss };
}
function parseNumberFrom62(formated: string) {
  let result = 0;

  for (let i = 0; i < formated.length; i++) {
    const char = formated[i];
    const index = FORMATION62.indexOf(char);
    result = result * FORMATION62.length + (index == -1 ? 0 : index);
  }

  return result;
}
