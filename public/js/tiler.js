const TILE = {
  ROW: 20,
  COL: 22,
  COLOR: {
    BACK: [
      "rgb(57, 57, 57)",
      "rgb(76, 76, 76)",
      "rgb(34, 34, 34)",
      "rgb(43, 43, 43)",
    ],
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

Array.copy2d = (arr2d) => {
  let result = [];
  arr2d.forEach((arr1d) => result.push(arr1d.slice()));
  return result;
};

class Tiler {
  tiles = [];

  constructor() {
    setTimeout(() => {
      this.Q();
    }, 100);
  }

  Q() {
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
  }

  GetPosListFromJobRank(jobClass, rankIdx) {
    // 원본
    const minoIdx = TILE.MINO_INDEX[jobClass.toUpperCase()][rankIdx];
    let matrix,
      result = [TILE.MINO_POS[minoIdx]],
      row = result[0].length,
      col = result[0][0].length;

    // 상하 대칭
    if ([7, 8, 9, 13, 14].indexOf(minoIdx) != -1) {
      matrix = Array.copy2d(matrix);
      result.push(matrix.reverse());
    }

    // 반시계방향 90deg 회전
    matrix = Array.from(Array(col), () => new Array(row));
    if ([1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14].indexOf(minoIdx) != -1) {
      for (let i = 0; i < col; i++)
        for (let j = 0; j < row; j++) matrix[i][j] = result[0][j][col - i - 1];
      result.push(matrix);

      // 좌우 대칭
      if ([7, 8, 9, 13, 14].indexOf(minoIdx) != -1) {
        matrix = Array.copy2d(matrix);
        result.push(matrix.map((r) => r.reverse()));
      }
    }

    // 반시계방향 180deg 회전
    matrix = Array.copy2d(result[0]);
    if ([2, 5, 7, 9, 12, 13].indexOf(minoIdx) != -1) {
      result.push(matrix.map((r) => r.reverse()).reverse());

      // 상하 대칭
      if ([7, 9, 13].indexOf(minoIdx) != -1) {
        matrix = Array.copy2d(matrix);
        result.push(matrix.reverse());
      }
    }

    // 반시계방향 270deg 회전
    matrix = Array.from(Array(col), () => new Array(row));
    if ([2, 5, 7, 9, 12, 13].indexOf(minoIdx) != -1) {
      for (let i = 0; i < col; i++)
        for (let j = 0; j < row; j++) matrix[i][j] = result[0][row - j - 1][i];
      result.push(matrix);

      // 좌우 대칭
      if ([7, 9, 13].indexOf(minoIdx) != -1) {
        matrix = Array.copy2d(matrix);
        result.push(matrix.map((r) => r.reverse()));
      }
    }

    // 반환
    return result;
  }
  LoadMinosFromCharList() {
    this.tiles = [];
    let posList;

    // SSS
    let rankIdx = 4;
    for (let jobClass in stats.minoCount) {
      if (jobClass == "maplem") continue;
      for (let count = stats.minoCount[jobClass][rankIdx]; count > 0; count--)
        this.tiles.push({
          job: jobClass,
          rankIdx: rankIdx,
          pos: this.GetPosListFromJobRank(jobClass, rankIdx),
        });
    }

    // SS ~ B
    for (rankIdx--; rankIdx >= 0; rankIdx--)
      for (let jobClass in stats.minoCount)
        for (let count = stats.minoCount[jobClass][rankIdx]; count > 0; count--)
          this.tiles.push({
            job: jobClass,
            rankIdx: rankIdx,
            pos: this.GetPosListFromJobRank(jobClass, rankIdx),
          });
  }
  Solve() {
    this.LoadMinosFromCharList();
  }
}
