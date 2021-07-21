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

let spot;

class Tiler {
  constructor() {
    setTimeout(() => {
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
      onPlay({ message: "" });
    }, 100);
  }
  init() {
    this.minos = [];
    this.abort = false;
    this.iteration = 0;

    // 값에 따른 상태
    // 1: 선택된 곳이지만 타일이 없음
    // 100+n: 타일이 배치된 곳 (n은 배치된 타일이 있는 this.tiles의 index)
    // 200+n: 배치된 타일 중 Head가 배치된 곳
    this.map = [];
    this.placedStack = [];

    spot = {
      posArr: [], // x, y 위치 들어가 있고 normal엔 인접 개수인 adj도 있음
      posIdx: 0, // 현재 보고있는 위치의 Index
      minoIdx: 0, // 현재 보고있는 미노의 Index
      shapeIdx: 0, // 현재 보고있는 미노 변형 도형의 Index
    };
  }

  // "thief" 와 "3" 을 통해 SS랭크인 도적 모양의 2차원 배열 생성
  getShapesFromJobRank(jobClass, rankIdx) {
    // 원본
    const minoIdx = TILE.MINO_INDEX[jobClass.toUpperCase()][rankIdx];
    let matrix,
      shapes = [{ matrix: TILE.MINO_POS[minoIdx] }],
      row = shapes[0].matrix.length,
      col = shapes[0].matrix[0].length;

    // 상하 대칭
    if ([7, 8, 9, 13, 14].indexOf(minoIdx) != -1) {
      matrix = Array.Copy2d(shapes[0].matrix);
      shapes.push({ matrix: matrix.reverse() });
    }

    // 반시계방향 90deg 회전
    matrix = Array.from(Array(col), () => new Array(row));
    if ([1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14].indexOf(minoIdx) != -1) {
      for (let i = 0; i < col; i++)
        for (let j = 0; j < row; j++) matrix[i][j] = shapes[0].matrix[j][col - i - 1];
      shapes.push({ matrix: matrix });

      // 좌우 대칭
      if ([7, 8, 9, 13, 14].indexOf(minoIdx) != -1) {
        matrix = Array.Copy2d(matrix);
        shapes.push({ matrix: matrix.map((r) => r.reverse()) });
      }
    }

    // 반시계방향 180deg 회전
    matrix = Array.Copy2d(shapes[0].matrix);
    if ([2, 5, 7, 9, 12, 13].indexOf(minoIdx) != -1) {
      matrix.forEach((r) => r.reverse());
      shapes.push({ matrix: matrix.reverse() });

      // 상하 대칭
      if ([7, 9, 13].indexOf(minoIdx) != -1) {
        matrix = Array.Copy2d(matrix);
        shapes.push({ matrix: matrix.reverse() });
      }
    }

    // 반시계방향 270deg 회전
    matrix = Array.from(Array(col), () => new Array(row));
    if ([2, 5, 7, 9, 12, 13].indexOf(minoIdx) != -1) {
      for (let i = 0; i < col; i++)
        for (let j = 0; j < row; j++) matrix[i][j] = shapes[0].matrix[row - j - 1][i];
      shapes.push({ matrix: matrix });

      // 좌우 대칭
      if ([7, 9, 13].indexOf(minoIdx) != -1) {
        matrix = Array.Copy2d(matrix);
        shapes.push({ matrix: matrix.map((r) => r.reverse()) });
      }
    }

    // 중심 위치 지정
    for (let i = 0; i < shapes.length; i++)
      for (let y = 0; y < shapes[i].matrix.length; y++)
        for (let x = 0; x < shapes[i].matrix[0].length; x++)
          if (shapes[i].matrix[y][x] == 2) {
            shapes[i].center = { x, y };
            y = shapes[i].matrix.length;
            break;
          }

    // 반환
    return shapes;
  }
  // stats.minoCount 를 통해 회전, 대칭 등으로 만들 수 있는 모든 미노들을 레이드 맴버 수에 맞게 생성
  getMinosFromStats() {
    let minoArr = [];

    for (let jobClass in stats.minoCount)
      stats.minoCount[jobClass].forEach((count, rankIdx) => {
        if (count)
          minoArr.push({
            jobClass,
            rankIdx,
            count,
            shapes: this.getShapesFromJobRank(jobClass, rankIdx),
          });
      });

    return minoArr.sort((a, b) => b.rankIdx - a.rankIdx);
  }
  // 인접 영역 개수를 반환
  getAdjacentNum(x, y) {
    let adj = 0;

    if (x > 0 && this.map[y][x - 1] == 1) adj++;
    if (y > 0 && this.map[y - 1][x] == 1) adj++;
    if (x < TILE.COL - 1 && this.map[y][x + 1] == 1) adj++;
    if (y < TILE.ROW - 1 && this.map[y + 1][x] == 1) adj++;

    return adj;
  }
  // 해당 위치의 도형의 인접 부분들에 대한 좌표들을 반환
  getAdjacentSpot(x, y, shape) {
    let cx = x - shape.center.x;
    let cy = y - shape.center.y;
    let posArr = [];

    // 영역 둘러싼 부분 추가
    shape.matrix.forEach((row) => {
      row.forEach((num) => {
        if (num > 0) {
          if (cx > 0 && this.map[y][x - 1] == 1) posArr.push({ x: x - 1, y: y });
          if (cy > 0 && this.map[y - 1][x] == 1) posArr.push({ x: x, y: y - 1 });
          if (cx < TILE.COL - 1 && this.map[y][x + 1] == 1) posArr.push({ x: x + 1, y: y });
          if (cy < TILE.ROW - 1 && this.map[y + 1][x] == 1) posArr.push({ x: x, y: y + 1 });
        }
        x++;
      });
      x = pos.x - shape.center.x;
      y++;
    });

    // 중복 제거
    posArr.filter((arr, index, callback) => index === callback.findIndex((t) => t.id === arr.id));

    return posArr;
  }

