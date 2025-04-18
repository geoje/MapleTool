import blueOrangeMushroom from "../assets/union/artifact/blue/orange-mushroom.png";
import blueSlime from "../assets/union/artifact/blue/slime.png";
import blueHornyMushroom from "../assets/union/artifact/blue/horny-mushroom.png";
import blueStump from "../assets/union/artifact/blue/stump.png";
import blueGolem from "../assets/union/artifact/blue/golem.png";
import blueBalrog from "../assets/union/artifact/blue/balrog.png";
import blueZaqqum from "../assets/union/artifact/blue/zaqqum.png";
import bluePinkbean from "../assets/union/artifact/blue/pinkbean.png";
import bluePapulatus from "../assets/union/artifact/blue/papulatus.png";

import purpleOrangeMushroom from "../assets/union/artifact/purple/orange-mushroom.png";
import purpleSlime from "../assets/union/artifact/purple/slime.png";
import purpleHornyMushroom from "../assets/union/artifact/purple/horny-mushroom.png";
import purpleStump from "../assets/union/artifact/purple/stump.png";
import purpleGolem from "../assets/union/artifact/purple/golem.png";
import purpleBalrog from "../assets/union/artifact/purple/balrog.png";
import purpleZaqqum from "../assets/union/artifact/purple/zaqqum.png";
import purplePinkbean from "../assets/union/artifact/purple/pinkbean.png";
import purplePapulatus from "../assets/union/artifact/purple/papulatus.png";

