import { CubeDataResponse, CubeType } from "@/constants/enhance";

export const CUBE_PROBABILITIES: Record<CubeType, CubeDataResponse> = {
  [CubeType.BLACK]: {
    gradeUp: [
      { from: "레어", to: "에픽", probability: 0.150000001275 },
      { from: "에픽", to: "유니크", probability: 0.035 },
      { from: "유니크", to: "레전드리", probability: 0.014 },
    ],
    guarantee: [
      { from: "레어", to: "에픽", count: 10 },
      { from: "에픽", to: "유니크", count: 42 },
      { from: "유니크", to: "레전드리", count: 107 },
    ],
    optionProbability: [
      { optionNumber: 1, grade: "레어", items: [{ name: "레어", probability: 1 }] },
      { optionNumber: 1, grade: "에픽", items: [{ name: "에픽", probability: 1 }] },
      { optionNumber: 1, grade: "유니크", items: [{ name: "유니크", probability: 1 }] },
      { optionNumber: 1, grade: "레전드리", items: [{ name: "레전드리", probability: 1 }] },
      {
        optionNumber: 2,
        grade: "레어",
        items: [
          { name: "레어", probability: 0.2 },
          { name: "노멀", probability: 0.8 },
        ],
      },
      {
        optionNumber: 2,
        grade: "에픽",
        items: [
          { name: "에픽", probability: 0.2 },
          { name: "레어", probability: 0.8 },
        ],
      },
      {
        optionNumber: 2,
        grade: "유니크",
        items: [
          { name: "유니크", probability: 0.2 },
          { name: "에픽", probability: 0.8 },
        ],
      },
      {
        optionNumber: 2,
        grade: "레전드리",
        items: [
          { name: "레전드리", probability: 0.2 },
          { name: "유니크", probability: 0.8 },
        ],
      },
      {
        optionNumber: 3,
        grade: "레어",
        items: [
          { name: "레어", probability: 0.05 },
          { name: "노멀", probability: 0.95 },
        ],
      },
      {
        optionNumber: 3,
        grade: "에픽",
        items: [
          { name: "에픽", probability: 0.05 },
          { name: "레어", probability: 0.95 },
        ],
      },
      {
        optionNumber: 3,
        grade: "유니크",
        items: [
          { name: "유니크", probability: 0.05 },
          { name: "에픽", probability: 0.95 },
        ],
      },
      {
        optionNumber: 3,
        grade: "레전드리",
        items: [
          { name: "레전드리", probability: 0.05 },
          { name: "유니크", probability: 0.95 },
        ],
      },
    ],
  },

  [CubeType.MASTER]: {
    maxGrade: "유니크",
    gradeUp: [
      { from: "레어", to: "에픽", probability: 0.047619 },
      { from: "에픽", to: "유니크", probability: 0.011858 },
    ],
    optionProbability: [
      { optionNumber: 1, grade: "레어", items: [{ name: "레어", probability: 1 }] },
      { optionNumber: 1, grade: "에픽", items: [{ name: "에픽", probability: 1 }] },
      { optionNumber: 1, grade: "유니크", items: [{ name: "유니크", probability: 1 }] },
      {
        optionNumber: 2,
        grade: "레어",
        items: [
          { name: "레어", probability: 0.166667 },
          { name: "노멀", probability: 0.833333 },
        ],
      },
      {
        optionNumber: 2,
        grade: "에픽",
        items: [
          { name: "에픽", probability: 0.047619 },
          { name: "레어", probability: 0.952381 },
        ],
      },
      {
        optionNumber: 2,
        grade: "유니크",
        items: [
          { name: "유니크", probability: 0.011858 },
          { name: "에픽", probability: 0.988142 },
        ],
      },
      {
        optionNumber: 3,
        grade: "레어",
        items: [
          { name: "레어", probability: 0.166667 },
          { name: "노멀", probability: 0.833333 },
        ],
      },
      {
        optionNumber: 3,
        grade: "에픽",
        items: [
          { name: "에픽", probability: 0.047619 },
          { name: "레어", probability: 0.952381 },
        ],
      },
      {
        optionNumber: 3,
        grade: "유니크",
        items: [
          { name: "유니크", probability: 0.011858 },
          { name: "에픽", probability: 0.988142 },
        ],
      },
    ],
  },

  [CubeType.ARTISAN]: {
    maxGrade: "레전드리",
    gradeUp: [
      { from: "레어", to: "에픽", probability: 0.079994 },
      { from: "에픽", to: "유니크", probability: 0.016959 },
      { from: "유니크", to: "레전드리", probability: 0.001996 },
    ],
    optionProbability: [
      { optionNumber: 1, grade: "레어", items: [{ name: "레어", probability: 1 }] },
      { optionNumber: 1, grade: "에픽", items: [{ name: "에픽", probability: 1 }] },
      { optionNumber: 1, grade: "유니크", items: [{ name: "유니크", probability: 1 }] },
      { optionNumber: 1, grade: "레전드리", items: [{ name: "레전드리", probability: 1 }] },
      {
        optionNumber: 2,
        grade: "레어",
        items: [
          { name: "레어", probability: 0.166667 },
          { name: "노멀", probability: 0.833333 },
        ],
      },
      {
        optionNumber: 2,
        grade: "에픽",
        items: [
          { name: "에픽", probability: 0.079994 },
          { name: "레어", probability: 0.92000552 },
        ],
      },
      {
        optionNumber: 2,
        grade: "유니크",
        items: [
          { name: "유니크", probability: 0.016959 },
          { name: "에픽", probability: 0.983041 },
        ],
      },
      {
        optionNumber: 2,
        grade: "레전드리",
        items: [
          { name: "레전드리", probability: 0.001996 },
          { name: "유니크", probability: 0.998004 },
        ],
      },
      {
        optionNumber: 3,
        grade: "레어",
        items: [
          { name: "레어", probability: 0.166667 },
          { name: "노멀", probability: 0.833333 },
        ],
      },
      {
        optionNumber: 3,
        grade: "에픽",
        items: [
          { name: "에픽", probability: 0.079994 },
          { name: "레어", probability: 0.92000552 },
        ],
      },
      {
        optionNumber: 3,
        grade: "유니크",
        items: [
          { name: "유니크", probability: 0.016959 },
          { name: "에픽", probability: 0.983041 },
        ],
      },
      {
        optionNumber: 3,
        grade: "레전드리",
        items: [
          { name: "레전드리", probability: 0.001996 },
          { name: "유니크", probability: 0.998004 },
        ],
      },
    ],
  },

  [CubeType.ADDI]: {
    gradeUp: [
      { from: "레어", to: "에픽", probability: 0.02381, cubeType: "에디셔널 잠재능력 재설정" },
      { from: "레어", to: "에픽", probability: 0.047619, cubeType: "에디셔널 큐브/화이트 에디셔널 큐브" },
      { from: "에픽", to: "유니크", probability: 0.009804, cubeType: "에디셔널 잠재능력 재설정" },
      { from: "에픽", to: "유니크", probability: 0.019608, cubeType: "에디셔널 큐브/화이트 에디셔널 큐브" },
      { from: "유니크", to: "레전드리", probability: 0.007, cubeType: "에디셔널 잠재능력 재설정" },
      { from: "유니크", to: "레전드리", probability: 0.007, cubeType: "에디셔널 큐브/화이트 에디셔널 큐브" },
    ],
    guarantee: [
      { from: "레어", to: "에픽", count: 62, cubeType: "에디셔널 잠재능력 재설정" },
      { from: "에픽", to: "유니크", count: 152, cubeType: "에디셔널 잠재능력 재설정" },
      { from: "유니크", to: "레전드리", count: 214, cubeType: "에디셔널 잠재능력 재설정" },
      { from: "레어", to: "에픽", count: 31, cubeType: "에디셔널 큐브" },
      { from: "에픽", to: "유니크", count: 76, cubeType: "에디셔널 큐브" },
      { from: "유니크", to: "레전드리", count: 214, cubeType: "에디셔널 큐브" },
      { from: "레어", to: "에픽", count: 31, cubeType: "화이트 에디셔널 큐브" },
      { from: "에픽", to: "유니크", count: 76, cubeType: "화이트 에디셔널 큐브" },
      { from: "유니크", to: "레전드리", count: 214, cubeType: "화이트 에디셔널 큐브" },
    ],
    optionProbability: [
      { optionNumber: 1, grade: "레어", items: [{ name: "레어", probability: 1 }] },
      { optionNumber: 1, grade: "에픽", items: [{ name: "에픽", probability: 1 }] },
      { optionNumber: 1, grade: "유니크", items: [{ name: "유니크", probability: 1 }] },
      { optionNumber: 1, grade: "레전드리", items: [{ name: "레전드리", probability: 1 }] },
      {
        optionNumber: 2,
        grade: "레어",
        items: [
          { name: "레어", probability: 0.019608 },
          { name: "노멀", probability: 0.980392 },
        ],
      },
      {
        optionNumber: 2,
        grade: "에픽",
        items: [
          { name: "에픽", probability: 0.047619 },
          { name: "레어", probability: 0.952381 },
        ],
      },
      {
        optionNumber: 2,
        grade: "유니크",
        items: [
          { name: "유니크", probability: 0.019608 },
          { name: "에픽", probability: 0.980392 },
        ],
      },
      {
        optionNumber: 2,
        grade: "레전드리",
        items: [
          { name: "레전드리", probability: 0.004975 },
          { name: "유니크", probability: 0.995025 },
        ],
      },
      {
        optionNumber: 3,
        grade: "레어",
        items: [
          { name: "레어", probability: 0.019608 },
          { name: "노멀", probability: 0.980392 },
        ],
      },
      {
        optionNumber: 3,
        grade: "에픽",
        items: [
          { name: "에픽", probability: 0.047619 },
          { name: "레어", probability: 0.952381 },
        ],
      },
      {
        optionNumber: 3,
        grade: "유니크",
        items: [
          { name: "유니크", probability: 0.019608 },
          { name: "에픽", probability: 0.980392 },
        ],
      },
      {
        optionNumber: 3,
        grade: "레전드리",
        items: [
          { name: "레전드리", probability: 0.004975 },
          { name: "유니크", probability: 0.995025 },
        ],
      },
    ],
  },

  [CubeType.STRANGE_ADDI]: {
    maxGrade: "에픽",
    gradeUp: [{ from: "레어", to: "에픽", probability: 0.004 }],
    optionProbability: [
      { optionNumber: 1, grade: "레어", items: [{ name: "레어", probability: 1 }] },
      { optionNumber: 1, grade: "에픽", items: [{ name: "에픽", probability: 1 }] },
      {
        optionNumber: 2,
        grade: "레어",
        items: [
          { name: "레어", probability: 0.019608 },
          { name: "노멀", probability: 0.980392 },
        ],
      },
      {
        optionNumber: 2,
        grade: "에픽",
        items: [
          { name: "에픽", probability: 0.004 },
          { name: "레어", probability: 0.996 },
        ],
      },
      {
        optionNumber: 3,
        grade: "레어",
        items: [
          { name: "레어", probability: 0.019608 },
          { name: "노멀", probability: 0.980392 },
        ],
      },
      {
        optionNumber: 3,
        grade: "에픽",
        items: [
          { name: "에픽", probability: 0.004 },
          { name: "레어", probability: 0.996 },
        ],
      },
    ],
  },
};
