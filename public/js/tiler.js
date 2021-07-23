const TILE = {
  ROW: 20,
  COL: 22,
  COLOR: {
    BACK: ["rgb(57, 57, 57)", "rgb(76, 76, 76)", "rgb(34, 34, 34)", "rgb(43, 43, 43)"],
    SELECTED: "rgb(170, 150, 129)",
    BOUNDARY: "rgb(200, 200, 200)",
    MINO: {
      WARRIOR: "rgb(155, 37, 69)",
      WIZARD: "rgb(60, 117, 144)",
      ARCHER: "rgb(99, 121, 49)",
      THIEF: "rgb(102, 75, 168)",
      PIRATE: "rgb(85, 85, 85)",
      XENON: "rgb(102, 75, 168)",
      MAPLEM: "rgb(204, 85, 0)",
    },
  },
  GROUP: [
    [
      //int
      { x: 12, y: 9 },
      { x: 13, y: 8 },
      { x: 13, y: 9 },
      { x: 14, y: 7 },
      { x: 14, y: 8 },
      { x: 14, y: 9 },
      { x: 15, y: 6 },
      { x: 15, y: 7 },
      { x: 15, y: 8 },
      { x: 15, y: 9 },
      { x: 16, y: 5 },
      { x: 16, y: 6 },
      { x: 16, y: 7 },
      { x: 16, y: 8 },
      { x: 16, y: 9 },
    ],
    [
      //dex
      { x: 11, y: 9 },
      { x: 11, y: 8 },
      { x: 11, y: 7 },
      { x: 11, y: 6 },
      { x: 11, y: 5 },
      { x: 12, y: 5 },
      { x: 12, y: 6 },
      { x: 12, y: 7 },
      { x: 12, y: 8 },
      { x: 13, y: 5 },
      { x: 13, y: 6 },
      { x: 13, y: 7 },
      { x: 14, y: 5 },
      { x: 14, y: 6 },
      { x: 15, y: 5 },
    ],
    [
      //str
      { x: 6, y: 5 },
      { x: 7, y: 5 },
      { x: 7, y: 6 },
      { x: 8, y: 5 },
      { x: 8, y: 6 },
      { x: 8, y: 7 },
      { x: 9, y: 5 },
      { x: 9, y: 6 },
      { x: 9, y: 7 },
      { x: 9, y: 8 },
      { x: 10, y: 5 },
      { x: 10, y: 6 },
      { x: 10, y: 7 },
      { x: 10, y: 8 },
      { x: 10, y: 9 },
    ],
    [
      //mp
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 5, y: 7 },
      { x: 5, y: 8 },
      { x: 5, y: 9 },
      { x: 6, y: 6 },
      { x: 6, y: 7 },
      { x: 6, y: 8 },
      { x: 6, y: 9 },
      { x: 7, y: 7 },
      { x: 7, y: 8 },
      { x: 7, y: 9 },
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 9, y: 9 },
    ],
    [
      //hp
      { x: 5, y: 10 },
      { x: 5, y: 11 },
      { x: 5, y: 12 },
      { x: 5, y: 13 },
      { x: 5, y: 14 },
      { x: 6, y: 10 },
      { x: 6, y: 11 },
      { x: 6, y: 12 },
      { x: 6, y: 13 },
      { x: 7, y: 10 },
      { x: 7, y: 11 },
      { x: 7, y: 12 },
      { x: 8, y: 10 },
      { x: 8, y: 11 },
      { x: 9, y: 10 },
    ],
    [
      //ap
      { x: 6, y: 14 },
      { x: 7, y: 13 },
      { x: 7, y: 14 },
      { x: 8, y: 12 },
      { x: 8, y: 13 },
      { x: 8, y: 14 },
      { x: 9, y: 11 },
      { x: 9, y: 12 },
      { x: 9, y: 13 },
      { x: 9, y: 14 },
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
      { x: 10, y: 13 },
      { x: 10, y: 14 },
    ],
    [
      //ad
      { x: 11, y: 10 },
      { x: 11, y: 11 },
      { x: 11, y: 12 },
      { x: 11, y: 13 },
      { x: 11, y: 14 },
      { x: 12, y: 11 },
      { x: 12, y: 12 },
      { x: 12, y: 13 },
      { x: 12, y: 14 },
      { x: 13, y: 12 },
      { x: 13, y: 13 },
      { x: 13, y: 14 },
      { x: 14, y: 13 },
      { x: 14, y: 14 },
      { x: 15, y: 14 },
    ],
    [
      //luk
      { x: 12, y: 10 },
      { x: 13, y: 10 },
      { x: 13, y: 11 },
      { x: 14, y: 10 },
      { x: 14, y: 11 },
      { x: 14, y: 12 },
      { x: 15, y: 10 },
      { x: 15, y: 11 },
      { x: 15, y: 12 },
      { x: 15, y: 13 },
      { x: 16, y: 10 },
      { x: 16, y: 11 },
      { x: 16, y: 12 },
      { x: 16, y: 13 },
      { x: 16, y: 14 },
    ],
    [
      //critical probability
      { x: 17, y: 4 },
      { x: 17, y: 5 },
      { x: 17, y: 6 },
      { x: 17, y: 7 },
      { x: 17, y: 8 },
      { x: 17, y: 9 },
      { x: 18, y: 3 },
      { x: 18, y: 4 },
      { x: 18, y: 5 },
      { x: 18, y: 6 },
      { x: 18, y: 7 },
      { x: 18, y: 8 },
      { x: 18, y: 9 },
      { x: 19, y: 2 },
      { x: 19, y: 3 },
      { x: 19, y: 4 },
      { x: 19, y: 5 },
      { x: 19, y: 6 },
      { x: 19, y: 7 },
      { x: 19, y: 8 },
      { x: 19, y: 9 },
      { x: 20, y: 1 },
      { x: 20, y: 2 },
      { x: 20, y: 3 },
      { x: 20, y: 4 },
      { x: 20, y: 5 },
      { x: 20, y: 6 },
      { x: 20, y: 7 },
      { x: 20, y: 8 },
      { x: 20, y: 9 },
      { x: 21, y: 0 },
      { x: 21, y: 1 },
      { x: 21, y: 2 },
      { x: 21, y: 3 },
      { x: 21, y: 4 },
      { x: 21, y: 5 },
      { x: 21, y: 6 },
      { x: 21, y: 7 },
      { x: 21, y: 8 },
      { x: 21, y: 9 },
    ],
    [
      //experience
      { x: 11, y: 0 },
      { x: 11, y: 1 },
      { x: 11, y: 2 },
      { x: 11, y: 3 },
      { x: 11, y: 4 },
      { x: 12, y: 0 },
      { x: 12, y: 1 },
      { x: 12, y: 2 },
      { x: 12, y: 3 },
      { x: 12, y: 4 },
      { x: 13, y: 0 },
      { x: 13, y: 1 },
      { x: 13, y: 2 },
      { x: 13, y: 3 },
      { x: 13, y: 4 },
      { x: 14, y: 0 },
      { x: 14, y: 1 },
      { x: 14, y: 2 },
      { x: 14, y: 3 },
      { x: 14, y: 4 },
      { x: 15, y: 0 },
      { x: 15, y: 1 },
      { x: 15, y: 2 },
      { x: 15, y: 3 },
      { x: 15, y: 4 },
      { x: 16, y: 0 },
      { x: 16, y: 1 },
      { x: 16, y: 2 },
      { x: 16, y: 3 },
      { x: 16, y: 4 },
      { x: 17, y: 0 },
      { x: 17, y: 1 },
      { x: 17, y: 2 },
      { x: 17, y: 3 },
      { x: 18, y: 0 },
      { x: 18, y: 1 },
      { x: 18, y: 2 },
      { x: 19, y: 0 },
      { x: 19, y: 1 },
      { x: 20, y: 0 },
    ],
    [
      //tolerance
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 0 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 5, y: 0 },
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
      { x: 5, y: 4 },
      { x: 6, y: 0 },
      { x: 6, y: 1 },
      { x: 6, y: 2 },
      { x: 6, y: 3 },
      { x: 6, y: 4 },
      { x: 7, y: 0 },
      { x: 7, y: 1 },
      { x: 7, y: 2 },
      { x: 7, y: 3 },
      { x: 7, y: 4 },
      { x: 8, y: 0 },
      { x: 8, y: 1 },
      { x: 8, y: 2 },
      { x: 8, y: 3 },
      { x: 8, y: 4 },
      { x: 9, y: 0 },
      { x: 9, y: 1 },
      { x: 9, y: 2 },
      { x: 9, y: 3 },
      { x: 9, y: 4 },
      { x: 10, y: 0 },
      { x: 10, y: 1 },
      { x: 10, y: 2 },
      { x: 10, y: 3 },
      { x: 10, y: 4 },
    ],
    [
      //critical damage
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
      { x: 0, y: 4 },
      { x: 0, y: 5 },
      { x: 0, y: 6 },
      { x: 0, y: 7 },
      { x: 0, y: 8 },
      { x: 0, y: 9 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
      { x: 1, y: 6 },
      { x: 1, y: 7 },
      { x: 1, y: 8 },
      { x: 1, y: 9 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 2, y: 4 },
      { x: 2, y: 5 },
      { x: 2, y: 6 },
      { x: 2, y: 7 },
      { x: 2, y: 8 },
      { x: 2, y: 9 },
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 3, y: 5 },
      { x: 3, y: 6 },
      { x: 3, y: 7 },
      { x: 3, y: 8 },
      { x: 3, y: 9 },
      { x: 4, y: 4 },
      { x: 4, y: 5 },
      { x: 4, y: 6 },
      { x: 4, y: 7 },
      { x: 4, y: 8 },
      { x: 4, y: 9 },
    ],
    [
      //defense
      { x: 0, y: 10 },
      { x: 0, y: 11 },
      { x: 0, y: 12 },
      { x: 0, y: 13 },
      { x: 0, y: 14 },
      { x: 0, y: 15 },
      { x: 0, y: 16 },
      { x: 0, y: 17 },
      { x: 0, y: 18 },
      { x: 0, y: 19 },
      { x: 1, y: 10 },
      { x: 1, y: 11 },
      { x: 1, y: 12 },
      { x: 1, y: 13 },
      { x: 1, y: 14 },
      { x: 1, y: 15 },
      { x: 1, y: 16 },
      { x: 1, y: 17 },
      { x: 1, y: 18 },
      { x: 2, y: 10 },
      { x: 2, y: 11 },
      { x: 2, y: 12 },
      { x: 2, y: 13 },
      { x: 2, y: 14 },
      { x: 2, y: 15 },
      { x: 2, y: 16 },
      { x: 2, y: 17 },
      { x: 3, y: 10 },
      { x: 3, y: 11 },
      { x: 3, y: 12 },
      { x: 3, y: 13 },
      { x: 3, y: 14 },
      { x: 3, y: 15 },
      { x: 3, y: 16 },
      { x: 4, y: 10 },
      { x: 4, y: 11 },
      { x: 4, y: 12 },
      { x: 4, y: 13 },
      { x: 4, y: 14 },
      { x: 4, y: 15 },
    ],
    [
      //buff
      { x: 1, y: 19 },
      { x: 2, y: 18 },
      { x: 2, y: 19 },
      { x: 3, y: 17 },
      { x: 3, y: 18 },
      { x: 3, y: 19 },
      { x: 4, y: 16 },
      { x: 4, y: 17 },
      { x: 4, y: 18 },
      { x: 4, y: 19 },
      { x: 5, y: 15 },
      { x: 5, y: 16 },
      { x: 5, y: 17 },
      { x: 5, y: 18 },
      { x: 5, y: 19 },
      { x: 6, y: 15 },
      { x: 6, y: 16 },
      { x: 6, y: 17 },
      { x: 6, y: 18 },
      { x: 6, y: 19 },
      { x: 7, y: 15 },
      { x: 7, y: 16 },
      { x: 7, y: 17 },
      { x: 7, y: 18 },
      { x: 7, y: 19 },
      { x: 8, y: 15 },
      { x: 8, y: 16 },
      { x: 8, y: 17 },
      { x: 8, y: 18 },
      { x: 8, y: 19 },
      { x: 9, y: 15 },
      { x: 9, y: 16 },
      { x: 9, y: 17 },
      { x: 9, y: 18 },
      { x: 9, y: 19 },
      { x: 10, y: 15 },
      { x: 10, y: 16 },
      { x: 10, y: 17 },
      { x: 10, y: 18 },
      { x: 10, y: 19 },
    ],
    [
      //stance
      { x: 11, y: 15 },
      { x: 11, y: 16 },
      { x: 11, y: 17 },
      { x: 11, y: 18 },
      { x: 11, y: 19 },
      { x: 12, y: 15 },
      { x: 12, y: 16 },
      { x: 12, y: 17 },
      { x: 12, y: 18 },
      { x: 12, y: 19 },
      { x: 13, y: 15 },
      { x: 13, y: 16 },
      { x: 13, y: 17 },
      { x: 13, y: 18 },
      { x: 13, y: 19 },
      { x: 14, y: 15 },
      { x: 14, y: 16 },
      { x: 14, y: 17 },
      { x: 14, y: 18 },
      { x: 14, y: 19 },
      { x: 15, y: 15 },
      { x: 15, y: 16 },
      { x: 15, y: 17 },
      { x: 15, y: 18 },
      { x: 15, y: 19 },
      { x: 16, y: 15 },
      { x: 16, y: 16 },
      { x: 16, y: 17 },
      { x: 16, y: 18 },
      { x: 16, y: 19 },
      { x: 17, y: 16 },
      { x: 17, y: 17 },
      { x: 17, y: 18 },
      { x: 17, y: 19 },
      { x: 18, y: 17 },
      { x: 18, y: 18 },
      { x: 18, y: 19 },
      { x: 19, y: 18 },
      { x: 19, y: 19 },
      { x: 20, y: 19 },
    ],
    [
      //boss
      { x: 17, y: 10 },
      { x: 17, y: 11 },
      { x: 17, y: 12 },
      { x: 17, y: 13 },
      { x: 17, y: 14 },
      { x: 17, y: 15 },
      { x: 18, y: 10 },
      { x: 18, y: 11 },
      { x: 18, y: 12 },
      { x: 18, y: 13 },
      { x: 18, y: 14 },
      { x: 18, y: 15 },
      { x: 18, y: 16 },
      { x: 19, y: 10 },
      { x: 19, y: 11 },
      { x: 19, y: 12 },
      { x: 19, y: 13 },
      { x: 19, y: 14 },
      { x: 19, y: 15 },
      { x: 19, y: 16 },
      { x: 19, y: 17 },
      { x: 20, y: 10 },
      { x: 20, y: 11 },
      { x: 20, y: 12 },
      { x: 20, y: 13 },
      { x: 20, y: 14 },
      { x: 20, y: 15 },
      { x: 20, y: 16 },
      { x: 20, y: 17 },
      { x: 20, y: 18 },
      { x: 21, y: 10 },
      { x: 21, y: 11 },
      { x: 21, y: 12 },
      { x: 21, y: 13 },
      { x: 21, y: 14 },
      { x: 21, y: 15 },
      { x: 21, y: 16 },
      { x: 21, y: 17 },
      { x: 21, y: 18 },
      { x: 21, y: 19 },
    ],
  ],
  GROUPE: [
    [11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8],
    [11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8],
    [11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8],
    [11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8],
    [11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 8, 8, 8, 8, 8],
    [11, 11, 11, 11, 11, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 8, 8, 8, 8, 8],
    [11, 11, 11, 11, 11, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 8, 8, 8, 8, 8],
    [11, 11, 11, 11, 11, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0, 8, 8, 8, 8, 8],
    [11, 11, 11, 11, 11, 3, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0, 8, 8, 8, 8, 8],
    [11, 11, 11, 11, 11, 3, 3, 3, 3, 3, 2, 1, 0, 0, 0, 0, 0, 8, 8, 8, 8, 8],
    [12, 12, 12, 12, 12, 4, 4, 4, 4, 4, 5, 6, 7, 7, 7, 7, 7, 15, 15, 15, 15, 15],
    [12, 12, 12, 12, 12, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7, 15, 15, 15, 15, 15],
    [12, 12, 12, 12, 12, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 15, 15, 15, 15, 15],
    [12, 12, 12, 12, 12, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 15, 15, 15, 15, 15],
    [12, 12, 12, 12, 12, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 15, 15, 15, 15, 15],
    [12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15],
    [12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15],
    [12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15],
    [12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15],
    [12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15],
  ],
  MINO_POS: [
    [[2]], // 0 // B // All
    [[2, 2]], // 1 // A // All
    [
      [2, 1], // 2 // S // Warrior, Pirate
      [1, 0],
    ],
    [[1, 2, 1]], // 3 // S // Wizard, Archer, Thief, Maplem
    [
      [2, 2], // 4 // SS // Warrior
      [2, 2],
    ],
    [
      [1, 2, 1], // 5 // SS // Wizard
      [0, 1, 0],
    ],
    [[1, 2, 2, 1]], // 6 // SS // Archer, Maplem
    [
      [1, 2, 1], // 7 // SS // Thief
      [0, 0, 1],
    ],
    [
      [0, 1], // 8 // SS // Pirate
      [2, 2],
      [1, 0],
    ],
    [
      [2, 1, 1], // 9 // SSS // Warrior
      [1, 1, 0],
    ],
    [
      [0, 1, 0], // 10 // SSS // Wizard
      [1, 2, 1],
      [0, 1, 0],
    ],
    [[1, 1, 2, 1, 1]], // 11 // SSS // Archer
    [
      [0, 0, 1], // 12 // SSS // Thief
      [1, 2, 1],
      [0, 0, 1],
    ],
    [
      [0, 1], // 13 // SSS // Pirate
      [0, 1],
      [2, 1],
      [1, 0],
    ],
    [
      [1, 0, 0], // 14 // SSS // Xenon
      [1, 2, 1],
      [0, 0, 1],
    ],
  ],
  MINO_INDEX: {
    WARRIOR: [0, 1, 2, 4, 9],
    WIZARD: [0, 1, 3, 5, 10],
    ARCHER: [0, 1, 3, 6, 11],
    THIEF: [0, 1, 3, 7, 12],
    PIRATE: [0, 1, 2, 8, 13],
    XENON: [0, 1, 3, 7, 14],
    MAPLEM: [0, 1, 3, 6],
  },
};
Array.Copy2d = (arr2d) => {
  let result = [];
  arr2d.forEach((arr1d) => result.push(arr1d.slice()));
  return result;
};

