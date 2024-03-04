type crystal = {
  level: number;
  effects: number[][];
};
export const CRYSTALS_BY_LEVEL: crystal[][] = [
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
