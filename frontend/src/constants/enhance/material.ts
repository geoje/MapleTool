import STRANGE from "../../assets/item/potential/strange.png";
import MASTER from "../../assets/item/potential/master.png";
import ARTISAN from "../../assets/item/potential/artisan.png";
import RED from "../../assets/item/potential/red.png";
import BLACK from "../../assets/item/potential/black.png";
import STRANGE_ADDI from "../../assets/item/potential/strange-addi.png";
import ADDI from "../../assets/item/potential/addi.png";
import WHITE_ADDI from "../../assets/item/potential/white-addi.png";
import POTENTIAL from "../../assets/item/potential/potential.webp";
import POTENTIAL_ADDI from "../../assets/item/potential/potential-addi.webp";

export enum MATERIAL_TYPE {
  STRANGE = "STRANGE", // 수상한
  MASTER = "MASTER", // 장인
  ARTISAN = "ARTISAN", // 명장
  RED = "RED", // 레드
  BLACK = "BLACK", // 블랙
  STRANGE_ADDI = "STRANGE_ADDI", // 수상한 에디셔널
  ADDI = "ADDI", // 에디셔널
  WHITE_ADDI = "WHITE_ADDI", // 화이트 에디셔널
  POTENTIAL = "POTENTIAL", // 메소 잠재능력
  POTENTIAL_ADDI = "POTENTIAL_ADDI", // 메소 에디셔널 잠재능력
}

interface Info {
  name: string;
  type: string;
  icon: string;
}
export const MATERIAL_INFOS: Record<MATERIAL_TYPE, Info> = {
  [MATERIAL_TYPE.STRANGE]: {
    name: "수상한 큐브",
    type: "수상",
    icon: STRANGE,
  },
  [MATERIAL_TYPE.MASTER]: {
    name: "장인의 큐브",
    type: "장인",
    icon: MASTER,
  },
  [MATERIAL_TYPE.ARTISAN]: {
    name: "명장의 큐브",
    type: "명장",
    icon: ARTISAN,
  },
  [MATERIAL_TYPE.RED]: {
    name: "레드 큐브",
    type: "레드",
    icon: RED,
  },
  [MATERIAL_TYPE.BLACK]: {
    name: "블랙 큐브",
    type: "블랙",
    icon: BLACK,
  },
  [MATERIAL_TYPE.STRANGE_ADDI]: {
    name: "수상한 에디셔널 큐브",
    type: "수에",
    icon: STRANGE_ADDI,
  },
  [MATERIAL_TYPE.ADDI]: {
    name: "에디셔널 큐브",
    type: "에디",
    icon: ADDI,
  },
  [MATERIAL_TYPE.WHITE_ADDI]: {
    name: "화이트 에디셔널 큐브",
    type: "에디",
    icon: WHITE_ADDI,
  },
  [MATERIAL_TYPE.POTENTIAL]: {
    name: "잠재능력 재설정",
    type: "블랙",
    icon: POTENTIAL,
  },
  [MATERIAL_TYPE.POTENTIAL_ADDI]: {
    name: "에디셔널 잠재능력 재설정",
    type: "에디",
    icon: POTENTIAL_ADDI,
  },
};