let board; // 0: 빈 곳, 1: 선택, 2: 일반 미노, 3: 미노 중심

class Mino {
  constructor(jobClass, rankIdx, count) {
    this.jobClass = jobClass;
    this.rankIdx = rankIdx;
    this.count = count;
    this.shapes = [];

    // jobClass, rankIdx를 통해 변형될 수 있는 모든 도형을 만듦
    // 원본
    const minoIdx = TILE.MINO_INDEX[this.jobClass.toUpperCase()][this.rankIdx];
    this.shapes = [{ matrix: TILE.MINO_POS[minoIdx] }];
    let row = this.shapes[0].matrix.length;
    let col = this.shapes[0].matrix[0].length;
    let matrix;

    // 상하 대칭
    if ([7, 8, 9, 13, 14].indexOf(minoIdx) != -1) {
      matrix = Array.Copy2d(this.shapes[0].matrix);
      this.shapes.push({ matrix: matrix.reverse() });
    }

    // 반시계방향 90deg 회전
    matrix = Array.from(Array(col), () => new Array(row));
    if ([1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14].indexOf(minoIdx) != -1) {
      for (let i = 0; i < col; i++)
        for (let j = 0; j < row; j++) matrix[i][j] = this.shapes[0].matrix[j][col - i - 1];
      this.shapes.push({ matrix: matrix });

      // 좌우 대칭
      if ([7, 8, 9, 13, 14].indexOf(minoIdx) != -1) {
        matrix = Array.Copy2d(matrix);
        this.shapes.push({ matrix: matrix.map((r) => r.reverse()) });
      }
    }

    // 반시계방향 180deg 회전
    matrix = Array.Copy2d(this.shapes[0].matrix);
    if ([2, 5, 7, 9, 12, 13].indexOf(minoIdx) != -1) {
      matrix.forEach((r) => r.reverse());
      this.shapes.push({ matrix: matrix.reverse() });

      // 상하 대칭
      if ([7, 9, 13].indexOf(minoIdx) != -1) {
        matrix = Array.Copy2d(matrix);
        this.shapes.push({ matrix: matrix.reverse() });
      }
    }

    // 반시계방향 270deg 회전
    matrix = Array.from(Array(col), () => new Array(row));
    if ([2, 5, 7, 9, 12, 13].indexOf(minoIdx) != -1) {
      for (let i = 0; i < col; i++)
        for (let j = 0; j < row; j++) matrix[i][j] = this.shapes[0].matrix[row - j - 1][i];
      this.shapes.push({ matrix: matrix });

      // 좌우 대칭
      if ([7, 9, 13].indexOf(minoIdx) != -1) {
        matrix = Array.Copy2d(matrix);
        this.shapes.push({ matrix: matrix.map((r) => r.reverse()) });
      }
    }

    // 중심 위치 지정
    for (let i = 0; i < this.shapes.length; i++)
      for (let y = 0; y < this.shapes[i].matrix.length; y++)
        for (let x = 0; x < this.shapes[i].matrix[0].length; x++)
          if (this.shapes[i].matrix[y][x] == 2) {
            this.shapes[i].center = new Point(x, y);
            y = this.shapes[i].matrix.length;
            break;
          }
  }

  // shapes[shapeIdx] 모양으로 x, y에 위치에 있을 때 주변에 빈 공간들을 반환
  // return: Point()[]
  getArroundSpot(point, shapeIdx) {
    let x = point.x;
    let y = point.y;
    let points = [];

    // 영역 둘러싼 부분 추가
    this.shapes[shapeIdx].matrix.forEach((row) => {
      row.forEach((num) => {
        if (num) {
          if (x > 0 && board[y][x - 1] == 1) points.push(new Point(x - 1, y));
          if (y > 0 && board[y - 1][x] == 1) points.push(new Point(x, y - 1));
          if (x < TILE.COL - 1 && board[y][x + 1] == 1) points.push(new Point(x + 1, y));
          if (y < TILE.ROW - 1 && board[y + 1][x] == 1) points.push(new Point(x, y + 1));
        }
        x++;
      });
      x = point.x;
      y++;
    });

    // 중복 제거
    points = points.filter(
      (p1, index, arr) => index == arr.findIndex((p2) => p1.x == p2.x && p1.y == p2.y)
    );
    return points;
  }

  // shapes[shapeIdx] 모양으로 x, y에 위치할 수 있는지
  // 실제 위치 가능한 곳이 direction을 판단한 뒤 적당한 offset을 가지고 shape 크기 내에서 이동될 수 있음
  // return: { able: [true or false], point: Point() }
  // Have to modify
  isPlaceable(point, shapeIdx) {
    let offsets = [];
    const shape = this.shapes[shapeIdx];
    const row = shape.matrix.length;
    const col = shape.matrix[0].length;
    const dir = point.getDirection();

    // 방향에 따른 offset 추가
    if (dir | 1) for (let i = 0, x = 0, y = 0; i < row; i++, y--) offsets.push({ x, y });
    if (dir | 2) for (let i = 0, x = 0, y = -row + 1; i < col; i++, x--) offsets.push({ x, y });
    if (dir | 4) for (let i = 0, x = -col + 1, y = 0; i < row; i++, y--) offsets.push({ x, y });
    if (dir | 8) for (let i = 0, x = 0, y = 0; i < col; i++, x--) offsets.push({ x, y });

    // 중복 제거
    offsets = offsets.filter(
      (p1, index, arr) => index == arr.findIndex((p2) => p1.x == p2.x && p1.y == p2.y)
    );

    let able, x, y;
    for (let offset of offsets) {
      able = true;
      x = point.x + offset.x;
      y = point.y + offset.y;
      if (x < 0 || y < 0 || x > TILE.COL - col || y > TILE.ROW - row) continue;

      for (let i = 0; i < row; i++)
        for (let j = 0; j < col; j++)
          if (shape.matrix[i][j] > 0 && board[y + i][x + j] != 1) {
            able = false;
            i = row;
            break;
          }

      if (able) return { able: true, point: new Point(x, y) };
    }
    return { able: false };
  }

