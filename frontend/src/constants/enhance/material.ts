import SPEEL_TRACE from "../../assets/item/scroll/spell-trace.png";
import CLEAN_SLATE from "../../assets/item/scroll/clean-slate.png";
import INNOCENCE from "../../assets/item/scroll/innocence.png";
import ARC_INNOCENCE from "../../assets/item/scroll/arc-innocence.png";
import GOLDDEN_HAMMER from "../../assets/item/scroll/goldden-hammer.png";
import INCREDIBLE_CHAOS from "../../assets/item/scroll/incredible-chaos.png";
import RETURN from "../../assets/item/scroll/return.png";
import PREMIUM_ACCESSORY_ATTACK from "../../assets/item/scroll/premium-accessory-attack.png";
import PREMIUM_ACCESSORY_MAGIC_ATTACK from "../../assets/item/scroll/premium-accessory-magic-attack.png";
import GRINDSTONE from "../../assets/item/scroll/grindstone.png";
import STARFORCE from "../../assets/item/starforce/star.png";

import POWERFUL from "../../assets/item/bonus/powerful.png";
import ETERNAL from "../../assets/item/bonus/eternal.png";
import BLACK_REBIRTH from "../../assets/item/bonus/black.png";
import ABYSS from "../../assets/item/bonus/abyss.png";

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
  SPEEL_TRACE = "SPEEL_TRACE",
  CLEAN_SLATE = "CLEAN_SLATE",
  INNOCENCE = "INNOCENCE",
  ARC_INNOCENCE = "ARC_INNOCENCE",
  GOLDDEN_HAMMER = "GOLDDEN_HAMMER",
  INCREDIBLE_CHAOS = "INCREDIBLE_CHAOS",
  RETURN = "RETURN",
  PREMIUM_ACCESSORY_ATTACK = "PREMIUM_ACCESSORY_ATTACK",
  PREMIUM_ACCESSORY_MAGIC_ATTACK = "PREMIUM_ACCESSORY_MAGIC_ATTACK",
  GRINDSTONE = "GRINDSTONE",
  STARFORCE = "STARFORCE",

  POWERFUL = "POWERFUL",
  ETERNAL = "ETERNAL",
  BLACK_REBIRTH = "BLACK_REBIRTH",
  ABYSS = "ABYSS",

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
  [MATERIAL_TYPE.SPEEL_TRACE]: {
    name: "주문의 흔적 (개발중)",
    type: "주흔",
    icon: SPEEL_TRACE,
  },
  [MATERIAL_TYPE.CLEAN_SLATE]: {
    name: "순백의 주문서 (개발중)",
    type: "순백",
    icon: CLEAN_SLATE,
  },
  [MATERIAL_TYPE.INNOCENCE]: {
    name: "이노센트 주문서 (개발중)",
    type: "이노",
    icon: INNOCENCE,
  },
  [MATERIAL_TYPE.ARC_INNOCENCE]: {
    name: "아크 이노센트 주문서 (개발중)",
    type: "아크이노",
    icon: ARC_INNOCENCE,
  },
  [MATERIAL_TYPE.GOLDDEN_HAMMER]: {
    name: "황금 망치 (개발중)",
    type: "황망",
    icon: GOLDDEN_HAMMER,
  },
  [MATERIAL_TYPE.INCREDIBLE_CHAOS]: {
    name: "놀라운 긍정의 혼돈의 주문서 (개발중)",
    type: "놀긍혼",
    icon: INCREDIBLE_CHAOS,
  },
  [MATERIAL_TYPE.RETURN]: {
    name: "리턴 스크롤 (개발중)",
    type: "리턴",
    icon: RETURN,
  },
  [MATERIAL_TYPE.PREMIUM_ACCESSORY_ATTACK]: {
    name: "프리미엄 악세서리 공격력 스크롤 (개발중)",
    type: "프악공",
    icon: PREMIUM_ACCESSORY_ATTACK,
  },
  [MATERIAL_TYPE.PREMIUM_ACCESSORY_MAGIC_ATTACK]: {
    name: "프리미엄 악세서리 마력 스크롤 (개발중)",
    type: "프악마",
    icon: PREMIUM_ACCESSORY_MAGIC_ATTACK,
  },
  [MATERIAL_TYPE.GRINDSTONE]: {
    name: "생명의 연마석 (개발중)",
    type: "연마석",
    icon: GRINDSTONE,
  },
  [MATERIAL_TYPE.STARFORCE]: {
    name: "스타포스 (개발중)",
    type: "스타포스",
    icon: STARFORCE,
  },

  [MATERIAL_TYPE.POWERFUL]: {
    name: "강력한 환생의 불꽃 (개발중)",
    type: "강환불",
    icon: POWERFUL,
  },
  [MATERIAL_TYPE.ETERNAL]: {
    name: "영원한 환생의 불꽃 (개발중)",
    type: "영환불",
    icon: ETERNAL,
  },
  [MATERIAL_TYPE.BLACK_REBIRTH]: {
    name: "검은 환생의 불꽃 (개발중)",
    type: "검환불",
    icon: BLACK_REBIRTH,
  },
  [MATERIAL_TYPE.ABYSS]: {
    name: "심연의 환생의 불꽃 (개발중)",
    type: "심환불",
    icon: ABYSS,
  },

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