export const CRYSTALS_BY_LEVEL: {
  level: number;
  effects: number[][];
}[][] = [
  [],
  [
    { level: 2, effects: [[1, 2, 3]] }, // 1
    { level: 1, effects: [[1, 2, 3]] },
    { level: 1, effects: [[1, 2, 3]] },
  ],
  [
    { level: 2, effects: [[1, 2, 3]] }, // 2
    { level: 2, effects: [[1, 2, 3]] },
    { level: 1, effects: [[1, 2, 3]] },
  ],
  [
    { level: 2, effects: [[1, 2, 3]] }, // 3, 4
    { level: 2, effects: [[1, 2, 3]] },
    { level: 2, effects: [[1, 2, 3]] },
  ],
  [],
  [
    { level: 3, effects: [[1, 2, 3]] }, // 5
    { level: 2, effects: [[1, 2, 3]] },
    { level: 2, effects: [[1, 2, 3]] },
  ],
  [
    { level: 3, effects: [[1, 2, 3]] }, // 6, 7
    { level: 3, effects: [[1, 2, 3]] },
    { level: 2, effects: [[1, 2, 3]] },
  ],
  [],
  [
    { level: 3, effects: [[1, 2, 3]] }, // 8, 9
    { level: 3, effects: [[1, 2, 3]] },
    { level: 3, effects: [[1, 2, 3]] },
  ],
  [],
  [
    { level: 4, effects: [[1, 2, 3]] }, // 10, 11
    { level: 3, effects: [[1, 2, 3]] },
    { level: 3, effects: [[1, 2, 3]] },
    { level: 2, effects: [[4, 5, 6]] },
  ],
  [],
  [
    { level: 4, effects: [[1, 2, 3]] }, // 12, 13
    { level: 3, effects: [[1, 2, 3]] },
    { level: 3, effects: [[1, 2, 3]] },
    { level: 3, effects: [[4, 5, 6]] },
  ],
  [],
  [
    { level: 4, effects: [[1, 2, 3]] }, // 14, 15
    { level: 3, effects: [[1, 2, 3]] },
    { level: 3, effects: [[1, 2, 3]] },
    { level: 4, effects: [[4, 5, 6]] },
  ],
  [],
  [
    { level: 4, effects: [[1, 2, 3]] }, // 16, 17, 18
    { level: 3, effects: [[1, 2, 3]] },
    { level: 3, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
  ],
  [],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 19
    { level: 5, effects: [[1, 2, 3]] },
    { level: 3, effects: [[4, 5, 6]] },
    { level: 3, effects: [[4, 5, 6]] },
  ],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 20
    { level: 5, effects: [[1, 2, 3]] },
    { level: 3, effects: [[4, 5, 6]] },
    { level: 3, effects: [[4, 5, 6]] },
    { level: 2, effects: [[4, 5, 6]] },
  ],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 21, 22
    { level: 5, effects: [[1, 2, 3]] },
    { level: 3, effects: [[4, 5, 6]] },
    { level: 3, effects: [[4, 5, 6]] },
    { level: 3, effects: [[4, 5, 6]] },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 23, 24
    { level: 5, effects: [[1, 2, 3]] },
    { level: 4, effects: [[4, 5, 6]] },
    { level: 3, effects: [[4, 5, 6]] },
    { level: 3, effects: [[4, 5, 6]] },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 25
    { level: 5, effects: [[1, 2, 3]] },
    { level: 4, effects: [[4, 5, 6]] },
    {
      level: 4,
      effects: [[4, 5, 6], [], [4, 5, 7], [4, 5, 6]],
    },
    {
      level: 3,
      effects: [
        [4, 5, 6],
        [4, 5, 7],
        [4, 6, 7],
        [7, 8, 9],
      ],
    },
  ],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 26, 27, 28
    { level: 5, effects: [[1, 2, 3]] },
    { level: 4, effects: [[4, 5, 6]] },
    {
      level: 4,
      effects: [[4, 5, 6], [], [4, 5, 7], [4, 5, 6]],
    },
    {
      level: 4,
      effects: [
        [4, 5, 6],
        [4, 5, 7],
        [4, 6, 7],
        [7, 8, 9],
      ],
    },
  ],
  [],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 29
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    {
      level: 4,
      effects: [[4, 5, 6], [], [4, 5, 7], [4, 5, 6]],
    },
    {
      level: 4,
      effects: [
        [4, 5, 6],
        [4, 5, 7],
        [4, 6, 7],
        [7, 8, 9],
      ],
    },
  ],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 30, 31
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    {
      level: 5,
      effects: [
        [4, 5, 7],
        [4, 5, 6],
      ],
    },
    {
      level: 3,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
      ],
    },
    {
      level: 2,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
      ],
    },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 32, 33
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6], [], [4, 5, 9]] },
    {
      level: 5,
      effects: [
        [4, 5, 7],
        [4, 5, 6],
        [4, 5, 10],
      ],
    },
    {
      level: 4,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
        [6, 7, 8],
      ],
    },
    {
      level: 2,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
        [6, 7, 8],
      ],
    },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 34
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6], [], [4, 5, 9]] },
    {
      level: 5,
      effects: [
        [4, 5, 7],
        [4, 5, 6],
        [4, 5, 10],
      ],
    },
    {
      level: 4,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
        [6, 7, 8],
      ],
    },
    {
      level: 3,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
        [6, 7, 8],
      ],
    },
  ],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 35, 36, 37
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6], [], [4, 5, 9]] },
    {
      level: 5,
      effects: [
        [4, 5, 7],
        [4, 5, 6],
        [4, 5, 10],
      ],
    },
    {
      level: 4,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
        [6, 7, 8],
      ],
    },
    {
      level: 4,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
        [6, 7, 8],
      ],
    },
  ],
  [],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 38, 39
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6], [], [4, 5, 9]] },
    {
      level: 5,
      effects: [
        [4, 5, 7],
        [4, 5, 6],
        [4, 5, 10],
      ],
    },
    {
      level: 5,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
        [6, 7, 8],
      ],
    },
    {
      level: 4,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
        [6, 7, 8],
      ],
    },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 40
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    {
      level: 5,
      effects: [
        [7, 8, 9],
        [7, 8, 10],
      ],
    },
    {
      level: 1,
      effects: [
        [10, 11, 12],
        [9, 10, 11],
      ],
    },
  ],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 41, 42
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    {
      level: 5,
      effects: [
        [7, 8, 9],
        [7, 8, 10],
      ],
    },
    {
      level: 2,
      effects: [
        [10, 11, 12],
        [9, 10, 11],
      ],
    },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 43, 44
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    {
      level: 5,
      effects: [
        [7, 8, 9],
        [7, 8, 10],
      ],
    },
    {
      level: 3,
      effects: [
        [10, 11, 12],
        [9, 10, 11],
      ],
    },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 45, 46
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    {
      level: 5,
      effects: [
        [7, 8, 9],
        [7, 8, 10],
      ],
    },
    {
      level: 4,
      effects: [
        [10, 11, 12],
        [9, 10, 11],
      ],
    },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 47, 48, 49
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    {
      level: 5,
      effects: [
        [7, 8, 9],
        [7, 8, 10],
      ],
    },
    {
      level: 5,
      effects: [
        [10, 11, 12],
        [9, 10, 11],
      ],
    },
  ],
  [],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 50
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[7, 8, 10]] },
    { level: 5, effects: [[9, 10, 11]] },
    {
      level: 3,
      effects: [
        [11, 12, 13],
        [12, 13, 14],
      ],
    },
  ],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 51, 52, 53
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[7, 8, 10]] },
    { level: 5, effects: [[9, 10, 11]] },
    {
      level: 4,
      effects: [
        [11, 12, 13],
        [12, 13, 14],
      ],
    },
  ],
  [],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 54,55,56,57,58,59
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[10, 11, 12]] },
    {
      level: 5,
      effects: [
        [10, 11, 12],
        [10, 11, 13],
      ],
    },
  ],
  [],
  [],
  [],
  [],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 60
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[10, 11, 12]] },
    { level: 5, effects: [[10, 11, 13]] },
    { level: 5, effects: [[12, 13, 14]] },
  ],
];
export const POINT_BY_CRYSTAL = [0, 0, 1, 3, 5, 8];
export const EFFECT_INFOS = [
  { expression: /^올스탯 \d+ 증가/, full: "올스탯 증가", abbreviate: "올스탯" },
  {
    expression: /^최대 HP \d+, 최대 MP \d+ 증가/,
    full: "최대 HP/MP 증가",
    abbreviate: "HP/MP",
  },
  {
    expression: /^공격력 \d+, 마력 \d+ 증가/,
    full: "공격력/마력 증가",
    abbreviate: "공마",
  },
  {
    expression: /^데미지 (\d|\.)+% 증가/,
    full: "데미지 증가",
    abbreviate: "데미지",
  },
  {
    expression: /^보스 몬스터 공격 시 데미지 (\d|\.)+% 증가/,
    full: "보스 몬스터 공격시 데미지 증가",
    abbreviate: "보공",
  },
  {
    expression: /^몬스터 방어율 무시 (\d|\.)+% 증가/,
    full: "몬스터 방어율 무시 증가",
    abbreviate: "방무",
  },
  {
    expression: /^버프 지속시간 \d+% 증가/,
    full: "버프 지속시간 증가",
    abbreviate: "벞지",
  },
  {
    expression: /^재사용 대기시간 미적용 확률 (\d|\.)+% 증가/,
    full: "재사용 대기시간 미적용 확률 증가",
    abbreviate: "재사용",
  },
  {
    expression: /^메소 획득량 (\d|\.)+% 증가/,
    full: "메소 획득량 증가",
    abbreviate: "메획",
  },
  {
    expression: /^아이템 드롭률 \d+% 증가/,
    full: "아이템 드롭률 증가",
    abbreviate: "아드",
  },
  {
    expression: /^크리티컬 확률 \d+% 증가/,
    full: "크리티컬 확률 증가",
    abbreviate: "크확",
  },
  {
    expression: /^크리티컬 데미지 (\d|\.)+% 증가/,
    full: "크리티컬 데미지 증가",
    abbreviate: "크뎀",
  },
  {
    expression:
      /추가 경험치 획득 \d+% 증가, 다수 공격 스킬의 최대 공격 가능 대상 수 1 증가/,
    full: "추가 경험치 획득 증가",
    abbreviate: "경험치",
  },
  {
    expression: /^상태 이상 내성 \d+ 증가/,
    full: "상태이상 내성 증가",
    abbreviate: "상태이상",
  },
  {
    expression: /^소환수 지속시간 \d+% 증가/,
    full: "소환수 지속시간 증가",
    abbreviate: "소환수",
  },
  {
    expression: /^파이널 어택류 스킬의 데미지 \d+% 증가/,
    full: "파이널 어택류 스킬 데미지 증가",
    abbreviate: "파이널",
  },
];
export const EFFECT_COUNT_PER_CRYSTAL =
  CRYSTALS_BY_LEVEL[1][0].effects[0].length; // 3
export const MAX_APPLIED_EFFECT_LEVEL = 10;
export const MIN_ARTIFACT_LEVEL = 1;
export const MAX_ARTIFACT_LEVEL = CRYSTALS_BY_LEVEL.length - 1; // 60
export const MAX_CRYSTAL_LEVEL =
  CRYSTALS_BY_LEVEL[CRYSTALS_BY_LEVEL.length - 1][0].level; // 5

export const ICONS = [
  { blue: blueOrangeMushroom, purple: purpleOrangeMushroom },
  { blue: blueSlime, purple: purpleSlime },
  { blue: blueHornyMushroom, purple: purpleHornyMushroom },
  { blue: blueStump, purple: purpleStump },
  { blue: blueGolem, purple: purpleGolem },
  { blue: blueBalrog, purple: purpleBalrog },
  { blue: blueZaqqum, purple: purpleZaqqum },
  { blue: bluePinkbean, purple: purplePinkbean },
  { blue: bluePapulatus, purple: purplePapulatus },
];