  // 정확히 x, y 위치에 shapes[shapeIdx]로 배치 board 변경
  // return: 배치된 Point()[]
  //
  // 나중에 headOffset 3번째 인자로 받아서 대가리 출력하게 해야함
  // 중앙에 궁수가 왼쪽으로 길게 배치되는 경우까지 하면 시가절약 가능하기 때문!
  place(point, shapeIdx) {
    let { x, y } = point;
    let points = [];

    this.shapes[shapeIdx].matrix.forEach((row) => {
      row.forEach((num) => {
        if (num) {
          board[y][x] = num == 2 ? 3 : 2;
          points.push(new Point(x, y));
        }
        x++;
      });
      x = point.x;
      y++;
    });

    return points;
  }
  unPlace(point, shapeIdx) {
    let { x, y } = point;
    let points = [];

    this.shapes[shapeIdx].matrix.forEach((row) => {
      row.forEach((num) => {
        if (num) {
          board[y][x] = 1;
          points.push(new Point(x, y));
        }
        x++;
      });
      x = point.x;
      y++;
    });

    return points;
  }
}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.adj = 0;
  }

  updateAdjacent() {
    this.adj = 0;
    if (this.x > 0 && board[this.y][this.x - 1] == 1) this.adj++;
    if (this.y > 0 && board[this.y - 1][this.x] == 1) this.adj++;
    if (this.x < TILE.COL - 1 && board[this.y][this.x + 1] == 1) this.adj++;
    if (this.y < TILE.ROW - 1 && board[this.y + 1][this.x] == 1) this.adj++;
    return this.adj;
  }

  getDirection() {
    let dir = 0;
    if (this.x < TILE.COL - 1 && board[this.y][this.x + 1] == 1) dir += 1; // 우
    if (this.y > 0 && board[this.y - 1][this.x] == 1) dir += 2; // 상
    if (this.x > 0 && board[this.y][this.x - 1] == 1) dir += 4; // 좌
    if (this.y < TILE.ROW - 1 && board[this.y + 1][this.x] == 1) dir += 8; // 하
    return dir;
  }
}
class Spot {
  constructor() {
    this.points = [];
    this.minoIdx = 0;
    this.shapeIdx = 0;
  }
}
class Node {
  constructor(spotName, point, minoIdx, shapeIdx) {
    this.spotName = spotName;
    this.point = point;
    this.minoIdx = minoIdx;
    this.shapeIdx = shapeIdx;
  }
}

