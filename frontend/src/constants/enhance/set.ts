export enum SET_TYPE {
  ROOTABIS, // 루타비스
  ABSOLABS, // 앱솔랩스
  ARCANESHADE, // 아케인셰이드
  ETERNEL, // 에테르넬
  BOSS, // 보스
  DAWN, // 여명
  BLACK, // 칠흑
  RADIANCE, // 광휘
}

interface Info {
  name: string;
  abbreviate: string;
  icon: string;
}
export const SET_INFOS: Record<SET_TYPE, Info> = {
  [SET_TYPE.ROOTABIS]: {
    name: "루타비스",
    abbreviate: "루타",
    icon: "",
  },
  [SET_TYPE.ABSOLABS]: {
    name: "앱솔랩스",
    abbreviate: "앱솔",
    icon: "",
  },
  [SET_TYPE.ARCANESHADE]: {
    name: "아케인셰이드",
    abbreviate: "아케인",
    icon: "",
  },
  [SET_TYPE.ETERNEL]: {
    name: "에테르넬",
    abbreviate: "에테",
    icon: "",
  },
  [SET_TYPE.BOSS]: {
    name: "보스 장신구",
    abbreviate: "보장",
    icon: "",
  },
  [SET_TYPE.DAWN]: {
    name: "여명의 보스",
    abbreviate: "여명",
    icon: "",
  },
  [SET_TYPE.BLACK]: {
    name: "칠흑의 보스",
    abbreviate: "칠흑",
    icon: "",
  },
  [SET_TYPE.RADIANCE]: {
    name: "광휘의 보스",
    abbreviate: "광휘",
    icon: "",
  },
};
