type crystal = {
  level: number;
  effects: number[][];
};
const CRYSTALS_BY_LEVEL: crystal[][] = [
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
    { level: 4, effects: [[4, 5, 6]] },
    { level: 3, effects: [[4, 5, 6]] },
  ],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 26, 27, 28
    { level: 5, effects: [[1, 2, 3]] },
    { level: 4, effects: [[4, 5, 6]] },
    {
      level: 4,
      effects: [
        [4, 5, 6],
        [4, 5, 7],
      ],
    },
    {
      level: 3,
      effects: [
        [4, 5, 6],
        [4, 6, 7],
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
      effects: [
        [4, 5, 6],
        [4, 5, 7],
      ],
    },
    {
      level: 4,
      effects: [
        [4, 5, 6],
        [4, 6, 7],
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
    { level: 5, effects: [[4, 5, 6]] },
    {
      level: 5,
      effects: [
        [4, 5, 7],
        [4, 5, 6],
      ],
    },
    {
      level: 4,
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
    { level: 5, effects: [[1, 2, 3]] }, // 34
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
      level: 4,
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
  [
    { level: 5, effects: [[1, 2, 3]] }, // 35, 36, 37
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
      level: 4,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
      ],
    },
    {
      level: 4,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
      ],
    },
  ],
  [],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 38, 39
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
      level: 5,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
      ],
    },
    {
      level: 4,
      effects: [
        [6, 7, 8],
        [7, 8, 9],
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
    { level: 5, effects: [[7, 8, 9]] },
    { level: 1, effects: [[10, 11, 12]] },
  ],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 41, 42
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 2, effects: [[10, 11, 12]] },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 43, 44
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 3, effects: [[10, 11, 12]] },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 45, 46
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 4, effects: [[10, 11, 12]] },
  ],
  [],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 47, 48, 49
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[7, 8, 10]] },
    { level: 5, effects: [[9, 10, 11]] },
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
    { level: 3, effects: [[11, 12, 13]] },
  ],
  [
    { level: 5, effects: [[1, 2, 3]] }, // 51, 52, 53
    { level: 5, effects: [[1, 2, 3]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[4, 5, 6]] },
    { level: 5, effects: [[7, 8, 9]] },
    { level: 5, effects: [[7, 8, 10]] },
    { level: 5, effects: [[9, 10, 11]] },
    { level: 4, effects: [[11, 12, 13]] },
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
    { level: 5, effects: [[10, 11, 12]] },
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
const EFFECT_LENGTH_PER_CRYSTAL = CRYSTALS_BY_LEVEL[1][0].effects[0].length;
const MAX_APPLIED_EFFECT_LEVEL = 10;

export default abstract class ArtifactService {
  static generateEffectLevels(artifactLevel: number) {
    const crystals = this.getCrystals(artifactLevel);
    let effectLevelsComb: number[][] = [];

    for (
      let effectIndex = 0,
        effectIndexBound = this.getMaxEffectsLength(artifactLevel);
      effectIndex < effectIndexBound;
      effectIndex++
    ) {
      const effectCount = this.getAppliedEffectCount(
        artifactLevel,
        effectIndex
      );
      let effectLevels = new Array(effectCount + 1).fill(0);

      for (const crystal of crystals)
        for (let i = 0; i < EFFECT_LENGTH_PER_CRYSTAL; i++)
          effectLevels[
            crystal.effects[Math.min(crystal.effects.length - 1, effectIndex)][
              i
            ]
          ] += crystal.level;

      effectLevelsComb.push(effectLevels);
    }

    return effectLevelsComb;
  }

  static getAppliedEffectCount(artifactLevel: number, effectIndex: number) {
    return Math.max(
      ...this.getCrystals(artifactLevel).map((c) =>
        Math.max(...c.effects[Math.min(c.effects.length - 1, effectIndex)])
      )
    );
  }
  static getCrystals(artifactLevel: number) {
    if (artifactLevel >= CRYSTALS_BY_LEVEL.length) return CRYSTALS_BY_LEVEL[1];
    for (let i = artifactLevel; i > 1; i--)
      if (CRYSTALS_BY_LEVEL[i].length) return CRYSTALS_BY_LEVEL[i];
    return CRYSTALS_BY_LEVEL[1];
  }
  static getMaxEffectsLength(artifactLevel: number) {
    return Math.max(
      ...this.getCrystals(artifactLevel).map((c) => c.effects.length)
    );
  }
}