class Tiler {
  constructor() {
    setTimeout(() => {
      this.Test();
      //this.chch2316();
      //onPlay({ message: "" });
    }, 100);
  }
  Test() {
    const infoList = (() => {
      return [
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/LFKALKBPLBKNPPPFBKNLMHEEGKDKPOOJCLHMJBOFNGIFGEGJFOOEBNGBENPBKPGJCEMKCGDHADCFOJMEKAJDHPPFMPMJGJNEKNCFEEAOACKEFBADNLMMAPFEFJBCPAGFDNOOGPEEGNOGHIOLKAHIAEGNMBFFNCIABGOOLHAIHDELAKAOOCAHBEPHFHBBMBHCODHPAAMPCMKKKAMEBDFDPEKPLIFDMAPGPLMOJMPFBEHECNBMHEMNOLAKEPGIAFMK.png",
          name: "새벽너울",
          level: 250,
          job: "팬텀",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/MJBCLOHHJLAEGBJBOFJCPJJINIDIPEKLMICBMDFIMPLCFDAICGJOPLJIGGPJEBIBEOHJFBCEJFEBJADILAPJMKMKNNMMEAMGKOCOEBJKNKBEOPKMODNCMOJAFCOLJAFDOPEEELMHALOMFPMOMDFKAJCJCPHJCPJCPENFGJKMBPCLNNFEICHNNBNNOKECNCDPFLEBFIIOLCLPKHFDIDPPEAIAIKEOFMEHANEMHJFDGLOIHABJEIPKOJKFBALKJAKA.png",
          name: "ygh메르",
          level: 200,
          job: "메르세데스",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/KEPNLPKLEGEGHAFIKJIEMMDKKFKBHFBLNJDFDENCHAFBGCFIMDIPICOOKGIDDGFBPJHPGGCJNILACKNFNBGLMDAEPKAEJAACLDJJNCGNJDEGJBKMOKCAIBDKJFDFDBBIJCMFFHAJIEPIDNLJIPBBLPDCLLMCKEJGBCMELGGPJEHPICHBHMBEAEOFPDILIGCBLCPJGKGMJOBABILCGCMIMJEGAANDNHDKPOCEPCCPJONCJPCCOHHDIFPNJKENEILK.png",
          name: "ygh미하일",
          level: 200,
          job: "미하일",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/EHPPMKKAJLADMNDEKOPJABENBDPANDKGGGPBDPMEMILFDHGENHKFIEAPNMLFOMJHOBPBLFBNNBBKNGCEFLJIMCOKLLMGOBEHAJCNHPLECOKJDFIENPLBHCCJEHPHNOFDHNJDANKGNGBKCGDALPONGHNMHEEKLMIFOMIIJNCPNDIPILIEOJAECIMIEBNHJLLONECPDLPKHPIKCAFHHHODCALKPEGJLNHDCEMHOMCHPKAGLOJMMEGAEOBFFOCIGIBO.png",
          name: "ygh버스터",
          level: 204,
          job: "엔젤릭버스터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/OIFMDFEGFOPILBBMEOJPJAIIICKENHGLAKIALEOIJHBBHIIPGCINGMMMMPMBMJLENPLODKPAAHOJFBOKJBKIDBLLFFINACIGKDELLDLBMOHAKNIGDFHMABFHLMAHPLDCGIHBDJEDFGGACCFOONKHMOIBGDLPOBHJOIMNLMCNDOMEDDIONFKCBMFIEJACCLEMBFPNLAJGMLOLNONNGHBBJGDDHOAMGPEBEAOFCLAFDLBMLPFOKFDJLIKPNPNBMAKN.png",
          name: "ygh스븐",
          level: 200,
          job: "스트라이커",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/IKGOBKDMDBEPGMDDAMGFOOFKAGOLJCJOCHDLMHAMOAAMABBNKKBHBJAJOOKPMGBMGAGGCNHJGIBFJECEEBGBCCFIIIBJIHCIOIJNGNMPMGGAPNBIICGKGCAMIDHFOGMPICLLMPGFCKGPOBDKNKFIDBFDELGPLJIBAPHCADHNPJPHAJLKLLNIFOGCPOKLJJIDIGCHAAMBLJNGFIKGFINKNCLCDADOCKFOEACIGEPKGKEGGNLFFPOMDBMLOKJALPAP.png",
          name: "ygh은월",
          level: 200,
          job: "은월",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/DNENAIABPLDNGNPLELEEKHJIHHMOOKADPPBHHHCCJLNHGHJNCMFIACEJEPMFFPIDPCGOIEGLMAGKDHJPNCDKHPEBFJOCEKAIABGIPOBIDFNLFNAJAOOGIGHAAOIPCBIGPJFAKNNJBMAAGMJCCIGDFBIIKNGNLCJABNEBPELKFMKHJJMEBLLNPGMFLIKDCBKHEJAFPNBPAIAOGMNNBGKPABICOLNOHKBNFIKBKNKIAPEBMKHGLLFJOIAPMGLAIEBL.png",
          name: "ygh펜타곤",
          level: 200,
          job: "카이저",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/PKFEPEMEFENKDEPIBHJCBIMABLKCDJMHFEGOGGNJKIAPPBPPCDNEEKKAMIEKJPJNPNJEHPINLFDOCIJAOCMIEJOINOFNKMKONMBGLLABAEHOBLNNOFDJAFECMHHIJAENNJOIEAENKNBCAOJBDADKFJJKAMOMKPNDGCGJOHPEBAFINCPMAKBMFKONACJPMHPGFKODMKOBHFBABFKHJKEPMFDECDELJFADJCELFPGKOKODPEFGJGOBEICDFIENNLBN.png",
          name: "새벽가시",
          level: 200,
          job: "데몬슬레이어",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/NPAIHOGFBBBIACLJKMLCLLFNKDNHIKNKAJCNIMECNGLEJBPACBEGKMJCDAGHGECEHJMFCMGBEPCILNAKICKOHONHCGJCMMOHLOGKHOLGOIMABIJFKNKJDOFEPFBNKKMDOLFGALJGNNJLJMECONGHFIFPEPMDIIANNEFFNFBOHKCKBHLHAOIKFFIOFBPANFIBFBHAKGJPOHEMKGACPFCBEIMDMDPPGDEAHCBMODBPDBDKJLJKGEADCGABEMJEHBFJ.png",
          name: "새벽가지",
          level: 201,
          job: "제로",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/KHLPDBHPNOAOLGNAMFCKCFFMPJJENCEBPKNIOHFOGAKNDGNEDHFPEBINBIDIILLOEGMCIOOPAFCBCOLPCLJMKBFMGFGEEMEGKJNAPBBFNKKFOOHBNGAOOMCOONBPDHDHGIPBNHFFDMEBNLJHHBPLDMBAAHJPLJMHPAFOIFKHLIEKHNLAJMADHHIPCAIHGJMLJNPPMEHFLGNFJNOJIKNDANNIHPACNBLNFEFEPGGBNJCAGBODOKKCPGICNJLOHFBP.png",
          name: "새벽권",
          level: 200,
          job: "캡틴",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/MNBLNKHNMNFFAONHPOOLECNAPAOMLKCFKOBPEOKKFOAKCFGPKHOOJLJCEHIDKELGCLFGMCKPBNJDPMLEIEIHLPODKIDDBHLPMKGOAFKAPAGOOKBDCMNOLDHAHMFEFEMDNEPOLJIBGELMKINDDMKMLMMCICPHADIAEMNDHGPDFILNEFANDNBKCILGKMLHFCHPDLEAICDHJEDMIFGDAHEGLFCCGLCBOGMJKDAKHBLFLKJOKBCNNLMFENBGKFMJFOAC.png",
          name: "새벽댈",
          level: 217,
          job: "아델",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/CMDFKMGKIMCCFNEEHNBHIOAIDJPAJBCDAIJDLIPENJLMMNHMLBLKDNMMPINFJEBFELBMAKBNGJCDNLHKGIFDBKKOOEFJKPBPHGDKMLPJICDCPPKAGOOAIJDJAIANLMPBAIDKOAHFPAMFOKJLDKDJGNBBHCFBFADKPMIEFDMJHOBPBEIJCNGGDENIABNEGJJJPHBHGNEMHAIJLLMOPOAPAIGBODEBJDEIMMKMGKBILNHBLFBNJLIGEFAODCGCAJFP.png",
          name: "새벽덱",
          level: 200,
          job: "카데나",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/MMIBBNHNPLMAICNHPCOKHLAFBGJBOJABHJBMGKFLNPCOBMEDKIHFDAHGACFMKONBOANGOLLMJCJNHNNPAGODGBKOOCDDJDJKJMHHAKLCBCJIDODFEIENCDGGCBMNOIIAKNBJNDEBDKLLIICKPIMAJGBFBCIGDMHIEAENGHKLKIHDAEGJEFBHDGFLBPJKNJAPAIMENFGBMENHJOPELFEMAKFAOIPNODFFIJGDNMGNCKHLBCINCMEPAHOKLGOPAIEH.png",
          name: "새벽뚝",
          level: 200,
          job: "팔라딘",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/JJJIPCNPNLGDKGHBABLIJIOMGNDBHIMGCBEOMBOKCAIBKDPFPFEAMEPPNPFOKNNACMNLNJJJBEOIMBOEHBHLFIFOGIPHAAIFIMPMBJMDHJJJOEHCAMIJBLCEMJBNINOOGFELFHACCDNGIMODOMHFDMBLGMJJOOJLBPKCGPCGNBEBABHLMLIDJNNGHGKKONCDDBHIAFLDKIHMMKGBJNJFMEPJLMBIMPDNKIPAGCBGDCIAGDMDIMMMOLKMKGJCNIPD.png",
          name: "새벽랫",
          level: 200,
          job: "블래스터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/DIENIFANJFDNPPHKMKNCDGDIGBDHDGFIOIIMCLGALAMLHCMEHAONLHCLHPLHFLFACNEAAIEHCGEIEMCHICEJPBJPAJCBONJFKMANNKIMAHLCGAJDNPPGGLCEFNNIHLHCAMHMPOMPLAFNLNCKFCOMHPIDFPNMMKCBIMLBDLLGABFBIOPKPFOLNNMPPLCBGHAAHHFEMAKHCEBPCNEOGGMGKMIKFACHMCJOOOCJGKOFFDGFEAKNENKJNMHHOGGJCPMH.png",
          name: "새벽랸",
          level: 200,
          job: "아란",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/KCPJFCHKJDPFKBLGKMIFIGLBEPLLOIAFGFOMAANOPLLHAIHBIGMCHKBAENBNJDAHKOILPIBGJCHOMAMOLBJCJJHLBKAFNGLMDJJKLKDJACLNCGIGAGAEOMIIIEFGCOEGLGGOHBAJFAFMHDMOHOHHMLBDJMNDKOALMFABOCFNMFJPKOKKMHDGIFOOHGLCPJOGLJBPLKAOKJKFAJCIINLAFOJBBICFEDNAHLPOEMKHPFCKECBEELJJMCGPEMPPBDDA.png",
          name: "새벽레",
          level: 220,
          job: "윈드브레이커",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/BJPIDHBKLOBNMDOPLALNHJHKBIEFGIGGHNNOKFGCAEOGMINLLNAKFEINAFDINPHGOMFJAGOJENPGNPCJMMPIEMGEDMOMLJADOCCKGMNGOFLHHELOCIJJCAANHNINCKCDFFGHOHJIHOLHBJNPOBLAPAPIODENLAHHMONHPILJFMCNAJOLODCCDPDJHPGODBKPFONEBPNMEPFAEONAHBIFEKCAHLAJMCNJPMLANDGBCJHKIACLIIPOKGHGNNODJHHO.png",
          name: "새벽루믿",
          level: 200,
          job: "루미너스",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/GBEGDHHJHPJNILECGBFPPEANHLPCHECEOHJNJHBFJGKEAHLINHJAFNDKIIIMAKJMGNKKBJLPOGDLCGJLAJMJHJNPJOPPCGPKKKCHAJLGECBMNPKFPNDBOICLBAENJEPDGEECILOKFIHHANECJJDMJJBHLEJCKNIMCOCIODEIILADBOMMEHFMNKPAEODMBDGGLJOCGLIKGPCFPCMFIIGLBJLICCLJGHDGFBLFGDPLAJFLDCLBBLILCNIEANNECBPF.png",
          name: "새벽륨",
          level: 200,
          job: "일리움",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/DPEJOECKFEGKFIHKGNDKMOGBKCABEPNGHJPJFGEDCJBCGIDLLIHACKALOGNLOLHDFNMHIKMOACPPGINJPAFMFDHHPNIOOKNGLBCGPMHGGLKHGJLCLBDJFHLJJFBPPJBEDLGBKBBHFNELPGANCBNCFBFOJCKOKFIPHIOFAGLGFJNCCBLHLLKMOMFEJHJHGGBOJGGIAHOHKHLHNOPHFNCJKMIOAALIDOCNBPDDNCMIEPHCJHEOPOCLAOICLONJADII.png",
          name: "새벽륵",
          level: 200,
          job: "에반",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/HGIFIBIIOMFLBDCHJNDIONHPPMFPEIIDCDHFILHIEAKBPHPEOCAIFOELIIMJELLBKJGOABBKMGABCJIMBDLCPGCPBGJAGEGNBIHJOCGMOCLJPHDECBPIGCAOHLALFFEAENKJMDCOOJFKOPMIAHGIJIMLOMNGCMKBOJEKJFJPGDAKCOABNJMJKGDEEIDDKMGLNPADDHHPPJALPMIPDGOGOMBKBKOCBLIOOHLGPIKPGGEKCEINDKFDPPKFGBODLNFO.png",
          name: "새벽리아",
          level: 200,
          job: "팬텀",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/PAHHHBHFEOCPGNFAPKLEONACDBGKDHNPAAFHLGALAAGLCELGDJKCHFHBDEPBKFKPFMGJJNLDFMPDNNIPALBOFMALOENBOGCPEEDEDKOFEECKEOGAKHKEKHHHAPGFKICGHCIBNCOCCIDEBAOOEBCONHJPCNBHKAGHPJOLDDELFPBBJGAHDFJIHLEHPMEFKBBODGBJLKCGKNGDEBBMPABONGGAJFGJJGEFIGJNFHFHKDPLINLPDBHNEGGFLAMBKCCJ.png",
          name: "새벽머신",
          level: 200,
          job: "메카닉",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/IDCLLKLOOIJDHICDLLAOMHNGKFFKEDAJMPMFCILODBCAGMBLGANMFAOLMJPHOHEGBBCGNHAJPGHGOENPBAJNFODGIMGNPMDKAJJMEKEAKMOIMHOBBNNEGFKEOIDPPDKKLIBOBOGGCJJJNFGJLIINBEHIPBPAJGFJGPLAJMGBMHIGFBPIKCAHKPIAAJNENOAPDOCAEFCPJIKLBCIAFHHGFIACONNBAIGOBOBBLBLLKHMDPEBJHLBCKDPDABFIANEB.png",
          name: "새벽몽킥",
          level: 203,
          job: "캐논마스터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/KKCMHNFPLOPHIKDOPEFLFMENCMNNELMPNAAKLEAHDMDLCDAGIKDGGEHFAGLDEPOMFFDEFBEIAMKMOHANBIPHLIOEGPGODMGAFABHBDNJLJMICIHFNLANNBCPOENAINFNDNLFIHFIAFLDJFKOLHMHOBPIJBKEIIJJDEGNHIEFLOMMGIDADIGNIIAAMBEHMGIIHLCOKJLLDFNJKMCFCKKGHENPOIJIHBGJFGLIFLCJEBKOOBBLOLCKGCBEGJOBDHEF.png",
          name: "새벽밤향기",
          level: 200,
          job: "데몬어벤져",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/MNDAMANONBFFEIKLOAHCDFPFLHMOPHGHHCBGCAEEKLIGNBECLBDGAEDMEJOGEAJNEGDFKCAGDBLOPEEEMGPJGBFKPMDGJIMPMHPAKOHOGELMKDOHNNPPHBMEGOLLMNFLAFCIKOHLNEIBKJPEIIMAMMFEOLIEDMADHJLJHMOEPAGLKIMGHILOACJJGAFGENDJAGKNONMJHFHNELJDDPCDOLFEHNLJHAPDKGHAPOMFPMCFKGBLLIBJNDFILDGNJADF.png",
          name: "새벽뱉",
          level: 200,
          job: "배틀메이지",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/LOFMPOJIFFNFNMJDOBLEGDIJFOFKGDFFPLEJKEAFAEFPEOIILGKKJFNOAOFPJLEJEFCGMFGGHCANEIFKKABIBPEEGJJJNLPOKAMENJFJCOJGODMFDBBNOMCOGOOICHOOPOPOIACGOECOAPJPGGMKPKGJNBDOBJFIJBPOPPNOLDFCFOOEKJPDFGAMJPEGDAMCCOJEMFIGLOMAINOPIHMKLJPIDBMEGDJAENMHOAOKABEHIEACHFIPDFNNDBGNDFNE.png",
          name: "새벽비화",
          level: 200,
          job: "플레임위자드",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/IPPGJHPELGLIBCKLKDIEGEJHKJMBJBHIHBLGOIBGCLDJABNKFIMNGJBAIDMIOHJJCHFKEDODDBAGMDDOIAALOAELJAOOPPFGFICDKHIKDGCHHABJKGIBAPIFPJNFDGBJOPLMFBGGKPKJKMHPJIHHKAHNLPKAKNBFGHDHMJIMNNACNPKGIMDPFLFNDGNHFIFDBCFGOJDMJOMIMDKPBGPPPIJIGDKMCNBGHAOMNPPLCGFJPHMMNPEGAKJDLBEAEIOJ.png",
          name: "새벽빽",
          level: 60,
          job: "에인션트아처",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/JJODPAHFKGLCKHNJCFOAOCCEIEFFEMGAFBHFLCCOEGLHIOCNKGPHLGALGFAFJJGIMPFEKDMLJLPFDOHHPOJECMPNJLOKAHPPDMCHBHCMHANBABNEPFFCIDIMMIFIBKCCENHBGMJCDKNENKIICJLCCMJAMKLKAPDKJAAJPCHHAOFLMBFDPMPBGOMCCLCKDHNBCHOEGFPHNLDKCEMBNDCLMOEFJDAFFGCPKDAFAGLIGCKNDKFIOHGKKFEHIKPPEDON.png",
          name: "새벽숀",
          level: 207,
          job: "나이트로드",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/BDELDENGKBKKPHIEPCOKJGCEGDPBNBGBMDHCHLODKFEKDNCIMEFPOAHEDFPDLPGKEGGCOHEHNBBFGEHFMOHGCDINDOGGFHMHLEFOIKIBHHCGEKONOOAHHDIAKAABMMBODCEDEOCHOEGKOGPDIHEDBDBGHFNAEGKIIABFCFLHPDEHKDNLKJOPMEADPKFPMGPBMDMALGPACHHJGDENIFNBGABJGBLFMJGDDMEMILAFKFAEGDFDPJNFELLOMNBGFOBM.png",
          name: "새벽숑",
          level: 200,
          job: "소울마스터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/HKNCEEADCNLGMAEBELLLJIJLMEMKAMHCBKLADKFGKEAFBJBKJPIJMNANLGGJKAJFFJALAJAPCCKLKDJHLAGPOHOGOLFIJACEFIMKCDDBOGNFKPBHGADMAJDEJJILLBACGCBFHFADCBALDBEJAAPPGLCBNMAFOGMJGNBJPLINFIAFNOLFHKIJDIKKMAAEBKLKMGDJFGGIEFGPKFKCJKACAMEOOACPNCCHGMKCLMIONNLHMINFFMGCOLJGKHIPEMEM.png",
          name: "새벽쌍",
          level: 225,
          job: "듀얼블레이더",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/OJFHGJNFGILEPBNPCJMGALNALOLGJNAHAANNAPAPPKCMINLEGEAHBBBMHGLABCGBLAKMFLCMCCNIJCFHOIJFMOLFBKLNJCANJFDLPJKMCDIOKFEBCHIAGJJGCEPOPLOBNMMJBOJKNLIMCAGBPBAJAIIEDKKKCPOJEFEKIJFNKMNCIKKHFBIGMNPIPADCGANNCNPCMEHHOCKIIOEBEMIOMKEKMAGCHODHGIBNHHHBJMFFFGKGLCKOLJEAFEOEJDGB.png",
          name: "새벽아름",
          level: 200,
          job: "와일드헌터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/NJOKBHCFAKEACNNPEAJDLEGCJHFDFEEMAKABAMKBEHNAFBFOBOPCFODLMKAJDAHOIFNKNDIOACJCNDABDBHEBIHMMEHLAKKMANAJBCIJCAEDKPLKPLEKNNNEAKEICAHCDODNJEOIIKCLFJPJHONELMLGBGHGOHBDODDHCKMNMCLMENJLEKKILAPODGOLKPNGOPKAANELBHCOPLOPFIKMPFALGEBABNKFGEMHDBCJEEDFJDKLLOEMBMJBCNMLCOEG.png",
          name: "새벽욘",
          level: 241,
          job: "섀도어",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/GGGCOAGACPFPEHGMCMDDPNABDKHIJLGEEKNMKJIEIGFFCGOOMFEFLJLMLCPBKMLDHIFPLPCKPJNEAKHLGGADDCGNLCNODEJIKKLJAEBDFFMJNNCCHHCCJOEPLAOAJLHDJCHJNAPLKNEFMAPCMMEGNCAKGJCDFDAGIPMLCBHANBJIHMMEJNHKMPHPKNJIPGAPHJMBGJGIPAKFPBABGFCMCMDOKFIIKFFNHIDEBGKHGGBGGGDKDMLJMPBIHEHPMEBJ.png",
          name: "새벽욤",
          level: 200,
          job: "신궁",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/PBBCLJFKPKFAKNIACHFADAKPINKMJCBOAJMOHKMELAPKBLGODEFFOIDPJJKIGDOGEHADBONIKJJDCKHAPIKELOLIOFCOBDOMMBPADHNKPAIBPHBPDDMFAHCIJAPMJHPNHFBMBJNNBJCEALKDJBHDPDBLHGKCAGMLJKLIBKJPPMBMKBDELMJGGIMPMNNGBBPMFNHCFOIKAFEDMEMAMNOLPIHFOAHMNLLLDPILGENEMCCJHNBOIMAFFAFILMPIOFKF.png",
          name: "새벽워",
          level: 200,
          job: "나이트워커",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/DNAEGPGGMLBDBHHBFAKAGEFBFHFBKHFDMFNDNLNEMFGHGCCMECKOMNCNOGBPNDBJBJHBFOAEDMPIPOCLCPCCIJNMAALLGNGFIGLMGOHECBIEOGCNPBDMKHCDIMOCCFDFPPDJBEFCIAPCLDEFJJGBGKCPJDMAAOPBBENAJGCFOHCCILEHBANKGLBAGCBCPBPKCMGGBPHHCEFGNIJLNAFFLOMOAFLOCOEEJKCKMLCJGJJCHFNGMGFDEAMFOPPMEINO.png",
          name: "새벽읔",
          level: 200,
          job: "아크",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/JDBOJJIFJGBKEMDDLECFNKKEAHFLBJPMEBAOEHMBCAMMDPEILIGEHDKOFJLHPDPHODCLMOCGNJDMOBCOCKCMLNGOAKAOAJHHLNDLACIDJKNFMHJOIHIHEIKAAAEHGMFBLAHIMKBBEMNADNMNFCIJMOJJMEEHCLIEFIJJDCOHPEJEMOPBCNGLDLDFINHAPBGMHAJDGCODOILLKNLIKADGMEBCEKAHBGBELBECBHGNFIOJMOOMGFLHDKJGFDBAIEOF.png",
          name: "새벽체스",
          level: 200,
          job: "키네시스",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/JAHKPJILLNFLGBGPMCPFACFAKGGIBABNOLNIBHPEJJHGLMFGFLGNFGHNGBAKINAEHHEKAKOGBCHDOPJNPNKENOPDKBMPDGIBMJBDPDBGMHLMNKMLBEJOELMAPNKKNAOMHDBNBMLPDFBAFBKKEDGINACOOIAODMFBDDBOFJJLOHGHLIFMJNIAKLNLFEHHHEOBLGNEKPOECONCJJHAMGAODCPNGHAFNCPCNHEKGMCCGFAKKBHLADPOHBJCLIAIPFBH.png",
          name: "새벽칸",
          level: 200,
          job: "카인",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/NKGPDOLFJMAOOPMDMDCKGPEJOKCKNGANFIJGPANDCNGPICMKEIOBFHKMNGKEGPOIKNBCCPDPBINIMEKOHNPANCMJACCPPEGEFFKPKFHJNMIIMPLDPKIHNIDGLNBFOLIKOJFFCABHIBNKGNKAFFMAADAJLNMNFCDNAFFKNFBNOFOEGIHEDBGHDBAIPCKLGJGJDLFDCILCKAHGHBJCDGMCCEPFCLINHLECJKMMBKIBCKFPIDFNIDFMAALIHKJCAKBE.png",
          name: "새벽페",
          level: 206,
          job: "패스파인더",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/CKMPIPGKCJLLHODEKIADJBJFDFHBBFCNALGEPCCHPABMJOEGHIEOHFMMFNEDMGJKGNFPPEBMLHEIDMDEMHNPJKEGILNLPBFIDODGAPJIMKEHCJFIPKAMIGMODMCKOIIONOGJDBPEAEADMGGGJLDCPALPPKOINOEAIFBBLAPBGFBHKBAHIKMOHBBOFOECLMAKMJCFODKODFGIOEBKHKGFKGPBMEKOJEIKNBGDCFIDPNDEPKCOAIIJMBGCODKDKHHA.png",
          name: "새벽풍경",
          level: 209,
          job: "제논",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/MGKKNPFHLCKGKNFBAKALMMKHOMEJIONKIPEPNOOLCHLCFAFJHIMONBBMGEMEAHPPKJHBGCNPGEDCIFGCHLAPDKBMLOCKKIACEBPAEEKAANCOHIKPKJLJFGNFKBJPHMJJFNKCBMCJEBMEGGKPEDPCLLMHJFEMNICIMIIFKLMHFLIINPJKHEPNLJIOIGLJLDAPGCFGEEMLIMCLILCEFHNOIDDJAMGKDEGBOOKJMFPPCALBKFLENBJJIDAFODOOJGDN.png",
          name: "새벽헐",
          level: 200,
          job: "보우마스터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/AEDFABDFCMNLICEJFBKIBADDCMIGINPLCLNDEOCLEAEBEDAKKMLAGNDLNBNIBEJIAGIGBICFHIPMFDGABJEEHAIMFBLGEIKFEGLMOAAIPDHFCNIEEPAALDNPACLIKLLDLBPODOKBFLOENHPCCAHEJODOEALJGDOMILPMLEICCPEJMOAGPKIEDJILIEKPPHCHBLAMLNPNJFPJJBLMLBAJFDLICFOKIBFDFAKMKANAKAJGHAELIOELILLGDAPBCJJC.png",
          name: "새벽혀",
          level: 212,
          job: "히어로",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/NJIICEHKHFLBBJBDHKLEKJKLDGNCOCDCBPBKADGKIJLAPIAGPBNGEJDMINNFIIJDEPMKHIBJEHNLBNAEOPKLBLMPGHNCAECBCJBOAKNLLBMDHMCODNIDIBGGHEHLLPMHOODCAMEPCOIHMCOBMFFBKAAOOEBCJCOMCHKDLEEAEDFHCBKMBFPDCHICMMGPFDGGBKKFLEJPHFFFNGHLMNCCGIKPPFLOOOCJAHCKEONANNENMIJIOMKNIIFJLCDKOFCF.png",
          name: "새벽훙",
          level: 200,
          job: "호영",
        },
      ];
    })();
    infoList
      .filter((e) => ["새벽너울", "새벽욘", "새벽쌍", "새벽댈"].indexOf(e.name) != -1)
      .forEach(character.add);
    character.sort();
    stats.updateLevel();

