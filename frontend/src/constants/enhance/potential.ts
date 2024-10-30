import RARE from "../../assets/equipment/potential/rare.png";
import EPIC from "../../assets/equipment/potential/epic.png";
import UNIQUE from "../../assets/equipment/potential/unique.png";
import LEGENDARY from "../../assets/equipment/potential/legendary.png";

export enum POTENTIAL_GRADE {
  RARE = "RARE",
  EPIC = "EPIC",
  UNIQUE = "UNIQUE",
  LENGENDARY = "LENGENDARY",
}

interface Info {
  name: string;
  borderColor: string;
  imageColor: string;
  textColor: string;
  icon: string;
}
export const POTENTIAL_INFOS: Record<POTENTIAL_GRADE, Info> = {
  [POTENTIAL_GRADE.RARE]: {
    name: "레어",
    borderColor: "#66ffff",
    imageColor: "#0099cc",
    textColor: "#66ffff",
    icon: RARE,
  },
  [POTENTIAL_GRADE.EPIC]: {
    name: "에픽",
    borderColor: "#cc66ff",
    imageColor: "#7700cc",
    textColor: "#9966ff",
    icon: EPIC,
  },
  [POTENTIAL_GRADE.UNIQUE]: {
    name: "유니크",
    borderColor: "#ffcc00",
    imageColor: "#eeab00",
    textColor: "#ffcc00",
    icon: UNIQUE,
  },
  [POTENTIAL_GRADE.LENGENDARY]: {
    name: "레전드리",
    borderColor: "#01ff00",
    imageColor: "#00cc99",
    textColor: "#ccff00",
    icon: LEGENDARY,
  },
};