  // 헤드가 들어가야할 중앙 4곳 중 선택된 곳 반환
  getCenterSpot() {
    const cy = TILE.ROW / 2,
      cx = TILE.COL / 2;
    let posArr = [];
    [
      [-1, -1],
      [-1, 0],
      [0, -1],
      [0, 0],
    ].forEach((p) => {
      if (this.map[cy + p[0]][cx + p[1]] == 1) posArr.push({ x: cx + p[1], y: cy + p[0] });
    });

    return posArr;
  }
  // 미배치 영역을 인접된 미배치 영역 개수를 포함해서 반환
  getSpot() {
    let posArr = [];

    for (let y = 0; y < TILE.ROW; y++)
      for (let x = 0; x < TILE.COL; x++)
        if (this.map[y][x] == 1) {
          let pos = { x, y };
          pos.adj = this.getAdjacentNum(pos);
          posArr.push(pos);
        }

    let v;
    posArr.sort((a, b) => ((v = a.y - b.y) ? v : (v = a.x - b.x) ? v : a.adj - b.adj));

    return posArr;
  }

  // pos 위치에 shape.center가 중심이 되는 shape.matrix 모양이 배치가 될 수 있는가
  isPlaceable(pos, shape) {
    let sx = pos.x - shape.center.x;
    let sy = pos.y - shape.center.y;
    if (
      sx < 0 ||
      sy < 0 ||
      sx > TILE.COL - shape.matrix[0].length ||
      sy > TILE.ROW - shape.matrix.length
    )
      return false;

    for (let i = 0, row = shape.matrix.length; i < row; i++)
      for (let j = 0, col = shape.matrix[0].length; j < col; j++)
        if (shape.matrix[i][j] > 0 && this.map[sy + i][sx + j] != 1) return false;

    return true;
  }
  // 주변에 위치들이 내가 가진 최소의 블럭으로 넣을 수 있는지
  // 완벽하지 않음!!
  isAdjacentValid(pos, shape, min) {
    const posArr = this.getAdjacentSpot(pos, shape);
    for (let i = 0; i < posArr.length; i++) {
      if (this.getAdjacentNum(posArr[i]) < min) return false;
    }
    return true;
  }
  // 주변 위치들 adj 값 업데이트
  updateAdjacent(pos, shape) {
    let posArr = this.getAdjacentSpot(pos, shape);
    for (let i = 0; i < posArr.length; i++)
      spot.normal.posArr.find((p) => p.x == posArr[i].x && p.y == posArr[i].y).adj =
        this.getAdjacentNum(posArr[i]);

    let v;
    spot.normal.posArr.sort((a, b) => ((v = a.y - b.y) ? v : (v = a.x - b.x) ? v : a.adj - b.adj));
  }