    const event = document.createEvent("MouseEvent");
    event.initEvent("click", false, true);
    element.img.autoSelect.dispatchEvent(event);
    for (let i = 0; i < 4; i++) element.img.maplem.dispatchEvent(event);
    const posList = (() => {
      return [
        {
          x: 0,
          y: 8,
        },
        {
          x: 0,
          y: 9,
        },
        {
          x: 1,
          y: 9,
        },
        {
          x: 1,
          y: 8,
        },
        {
          x: 1,
          y: 7,
        },
        {
          x: 2,
          y: 7,
        },
        {
          x: 2,
          y: 8,
        },
        {
          x: 2,
          y: 9,
        },
        {
          x: 0,
          y: 5,
        },
        {
          x: 0,
          y: 6,
        },
        {
          x: 0,
          y: 7,
        },
        {
          x: 1,
          y: 6,
        },
        {
          x: 2,
          y: 6,
        },
        {
          x: 1,
          y: 5,
        },
        {
          x: 2,
          y: 5,
        },
        {
          x: 3,
          y: 5,
        },
        {
          x: 3,
          y: 6,
        },
        {
          x: 3,
          y: 7,
        },
        {
          x: 3,
          y: 8,
        },
        {
          x: 3,
          y: 9,
        },
        {
          x: 3,
          y: 10,
        },
      ];
    })();
    posList.forEach(map.select);

