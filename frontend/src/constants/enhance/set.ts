import ROOTABIS from "../../assets/equipment/rootabis/warrior/armor/hat.webp";
import ABSOLABS from "../../assets/equipment/absolabs/warrior/armor/hat.webp";
import ARCANEUMBRA from "../../assets/equipment/arcaneumbra/warrior/armor/hat.webp";
import ETERNAL from "../../assets/equipment/eternal/warrior/armor/hat.webp";
import BOSS from "../../assets/equipment/boss/condensed-power-crystal.webp";
import DAWN from "../../assets/equipment/dawn/twilight-mark.webp";
import PITCHED from "../../assets/equipment/pitched/berserked.webp";
import RADIANCE from "../../assets/equipment/radiance/whispers-of-the-source.webp";

export enum SET_TYPE {
  ROOTABIS = "ROOTABIS", // 루타비스
  ABSOLABS = "ABSOLABS", // 앱솔랩스
  ARCANEUMBRA = "ARCANEUMBRA", // 아케인셰이드
  ETERNAL = "ETERNAL", // 에테르넬
  BOSS = "BOSS", // 보스
  DAWN = "DAWN", // 여명
  PITCHED = "PITCHED", // 칠흑
  RADIANCE = "RADIANCE", // 광휘
}

interface Info {
  name: string;
  icon: string;
}
export const SET_INFOS: Record<SET_TYPE, Info> = {
  [SET_TYPE.ROOTABIS]: {
    name: "루타비스",
    icon: ROOTABIS,
  },
  [SET_TYPE.ABSOLABS]: {
    name: "앱솔랩스",
    icon: ABSOLABS,
  },
  [SET_TYPE.ARCANEUMBRA]: {
    name: "아케인셰이드",
    icon: ARCANEUMBRA,
  },
  [SET_TYPE.ETERNAL]: {
    name: "에테르넬",
    icon: ETERNAL,
  },
  [SET_TYPE.BOSS]: {
    name: "보스 장신구",
    icon: BOSS,
  },
  [SET_TYPE.DAWN]: {
    name: "여명의 보스",
    icon: DAWN,
  },
  [SET_TYPE.PITCHED]: {
    name: "칠흑의 보스",
    icon: PITCHED,
  },
  [SET_TYPE.RADIANCE]: {
    name: "광휘의 보스",
    icon: RADIANCE,
  },
};
