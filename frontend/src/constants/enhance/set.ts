import rootabis from "../../assets/equipment/rootabis/warrior/armor/hat.webp";
import absolabs from "../../assets/equipment/absolabs/warrior/armor/hat.webp";
import arcaneumbra from "../../assets/equipment/arcaneumbra/warrior/armor/hat.webp";
import eternal from "../../assets/equipment/eternal/warrior/armor/hat.webp";

export enum SET_TYPE {
  ROOTABIS = "ROOTABIS", // 루타비스
  ABSOLABS = "ABSOLABS", // 앱솔랩스
  ARCANEUMBRA = "ARCANEUMBRA", // 아케인셰이드
  ETERNAL = "ETERNAL", // 에테르넬
  BOSS = "BOSS", // 보스
  DAWN = "DAWN", // 여명
  BLACK = "BLACK", // 칠흑
  RADIANCE = "RADIANCE", // 광휘
}

interface Info {
  name: string;
  icon: string;
}
export const SET_INFOS: Record<SET_TYPE, Info> = {
  [SET_TYPE.ROOTABIS]: {
    name: "루타비스",
    icon: rootabis,
  },
  [SET_TYPE.ABSOLABS]: {
    name: "앱솔랩스",
    icon: absolabs,
  },
  [SET_TYPE.ARCANEUMBRA]: {
    name: "아케인셰이드",
    icon: arcaneumbra,
  },
  [SET_TYPE.ETERNAL]: {
    name: "에테르넬",
    icon: eternal,
  },
  [SET_TYPE.BOSS]: {
    name: "보스 장신구",
    icon: "",
  },
  [SET_TYPE.DAWN]: {
    name: "여명의 보스",
    icon: "",
  },
  [SET_TYPE.BLACK]: {
    name: "칠흑의 보스",
    icon: "",
  },
  [SET_TYPE.RADIANCE]: {
    name: "광휘의 보스",
    icon: "",
  },
};