    board = Array.from(Array(TILE.ROW), () => Array(TILE.COL).fill(0));
    TILE.GROUP.forEach((g, i) => g.forEach((p) => (board[p.y][p.x] = i)));
    console.log(board);
  }
  chch2316() {
    const infoList = (() => {
      return [
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/LFKALKBPLBKNPPPFBKNLMHEEGKDKPOOJCLHMJBOFNGIFGEGJFOOEBNGBENPBKPGJCEMKCGDHADCFOJMEKAJDHPPFMPMJGJNEKNCFEEAOACKEFBADNLMMAPFEFJBCPAGFDNOOGPEEGNOGHIOLKAHIAEGNMBFFNCIABGOOLHAIHDELAKAOOCAHBEPHFHBBMBHCODHPAAMPCMKKKAMEBDFDPEKPLIFDMAPGPLMOJMPFBEHECNBMHEMNOLAKEPGIAFMK.png",
          name: "새벽너울",
          level: 250,
          job: "팬텀",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/MJBCLOHHJLAEGBJBOFJCPJJINIDIPEKLMICBMDFIMPLCFDAICGJOPLJIGGPJEBIBEOHJFBCEJFEBJADILAPJMKMKNNMMEAMGKOCOEBJKNKBEOPKMODNCMOJAFCOLJAFDOPEEELMHALOMFPMOMDFKAJCJCPHJCPJCPENFGJKMBPCLNNFEICHNNBNNOKECNCDPFLEBFIIOLCLPKHFDIDPPEAIAIKEOFMEHANEMHJFDGLOIHABJEIPKOJKFBALKJAKA.png",
          name: "ygh메르",
          level: 200,
          job: "메르세데스",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/KEPNLPKLEGEGHAFIKJIEMMDKKFKBHFBLNJDFDENCHAFBGCFIMDIPICOOKGIDDGFBPJHPGGCJNILACKNFNBGLMDAEPKAEJAACLDJJNCGNJDEGJBKMOKCAIBDKJFDFDBBIJCMFFHAJIEPIDNLJIPBBLPDCLLMCKEJGBCMELGGPJEHPICHBHMBEAEOFPDILIGCBLCPJGKGMJOBABILCGCMIMJEGAANDNHDKPOCEPCCPJONCJPCCOHHDIFPNJKENEILK.png",
          name: "ygh미하일",
          level: 200,
          job: "미하일",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/EHPPMKKAJLADMNDEKOPJABENBDPANDKGGGPBDPMEMILFDHGENHKFIEAPNMLFOMJHOBPBLFBNNBBKNGCEFLJIMCOKLLMGOBEHAJCNHPLECOKJDFIENPLBHCCJEHPHNOFDHNJDANKGNGBKCGDALPONGHNMHEEKLMIFOMIIJNCPNDIPILIEOJAECIMIEBNHJLLONECPDLPKHPIKCAFHHHODCALKPEGJLNHDCEMHOMCHPKAGLOJMMEGAEOBFFOCIGIBO.png",
          name: "ygh버스터",
          level: 204,
          job: "엔젤릭버스터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/OIFMDFEGFOPILBBMEOJPJAIIICKENHGLAKIALEOIJHBBHIIPGCINGMMMMPMBMJLENPLODKPAAHOJFBOKJBKIDBLLFFINACIGKDELLDLBMOHAKNIGDFHMABFHLMAHPLDCGIHBDJEDFGGACCFOONKHMOIBGDLPOBHJOIMNLMCNDOMEDDIONFKCBMFIEJACCLEMBFPNLAJGMLOLNONNGHBBJGDDHOAMGPEBEAOFCLAFDLBMLPFOKFDJLIKPNPNBMAKN.png",
          name: "ygh스븐",
          level: 200,
          job: "스트라이커",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/IKGOBKDMDBEPGMDDAMGFOOFKAGOLJCJOCHDLMHAMOAAMABBNKKBHBJAJOOKPMGBMGAGGCNHJGIBFJECEEBGBCCFIIIBJIHCIOIJNGNMPMGGAPNBIICGKGCAMIDHFOGMPICLLMPGFCKGPOBDKNKFIDBFDELGPLJIBAPHCADHNPJPHAJLKLLNIFOGCPOKLJJIDIGCHAAMBLJNGFIKGFINKNCLCDADOCKFOEACIGEPKGKEGGNLFFPOMDBMLOKJALPAP.png",
          name: "ygh은월",
          level: 200,
          job: "은월",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/DNENAIABPLDNGNPLELEEKHJIHHMOOKADPPBHHHCCJLNHGHJNCMFIACEJEPMFFPIDPCGOIEGLMAGKDHJPNCDKHPEBFJOCEKAIABGIPOBIDFNLFNAJAOOGIGHAAOIPCBIGPJFAKNNJBMAAGMJCCIGDFBIIKNGNLCJABNEBPELKFMKHJJMEBLLNPGMFLIKDCBKHEJAFPNBPAIAOGMNNBGKPABICOLNOHKBNFIKBKNKIAPEBMKHGLLFJOIAPMGLAIEBL.png",
          name: "ygh펜타곤",
          level: 200,
          job: "카이저",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/PKFEPEMEFENKDEPIBHJCBIMABLKCDJMHFEGOGGNJKIAPPBPPCDNEEKKAMIEKJPJNPNJEHPINLFDOCIJAOCMIEJOINOFNKMKONMBGLLABAEHOBLNNOFDJAFECMHHIJAENNJOIEAENKNBCAOJBDADKFJJKAMOMKPNDGCGJOHPEBAFINCPMAKBMFKONACJPMHPGFKODMKOBHFBABFKHJKEPMFDECDELJFADJCELFPGKOKODPEFGJGOBEICDFIENNLBN.png",
          name: "새벽가시",
          level: 200,
          job: "데몬슬레이어",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/NPAIHOGFBBBIACLJKMLCLLFNKDNHIKNKAJCNIMECNGLEJBPACBEGKMJCDAGHGECEHJMFCMGBEPCILNAKICKOHONHCGJCMMOHLOGKHOLGOIMABIJFKNKJDOFEPFBNKKMDOLFGALJGNNJLJMECONGHFIFPEPMDIIANNEFFNFBOHKCKBHLHAOIKFFIOFBPANFIBFBHAKGJPOHEMKGACPFCBEIMDMDPPGDEAHCBMODBPDBDKJLJKGEADCGABEMJEHBFJ.png",
          name: "새벽가지",
          level: 201,
          job: "제로",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/KHLPDBHPNOAOLGNAMFCKCFFMPJJENCEBPKNIOHFOGAKNDGNEDHFPEBINBIDIILLOEGMCIOOPAFCBCOLPCLJMKBFMGFGEEMEGKJNAPBBFNKKFOOHBNGAOOMCOONBPDHDHGIPBNHFFDMEBNLJHHBPLDMBAAHJPLJMHPAFOIFKHLIEKHNLAJMADHHIPCAIHGJMLJNPPMEHFLGNFJNOJIKNDANNIHPACNBLNFEFEPGGBNJCAGBODOKKCPGICNJLOHFBP.png",
          name: "새벽권",
          level: 200,
          job: "캡틴",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/MNBLNKHNMNFFAONHPOOLECNAPAOMLKCFKOBPEOKKFOAKCFGPKHOOJLJCEHIDKELGCLFGMCKPBNJDPMLEIEIHLPODKIDDBHLPMKGOAFKAPAGOOKBDCMNOLDHAHMFEFEMDNEPOLJIBGELMKINDDMKMLMMCICPHADIAEMNDHGPDFILNEFANDNBKCILGKMLHFCHPDLEAICDHJEDMIFGDAHEGLFCCGLCBOGMJKDAKHBLFLKJOKBCNNLMFENBGKFMJFOAC.png",
          name: "새벽댈",
          level: 217,
          job: "아델",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/CMDFKMGKIMCCFNEEHNBHIOAIDJPAJBCDAIJDLIPENJLMMNHMLBLKDNMMPINFJEBFELBMAKBNGJCDNLHKGIFDBKKOOEFJKPBPHGDKMLPJICDCPPKAGOOAIJDJAIANLMPBAIDKOAHFPAMFOKJLDKDJGNBBHCFBFADKPMIEFDMJHOBPBEIJCNGGDENIABNEGJJJPHBHGNEMHAIJLLMOPOAPAIGBODEBJDEIMMKMGKBILNHBLFBNJLIGEFAODCGCAJFP.png",
          name: "새벽덱",
          level: 200,
          job: "카데나",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/MMIBBNHNPLMAICNHPCOKHLAFBGJBOJABHJBMGKFLNPCOBMEDKIHFDAHGACFMKONBOANGOLLMJCJNHNNPAGODGBKOOCDDJDJKJMHHAKLCBCJIDODFEIENCDGGCBMNOIIAKNBJNDEBDKLLIICKPIMAJGBFBCIGDMHIEAENGHKLKIHDAEGJEFBHDGFLBPJKNJAPAIMENFGBMENHJOPELFEMAKFAOIPNODFFIJGDNMGNCKHLBCINCMEPAHOKLGOPAIEH.png",
          name: "새벽뚝",
          level: 200,
          job: "팔라딘",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/JJJIPCNPNLGDKGHBABLIJIOMGNDBHIMGCBEOMBOKCAIBKDPFPFEAMEPPNPFOKNNACMNLNJJJBEOIMBOEHBHLFIFOGIPHAAIFIMPMBJMDHJJJOEHCAMIJBLCEMJBNINOOGFELFHACCDNGIMODOMHFDMBLGMJJOOJLBPKCGPCGNBEBABHLMLIDJNNGHGKKONCDDBHIAFLDKIHMMKGBJNJFMEPJLMBIMPDNKIPAGCBGDCIAGDMDIMMMOLKMKGJCNIPD.png",
          name: "새벽랫",
          level: 200,
          job: "블래스터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/DIENIFANJFDNPPHKMKNCDGDIGBDHDGFIOIIMCLGALAMLHCMEHAONLHCLHPLHFLFACNEAAIEHCGEIEMCHICEJPBJPAJCBONJFKMANNKIMAHLCGAJDNPPGGLCEFNNIHLHCAMHMPOMPLAFNLNCKFCOMHPIDFPNMMKCBIMLBDLLGABFBIOPKPFOLNNMPPLCBGHAAHHFEMAKHCEBPCNEOGGMGKMIKFACHMCJOOOCJGKOFFDGFEAKNENKJNMHHOGGJCPMH.png",
          name: "새벽랸",
          level: 200,
          job: "아란",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/KCPJFCHKJDPFKBLGKMIFIGLBEPLLOIAFGFOMAANOPLLHAIHBIGMCHKBAENBNJDAHKOILPIBGJCHOMAMOLBJCJJHLBKAFNGLMDJJKLKDJACLNCGIGAGAEOMIIIEFGCOEGLGGOHBAJFAFMHDMOHOHHMLBDJMNDKOALMFABOCFNMFJPKOKKMHDGIFOOHGLCPJOGLJBPLKAOKJKFAJCIINLAFOJBBICFEDNAHLPOEMKHPFCKECBEELJJMCGPEMPPBDDA.png",
          name: "새벽레",
          level: 220,
          job: "윈드브레이커",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/BJPIDHBKLOBNMDOPLALNHJHKBIEFGIGGHNNOKFGCAEOGMINLLNAKFEINAFDINPHGOMFJAGOJENPGNPCJMMPIEMGEDMOMLJADOCCKGMNGOFLHHELOCIJJCAANHNINCKCDFFGHOHJIHOLHBJNPOBLAPAPIODENLAHHMONHPILJFMCNAJOLODCCDPDJHPGODBKPFONEBPNMEPFAEONAHBIFEKCAHLAJMCNJPMLANDGBCJHKIACLIIPOKGHGNNODJHHO.png",
          name: "새벽루믿",
          level: 200,
          job: "루미너스",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/GBEGDHHJHPJNILECGBFPPEANHLPCHECEOHJNJHBFJGKEAHLINHJAFNDKIIIMAKJMGNKKBJLPOGDLCGJLAJMJHJNPJOPPCGPKKKCHAJLGECBMNPKFPNDBOICLBAENJEPDGEECILOKFIHHANECJJDMJJBHLEJCKNIMCOCIODEIILADBOMMEHFMNKPAEODMBDGGLJOCGLIKGPCFPCMFIIGLBJLICCLJGHDGFBLFGDPLAJFLDCLBBLILCNIEANNECBPF.png",
          name: "새벽륨",
          level: 200,
          job: "일리움",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/DPEJOECKFEGKFIHKGNDKMOGBKCABEPNGHJPJFGEDCJBCGIDLLIHACKALOGNLOLHDFNMHIKMOACPPGINJPAFMFDHHPNIOOKNGLBCGPMHGGLKHGJLCLBDJFHLJJFBPPJBEDLGBKBBHFNELPGANCBNCFBFOJCKOKFIPHIOFAGLGFJNCCBLHLLKMOMFEJHJHGGBOJGGIAHOHKHLHNOPHFNCJKMIOAALIDOCNBPDDNCMIEPHCJHEOPOCLAOICLONJADII.png",
          name: "새벽륵",
          level: 200,
          job: "에반",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/HGIFIBIIOMFLBDCHJNDIONHPPMFPEIIDCDHFILHIEAKBPHPEOCAIFOELIIMJELLBKJGOABBKMGABCJIMBDLCPGCPBGJAGEGNBIHJOCGMOCLJPHDECBPIGCAOHLALFFEAENKJMDCOOJFKOPMIAHGIJIMLOMNGCMKBOJEKJFJPGDAKCOABNJMJKGDEEIDDKMGLNPADDHHPPJALPMIPDGOGOMBKBKOCBLIOOHLGPIKPGGEKCEINDKFDPPKFGBODLNFO.png",
          name: "새벽리아",
          level: 200,
          job: "팬텀",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/PAHHHBHFEOCPGNFAPKLEONACDBGKDHNPAAFHLGALAAGLCELGDJKCHFHBDEPBKFKPFMGJJNLDFMPDNNIPALBOFMALOENBOGCPEEDEDKOFEECKEOGAKHKEKHHHAPGFKICGHCIBNCOCCIDEBAOOEBCONHJPCNBHKAGHPJOLDDELFPBBJGAHDFJIHLEHPMEFKBBODGBJLKCGKNGDEBBMPABONGGAJFGJJGEFIGJNFHFHKDPLINLPDBHNEGGFLAMBKCCJ.png",
          name: "새벽머신",
          level: 200,
          job: "메카닉",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/IDCLLKLOOIJDHICDLLAOMHNGKFFKEDAJMPMFCILODBCAGMBLGANMFAOLMJPHOHEGBBCGNHAJPGHGOENPBAJNFODGIMGNPMDKAJJMEKEAKMOIMHOBBNNEGFKEOIDPPDKKLIBOBOGGCJJJNFGJLIINBEHIPBPAJGFJGPLAJMGBMHIGFBPIKCAHKPIAAJNENOAPDOCAEFCPJIKLBCIAFHHGFIACONNBAIGOBOBBLBLLKHMDPEBJHLBCKDPDABFIANEB.png",
          name: "새벽몽킥",
          level: 203,
          job: "캐논마스터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/KKCMHNFPLOPHIKDOPEFLFMENCMNNELMPNAAKLEAHDMDLCDAGIKDGGEHFAGLDEPOMFFDEFBEIAMKMOHANBIPHLIOEGPGODMGAFABHBDNJLJMICIHFNLANNBCPOENAINFNDNLFIHFIAFLDJFKOLHMHOBPIJBKEIIJJDEGNHIEFLOMMGIDADIGNIIAAMBEHMGIIHLCOKJLLDFNJKMCFCKKGHENPOIJIHBGJFGLIFLCJEBKOOBBLOLCKGCBEGJOBDHEF.png",
          name: "새벽밤향기",
          level: 200,
          job: "데몬어벤져",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/MNDAMANONBFFEIKLOAHCDFPFLHMOPHGHHCBGCAEEKLIGNBECLBDGAEDMEJOGEAJNEGDFKCAGDBLOPEEEMGPJGBFKPMDGJIMPMHPAKOHOGELMKDOHNNPPHBMEGOLLMNFLAFCIKOHLNEIBKJPEIIMAMMFEOLIEDMADHJLJHMOEPAGLKIMGHILOACJJGAFGENDJAGKNONMJHFHNELJDDPCDOLFEHNLJHAPDKGHAPOMFPMCFKGBLLIBJNDFILDGNJADF.png",
          name: "새벽뱉",
          level: 200,
          job: "배틀메이지",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/LOFMPOJIFFNFNMJDOBLEGDIJFOFKGDFFPLEJKEAFAEFPEOIILGKKJFNOAOFPJLEJEFCGMFGGHCANEIFKKABIBPEEGJJJNLPOKAMENJFJCOJGODMFDBBNOMCOGOOICHOOPOPOIACGOECOAPJPGGMKPKGJNBDOBJFIJBPOPPNOLDFCFOOEKJPDFGAMJPEGDAMCCOJEMFIGLOMAINOPIHMKLJPIDBMEGDJAENMHOAOKABEHIEACHFIPDFNNDBGNDFNE.png",
          name: "새벽비화",
          level: 200,
          job: "플레임위자드",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/IPPGJHPELGLIBCKLKDIEGEJHKJMBJBHIHBLGOIBGCLDJABNKFIMNGJBAIDMIOHJJCHFKEDODDBAGMDDOIAALOAELJAOOPPFGFICDKHIKDGCHHABJKGIBAPIFPJNFDGBJOPLMFBGGKPKJKMHPJIHHKAHNLPKAKNBFGHDHMJIMNNACNPKGIMDPFLFNDGNHFIFDBCFGOJDMJOMIMDKPBGPPPIJIGDKMCNBGHAOMNPPLCGFJPHMMNPEGAKJDLBEAEIOJ.png",
          name: "새벽빽",
          level: 60,
          job: "에인션트아처",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/JJODPAHFKGLCKHNJCFOAOCCEIEFFEMGAFBHFLCCOEGLHIOCNKGPHLGALGFAFJJGIMPFEKDMLJLPFDOHHPOJECMPNJLOKAHPPDMCHBHCMHANBABNEPFFCIDIMMIFIBKCCENHBGMJCDKNENKIICJLCCMJAMKLKAPDKJAAJPCHHAOFLMBFDPMPBGOMCCLCKDHNBCHOEGFPHNLDKCEMBNDCLMOEFJDAFFGCPKDAFAGLIGCKNDKFIOHGKKFEHIKPPEDON.png",
          name: "새벽숀",
          level: 207,
          job: "나이트로드",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/BDELDENGKBKKPHIEPCOKJGCEGDPBNBGBMDHCHLODKFEKDNCIMEFPOAHEDFPDLPGKEGGCOHEHNBBFGEHFMOHGCDINDOGGFHMHLEFOIKIBHHCGEKONOOAHHDIAKAABMMBODCEDEOCHOEGKOGPDIHEDBDBGHFNAEGKIIABFCFLHPDEHKDNLKJOPMEADPKFPMGPBMDMALGPACHHJGDENIFNBGABJGBLFMJGDDMEMILAFKFAEGDFDPJNFELLOMNBGFOBM.png",
          name: "새벽숑",
          level: 200,
          job: "소울마스터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/HKNCEEADCNLGMAEBELLLJIJLMEMKAMHCBKLADKFGKEAFBJBKJPIJMNANLGGJKAJFFJALAJAPCCKLKDJHLAGPOHOGOLFIJACEFIMKCDDBOGNFKPBHGADMAJDEJJILLBACGCBFHFADCBALDBEJAAPPGLCBNMAFOGMJGNBJPLINFIAFNOLFHKIJDIKKMAAEBKLKMGDJFGGIEFGPKFKCJKACAMEOOACPNCCHGMKCLMIONNLHMINFFMGCOLJGKHIPEMEM.png",
          name: "새벽쌍",
          level: 225,
          job: "듀얼블레이더",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/OJFHGJNFGILEPBNPCJMGALNALOLGJNAHAANNAPAPPKCMINLEGEAHBBBMHGLABCGBLAKMFLCMCCNIJCFHOIJFMOLFBKLNJCANJFDLPJKMCDIOKFEBCHIAGJJGCEPOPLOBNMMJBOJKNLIMCAGBPBAJAIIEDKKKCPOJEFEKIJFNKMNCIKKHFBIGMNPIPADCGANNCNPCMEHHOCKIIOEBEMIOMKEKMAGCHODHGIBNHHHBJMFFFGKGLCKOLJEAFEOEJDGB.png",
          name: "새벽아름",
          level: 200,
          job: "와일드헌터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/NJOKBHCFAKEACNNPEAJDLEGCJHFDFEEMAKABAMKBEHNAFBFOBOPCFODLMKAJDAHOIFNKNDIOACJCNDABDBHEBIHMMEHLAKKMANAJBCIJCAEDKPLKPLEKNNNEAKEICAHCDODNJEOIIKCLFJPJHONELMLGBGHGOHBDODDHCKMNMCLMENJLEKKILAPODGOLKPNGOPKAANELBHCOPLOPFIKMPFALGEBABNKFGEMHDBCJEEDFJDKLLOEMBMJBCNMLCOEG.png",
          name: "새벽욘",
          level: 241,
          job: "섀도어",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/GGGCOAGACPFPEHGMCMDDPNABDKHIJLGEEKNMKJIEIGFFCGOOMFEFLJLMLCPBKMLDHIFPLPCKPJNEAKHLGGADDCGNLCNODEJIKKLJAEBDFFMJNNCCHHCCJOEPLAOAJLHDJCHJNAPLKNEFMAPCMMEGNCAKGJCDFDAGIPMLCBHANBJIHMMEJNHKMPHPKNJIPGAPHJMBGJGIPAKFPBABGFCMCMDOKFIIKFFNHIDEBGKHGGBGGGDKDMLJMPBIHEHPMEBJ.png",
          name: "새벽욤",
          level: 200,
          job: "신궁",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/PBBCLJFKPKFAKNIACHFADAKPINKMJCBOAJMOHKMELAPKBLGODEFFOIDPJJKIGDOGEHADBONIKJJDCKHAPIKELOLIOFCOBDOMMBPADHNKPAIBPHBPDDMFAHCIJAPMJHPNHFBMBJNNBJCEALKDJBHDPDBLHGKCAGMLJKLIBKJPPMBMKBDELMJGGIMPMNNGBBPMFNHCFOIKAFEDMEMAMNOLPIHFOAHMNLLLDPILGENEMCCJHNBOIMAFFAFILMPIOFKF.png",
          name: "새벽워",
          level: 200,
          job: "나이트워커",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/DNAEGPGGMLBDBHHBFAKAGEFBFHFBKHFDMFNDNLNEMFGHGCCMECKOMNCNOGBPNDBJBJHBFOAEDMPIPOCLCPCCIJNMAALLGNGFIGLMGOHECBIEOGCNPBDMKHCDIMOCCFDFPPDJBEFCIAPCLDEFJJGBGKCPJDMAAOPBBENAJGCFOHCCILEHBANKGLBAGCBCPBPKCMGGBPHHCEFGNIJLNAFFLOMOAFLOCOEEJKCKMLCJGJJCHFNGMGFDEAMFOPPMEINO.png",
          name: "새벽읔",
          level: 200,
          job: "아크",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/JDBOJJIFJGBKEMDDLECFNKKEAHFLBJPMEBAOEHMBCAMMDPEILIGEHDKOFJLHPDPHODCLMOCGNJDMOBCOCKCMLNGOAKAOAJHHLNDLACIDJKNFMHJOIHIHEIKAAAEHGMFBLAHIMKBBEMNADNMNFCIJMOJJMEEHCLIEFIJJDCOHPEJEMOPBCNGLDLDFINHAPBGMHAJDGCODOILLKNLIKADGMEBCEKAHBGBELBECBHGNFIOJMOOMGFLHDKJGFDBAIEOF.png",
          name: "새벽체스",
          level: 200,
          job: "키네시스",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/JAHKPJILLNFLGBGPMCPFACFAKGGIBABNOLNIBHPEJJHGLMFGFLGNFGHNGBAKINAEHHEKAKOGBCHDOPJNPNKENOPDKBMPDGIBMJBDPDBGMHLMNKMLBEJOELMAPNKKNAOMHDBNBMLPDFBAFBKKEDGINACOOIAODMFBDDBOFJJLOHGHLIFMJNIAKLNLFEHHHEOBLGNEKPOECONCJJHAMGAODCPNGHAFNCPCNHEKGMCCGFAKKBHLADPOHBJCLIAIPFBH.png",
          name: "새벽칸",
          level: 200,
          job: "카인",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/NKGPDOLFJMAOOPMDMDCKGPEJOKCKNGANFIJGPANDCNGPICMKEIOBFHKMNGKEGPOIKNBCCPDPBINIMEKOHNPANCMJACCPPEGEFFKPKFHJNMIIMPLDPKIHNIDGLNBFOLIKOJFFCABHIBNKGNKAFFMAADAJLNMNFCDNAFFKNFBNOFOEGIHEDBGHDBAIPCKLGJGJDLFDCILCKAHGHBJCDGMCCEPFCLINHLECJKMMBKIBCKFPIDFNIDFMAALIHKJCAKBE.png",
          name: "새벽페",
          level: 206,
          job: "패스파인더",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/CKMPIPGKCJLLHODEKIADJBJFDFHBBFCNALGEPCCHPABMJOEGHIEOHFMMFNEDMGJKGNFPPEBMLHEIDMDEMHNPJKEGILNLPBFIDODGAPJIMKEHCJFIPKAMIGMODMCKOIIONOGJDBPEAEADMGGGJLDCPALPPKOINOEAIFBBLAPBGFBHKBAHIKMOHBBOFOECLMAKMJCFODKODFGIOEBKHKGFKGPBMEKOJEIKNBGDCFIDPNDEPKCOAIIJMBGCODKDKHHA.png",
          name: "새벽풍경",
          level: 209,
          job: "제논",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/MGKKNPFHLCKGKNFBAKALMMKHOMEJIONKIPEPNOOLCHLCFAFJHIMONBBMGEMEAHPPKJHBGCNPGEDCIFGCHLAPDKBMLOCKKIACEBPAEEKAANCOHIKPKJLJFGNFKBJPHMJJFNKCBMCJEBMEGGKPEDPCLLMHJFEMNICIMIIFKLMHFLIINPJKHEPNLJIOIGLJLDAPGCFGEEMLIMCLILCEFHNOIDDJAMGKDEGBOOKJMFPPCALBKFLENBJJIDAFODOOJGDN.png",
          name: "새벽헐",
          level: 200,
          job: "보우마스터",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/AEDFABDFCMNLICEJFBKIBADDCMIGINPLCLNDEOCLEAEBEDAKKMLAGNDLNBNIBEJIAGIGBICFHIPMFDGABJEEHAIMFBLGEIKFEGLMOAAIPDHFCNIEEPAALDNPACLIKLLDLBPODOKBFLOENHPCCAHEJODOEALJGDOMILPMLEICCPEJMOAGPKIEDJILIEKPPHCHBLAMLNPNJFPJJBLMLBAJFDLICFOKIBFDFAKMKANAKAJGHAELIOELILLGDAPBCJJC.png",
          name: "새벽혀",
          level: 212,
          job: "히어로",
        },
        {
          imgUrl:
            "https://avatar.maplestory.nexon.com/Character/NJIICEHKHFLBBJBDHKLEKJKLDGNCOCDCBPBKADGKIJLAPIAGPBNGEJDMINNFIIJDEPMKHIBJEHNLBNAEOPKLBLMPGHNCAECBCJBOAKNLLBMDHMCODNIDIBGGHEHLLPMHOODCAMEPCOIHMCOBMFFBKAAOOEBCJCOMCHKDLEEAEDFHCBKMBFPDCHICMMGPFDGGBKKFLEJPHFFFNGHLMNCCGIKPPFLOOOCJAHCKEONANNENMIJIOMKNIIFJLCDKOFCF.png",
          name: "새벽훙",
          level: 200,
          job: "호영",
        },
      ];
    })();
    infoList.forEach(character.add);
    character.sort();
    stats.updateLevel();

    const event = document.createEvent("MouseEvent");
    event.initEvent("click", false, true);
    element.img.autoSelect.dispatchEvent(event);
    for (let i = 0; i < 4; i++) element.img.maplem.dispatchEvent(event);

    const posList = (() => {
      return [
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: 1,
        },
        {
          x: 0,
          y: 2,
        },
        {
          x: 0,
          y: 3,
        },
        {
          x: 0,
          y: 4,
        },
        {
          x: 0,
          y: 5,
        },
        {
          x: 0,
          y: 6,
        },
        {
          x: 0,
          y: 7,
        },
        {
          x: 0,
          y: 8,
        },
        {
          x: 0,
          y: 9,
        },
        {
          x: 1,
          y: 1,
        },
        {
          x: 1,
          y: 2,
        },
        {
          x: 1,
          y: 3,
        },
        {
          x: 1,
          y: 4,
        },
        {
          x: 1,
          y: 5,
        },
        {
          x: 1,
          y: 6,
        },
        {
          x: 1,
          y: 7,
        },
        {
          x: 1,
          y: 8,
        },
        {
          x: 1,
          y: 9,
        },
        {
          x: 2,
          y: 2,
        },
        {
          x: 2,
          y: 3,
        },
        {
          x: 2,
          y: 4,
        },
        {
          x: 2,
          y: 5,
        },
        {
          x: 2,
          y: 6,
        },
        {
          x: 2,
          y: 7,
        },
        {
          x: 2,
          y: 8,
        },
        {
          x: 2,
          y: 9,
        },
        {
          x: 3,
          y: 3,
        },
        {
          x: 3,
          y: 4,
        },
        {
          x: 3,
          y: 5,
        },
        {
          x: 3,
          y: 6,
        },
        {
          x: 3,
          y: 7,
        },
        {
          x: 3,
          y: 8,
        },
        {
          x: 3,
          y: 9,
        },
        {
          x: 4,
          y: 4,
        },
        {
          x: 4,
          y: 5,
        },
        {
          x: 4,
          y: 6,
        },
        {
          x: 4,
          y: 7,
        },
        {
          x: 4,
          y: 8,
        },
        {
          x: 4,
          y: 9,
        },
        {
          x: 0,
          y: 10,
        },
        {
          x: 0,
          y: 11,
        },
        {
          x: 0,
          y: 12,
        },
        {
          x: 0,
          y: 13,
        },
        {
          x: 0,
          y: 14,
        },
        {
          x: 0,
          y: 15,
        },
        {
          x: 0,
          y: 16,
        },
        {
          x: 0,
          y: 17,
        },
        {
          x: 0,
          y: 18,
        },
        {
          x: 0,
          y: 19,
        },
        {
          x: 1,
          y: 10,
        },
        {
          x: 1,
          y: 11,
        },
        {
          x: 1,
          y: 12,
        },
        {
          x: 1,
          y: 13,
        },
        {
          x: 1,
          y: 14,
        },
        {
          x: 1,
          y: 15,
        },
        {
          x: 1,
          y: 16,
        },
        {
          x: 1,
          y: 17,
        },
        {
          x: 1,
          y: 18,
        },
        {
          x: 2,
          y: 10,
        },
        {
          x: 2,
          y: 11,
        },
        {
          x: 2,
          y: 12,
        },
        {
          x: 2,
          y: 13,
        },
        {
          x: 2,
          y: 14,
        },
        {
          x: 2,
          y: 15,
        },
        {
          x: 2,
          y: 16,
        },
        {
          x: 2,
          y: 17,
        },
        {
          x: 3,
          y: 10,
        },
        {
          x: 3,
          y: 11,
        },
        {
          x: 3,
          y: 12,
        },
        {
          x: 3,
          y: 13,
        },
        {
          x: 3,
          y: 14,
        },
        {
          x: 3,
          y: 15,
        },
        {
          x: 3,
          y: 16,
        },
        {
          x: 4,
          y: 10,
        },
        {
          x: 4,
          y: 11,
        },
        {
          x: 4,
          y: 12,
        },
        {
          x: 4,
          y: 13,
        },
        {
          x: 4,
          y: 14,
        },
        {
          x: 4,
          y: 15,
        },
        {
          x: 5,
          y: 9,
        },
        {
          x: 6,
          y: 9,
        },
        {
          x: 7,
          y: 9,
        },
        {
          x: 8,
          y: 9,
        },
        {
          x: 9,
          y: 9,
        },
        {
          x: 10,
          y: 9,
        },
        {
          x: 11,
          y: 9,
        },
        {
          x: 12,
          y: 9,
        },
        {
          x: 13,
          y: 9,
        },
        {
          x: 14,
          y: 9,
        },
        {
          x: 15,
          y: 9,
        },
        {
          x: 16,
          y: 9,
        },
        {
          x: 17,
          y: 9,
        },
        {
          x: 17,
          y: 10,
        },
        {
          x: 17,
          y: 11,
        },
        {
          x: 17,
          y: 12,
        },
        {
          x: 17,
          y: 13,
        },
        {
          x: 17,
          y: 14,
        },
        {
          x: 17,
          y: 15,
        },
        {
          x: 18,
          y: 10,
        },
        {
          x: 18,
          y: 11,
        },
        {
          x: 18,
          y: 12,
        },
        {
          x: 18,
          y: 13,
        },
        {
          x: 18,
          y: 14,
        },
        {
          x: 18,
          y: 15,
        },
        {
          x: 18,
          y: 16,
        },
        {
          x: 19,
          y: 10,
        },
        {
          x: 19,
          y: 11,
        },
        {
          x: 19,
          y: 12,
        },
        {
          x: 19,
          y: 13,
        },
        {
          x: 19,
          y: 14,
        },
        {
          x: 19,
          y: 15,
        },
        {
          x: 19,
          y: 16,
        },
        {
          x: 19,
          y: 17,
        },
        {
          x: 20,
          y: 10,
        },
        {
          x: 20,
          y: 11,
        },
        {
          x: 20,
          y: 12,
        },
        {
          x: 20,
          y: 13,
        },
        {
          x: 20,
          y: 14,
        },
        {
          x: 20,
          y: 15,
        },
        {
          x: 20,
          y: 16,
        },
        {
          x: 20,
          y: 17,
        },
        {
          x: 20,
          y: 18,
        },
        {
          x: 21,
          y: 10,
        },
        {
          x: 21,
          y: 11,
        },
        {
          x: 21,
          y: 12,
        },
        {
          x: 21,
          y: 13,
        },
        {
          x: 21,
          y: 14,
        },
        {
          x: 21,
          y: 15,
        },
        {
          x: 21,
          y: 16,
        },
        {
          x: 21,
          y: 17,
        },
        {
          x: 21,
          y: 18,
        },
        {
          x: 21,
          y: 19,
        },
        {
          x: 18,
          y: 9,
        },
        {
          x: 19,
          y: 9,
        },
        {
          x: 20,
          y: 9,
        },
        {
          x: 21,
          y: 9,
        },
        {
          x: 21,
          y: 8,
        },
        {
          x: 20,
          y: 8,
        },
        {
          x: 19,
          y: 8,
        },
        {
          x: 18,
          y: 8,
        },
        {
          x: 17,
          y: 8,
        },
        {
          x: 17,
          y: 7,
        },
        {
          x: 18,
          y: 7,
        },
        {
          x: 19,
          y: 7,
        },
        {
          x: 20,
          y: 7,
        },
        {
          x: 21,
          y: 7,
        },
        {
          x: 21,
          y: 6,
        },
        {
          x: 20,
          y: 6,
        },
      ];
    })();
    posList.forEach(map.select);
  }
  // 선택된 타일들을 통해 Mino() 배열을 만들고 선택된 영역을 통해 2차원배열 map을 만듦
  init() {
    board = [];

    this.iteration = 0;
    this.abort = false;

    this.minos = [];
    this.stack = [];
    this.spots = { restricted: new Spot(), normal: new Spot() };

    // board 초기화
    board = Array.from(Array(TILE.ROW), () => Array(TILE.COL).fill(0));
    map.selectedPos.forEach((p) => (board[p.y][p.x] = 1));

    // this.minos 초기화
    for (let jobClass in stats.minoCount)
      stats.minoCount[jobClass].forEach((count, rankIdx) => {
        if (count) this.minos.push(new Mino(jobClass, rankIdx, count));
      });
    this.minos.sort((a, b) => b.rankIdx - a.rankIdx);

    // this.spots 초기화
    for (let y = 0; y < TILE.ROW; y++)
      for (let x = 0; x < TILE.COL; x++) {
        if (board[y][x] == 1) {
          let point = new Point(x, y);
          this.spots.normal.points.push(point);
          if (point.updateAdjacent() <= 1) this.spots.restricted.points.push(point);
        }
      }
  }
  // 중심 영역 4곳 중 헤드가 한 곳이라도 있는지
  isCenterValid() {
    const cx = TILE.COL / 2;
    const cy = TILE.ROW / 2;

    for (p of [
      [-1, -1],
      [-1, 0],
      [0, -1],
      [0, 0],
    ])
      if (this.map[cy + p[0]][cx + p[1]] >= 200) return true;
    return false;
  }

  async solve(batchSize = 30000) {
    // 초기 세팅
    this.init();
    const startTime = +new Date();
    let valid = true;

    // 연산
    while (!this.abort) {
      if (valid) {
        // 테스트 코드
        // await new Promise((resolve) => setTimeout(resolve, 0));
        // const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
        // DrawSolution();
        // await _sleep(1000);

        for (let spotName in this.spots) {
          let spot = this.spots[spotName];
          if (spot.points.length) {
            if (
              spot.minoIdx < this.minos.length &&
              spot.shapeIdx < this.minos[spot.minoIdx].shapes.length
            ) {
              // console.log(
              //   `[Searching-${spotName}] (${spot.points[0].x}, ${spot.points[0].y}) ${spot.minoIdx}-${spot.shapeIdx}`,
              //   this.minos[spot.minoIdx].jobClass,
              //   this.minos[spot.minoIdx].shapes[spot.shapeIdx].matrix
              // );

              // 제한 영역에서 adj가 0일 때 최소 미노가 1개짜리가 없으면 invalid
              if (
                spot.points[0].adj == 0 &&
                !this.minos.find((mino) => mino.rankIdx == 0 && mino.count)
              ) {
                valid = false;
                break;
              }

              // 배치 가능 여부
              let placeable = { able: this.minos[spot.minoIdx].count > 0 };
              if (placeable.able)
                placeable = this.minos[spot.minoIdx].isPlaceable(spot.points[0], spot.shapeIdx);
              if (placeable.able) {
                // console.log(
                //   `[Place-${spotName}] ${placeable.point.x}, ${placeable.point.y} / ${
                //     this.minos[spot.minoIdx].jobClass
                //   }`,
                //   this.minos[spot.minoIdx].shapes[spot.shapeIdx]
                // );

                // 배치 후 영역에서 배치된 좌표들 제거
                const placedPoints = this.minos[spot.minoIdx].place(placeable.point, spot.shapeIdx);
                let findIdx;
                placedPoints.forEach((pp) => {
                  for (let spotName in this.spots)
                    if (
                      (findIdx = this.spots[spotName].points.findIndex(
                        (p) => p.x == pp.x && p.y == pp.y
                      )) != -1
                    ) {
                      // console.log(`[removePoint-${spotName}] ${pp.x}, ${pp.y}`);
                      this.spots[spotName].points.splice(findIdx, 1);
                    }
                });

                // 배치된 미노 주변 영역 adj 값 업데이트
                this.minos[spot.minoIdx]
                  .getArroundSpot(placeable.point, spot.shapeIdx)
                  .forEach((pp) => {
                    // 일반 영역 업데이트
                    let point = this.spots.normal.points.find((p) => p.x == pp.x && p.y == pp.y);
                    if (point) point.updateAdjacent();

                    // 제한 영역 업데이트
                    point = this.spots.restricted.points.find((p) => p.x == pp.x && p.y == pp.y);
                    if (point) point.updateAdjacent();
                    // 제한 영역에 없는 좌표일 경우 adj값 측정하고 비교해서 추가
                    else if (pp.updateAdjacent() <= 1) {
                      this.spots.restricted.points.push(pp);
                      // console.log("[NewRestrictedPoint]", pp);
                    }
                  });

                // 제한된 영역에 새로운 것이 추가될 경우를 위해 재정렬
                this.spots.restricted.points.sort((a, b) => a.adj - b.adj);
                // console.log("[RestrictedPoints]", this.spots.restricted.points);

                // 스택에 노드 추가, 미노 개수 감소, 다음 탐색을 위해 서칭 변수 초기화
                this.stack.push(new Node(spotName, placeable.point, spot.minoIdx, spot.shapeIdx));
                this.minos[spot.minoIdx].count--;
                spot.shapeIdx = 0;
                spot.minoIdx = 0;
              }
              // 배치가 불가능 할 경우
              else {
                // 인덱스 증가
                if (++spot.shapeIdx == this.minos[spot.minoIdx].shapes.length) {
                  spot.shapeIdx = 0;
                  spot.minoIdx++;
                }
                if (spot.minoIdx == this.minos.length) valid = false;
              }
            }
            // 계속 배치 해야하는데 더 볼 미노가 없을 경우
            else valid = false;
            break;
          }

          // 제한 및 일반 영역 모두 좌표가 없을 경우 배치 성공
          if (spotName == "normal") {
            DrawSolution();
            return { success: 1, time: +new Date() - startTime };
          }
        }
      } else {
        // 백트래킹
        if (this.stack.length) {
          // 스택에서 pop하고 index들 복구
          valid = true;
          const node = this.stack.pop();
          const spot = this.spots[node.spotName];
          spot.minoIdx = node.minoIdx;
          spot.shapeIdx = node.shapeIdx;
          this.minos[spot.minoIdx].count++;
          // console.log(`[Backtracking-${node.spotName}]`, node);

          // adj 업데이트하고 복구할 포인트들 세팅
          let needUpdateAdjPoints = this.minos[spot.minoIdx].getArroundSpot(
            node.point,
            spot.shapeIdx
          );
          needUpdateAdjPoints = needUpdateAdjPoints.concat(
            this.minos[spot.minoIdx].unPlace(node.point, spot.shapeIdx)
          );
          // console.log("[RecoverPoints]", needUpdateAdjPoints);

          // 일반 영역에 포인트들 복구
          needUpdateAdjPoints.forEach((up) => {
            let sp = this.spots.normal.points.find((p) => p.x == up.x && p.y == up.y);
            if (sp) sp.updateAdjacent();
            else {
              up.updateAdjacent();
              this.spots.normal.points.push(up);
            }
          });

          // 왼쪽 위 좌표가 먼저오도록 정렬
          let v;
          this.spots.normal.points.sort((a, b) => ((v = a.y - b.y) ? v : (v = a.x - b.x)));

          // 제한된 영역 좌표 갱신
          this.spots.restricted.points = this.spots.normal.points.filter((p) => p.adj <= 1);
          // console.log("[RestrictedPoints]", this.spots.restricted.points);

          // 안되는거 다음부터 봐야하니깐 인덱스 증가
          if (++spot.shapeIdx == this.minos[spot.minoIdx].shapes.length) {
            spot.shapeIdx = 0;
            spot.minoIdx++;
          }
          if (spot.minoIdx == this.minos.length) valid = false;
        }
        // 배치 불가능
        else {
          DrawSolution();
          return {
            success: 0,
            time: +new Date() - startTime,
            message: "가능한 배치가 존재하지 않습니다.",
          };
        }
      }

      if (this.iteration++ % batchSize == 0) {
        DrawSolution();
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
    // 사용자 중지
    DrawSolution();
    return { success: -1 };
  }
}