  // type에 따라 전역변수를 이용해서 해당 위치에 배치 후 값 세팅
  place(type) {
    // type에 따른 데이터 세팅
    const currentSpot = spot[type];
    let pos = currentSpot.posArr[currentSpot.posIdx];
    let shape = this.minos[currentSpot.minoIdx].shapes[currentSpot.shapeIdx];
    let node = {
      type,
      pos,
      mino: this.minos[currentSpot.minoIdx],
      posIdx: currentSpot.posIdx,
      minoIdx: currentSpot.minoIdx,
      shapeIdx: currentSpot.shapeIdx,
      posArr: [],
    };

    // spot 사용된 걸로 변경
    let x = pos.x - shape.center.x;
    let y = pos.y - shape.center.y;
    let head = true;

    shape.matrix.forEach((row) => {
      row.forEach((num) => {
        if (num > 0) {
          // this.map에 표시
          if (head && num == 2) {
            this.map[y][x] = 200 + currentSpot.minoIdx;
            head = false;
          } else this.map[y][x] = 100 + currentSpot.minoIdx;

          let isNotCurrentSpot = true;
          // currentSpot의 posArr에서 제거
          for (let i = currentSpot.posArr.length - 1; i >= 0; i--)
            if (x == currentSpot.posArr[i].x && y == currentSpot.posArr[i].y) {
              node.posArr.push({ x, y, i });
              currentSpot.posArr.splice(i, 1);
              isNotCurrentSpot = false;
            }
          if (isNotCurrentSpot) node.posArr.push({ x, y, i: -1 });
        }
        x++;
      });
      x = pos.x - shape.center.x;
      y++;
    });

    // 첫 위치부터 탐색하게 하기
    currentSpot.posIdx = -1;

    // 사용된 미노 기존 배열에서 뺴고 Stack에 Push
    this.minos.splice(currentSpot.minoIdx, 1);
    this.placedStack.push(node);
  }
  // 가장 최근에 추가된 미노 Pop 하기
  backtrackingLastMino(type) {
    const node = this.placedStack.pop();

    // spot 복구
    this.minos.splice(node.minoIdx, 0, node.mino);
    spot[node.type].posIdx = node.posIdx;
    spot[node.type].minoIdx = node.minoIdx;
    spot[node.type].shapeIdx = node.shapeIdx;

    // map 복구
    while (node.posArr.length) {
      const pos = node.posArr.pop();
      this.map[pos.y][pos.x] = 1;

      if (pos.i != -1) spot[node.type].posArr.splice(pos.i, 0, { x: pos.x, y: pos.y });
    }
    if (type == "normal") this.updateAdjacent(node.pos, node.mino.shapes[node.shapeIdx]);
  }

  async solve(batchSize = 3000) {
    // 연산 시간 체크 및 초기설정
    this.init();
    let valid = true;
    const startTime = +new Date();

    // 캐릭터 리스트로부터 폴리오미노 세팅
    this.minos = this.getMinosFromStats();
    console.log("GetMinosFromStats()", this.minos);

    // 선택된 곳은 1로 지정된 2차원 배열 this.map 세팅
    this.map = Array.from(Array(TILE.ROW), () => Array(TILE.COL).fill(0));
    map.selectedPos.forEach((p) => (this.map[p.y][p.x] = 1));
    console.log("this.map", this.map);

    // 먼저 중심 영역 계산
    spot.posArr = this.getSpot();
    console.log("getSpot()", spot.posArr);

    while (true) {
      // 사용자 중지
      if (this.abort) return { success: -1 };

      // 연산
      if (valid) {
        // calc
      } else {
        // backtracking
      }

      // 배치 성공
      // return { success: 1, time: +new Date() - startTime };

      // 화면 갱신
      if (this.iteration++ % batchSize == 0) {
        DrawSolution();
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }

    // 배치 실패
    return {
      success: 0,
      time: +new Date() - startTime,
      message: "가능한 배치가 존재하지 않습니다.",
    };
  }
}
