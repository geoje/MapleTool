import absolabsCape from "@/assets/enhance/equipment/absolabs/cape.webp";
import absolabsGloves from "@/assets/enhance/equipment/absolabs/gloves.webp";
import absolabsHat from "@/assets/enhance/equipment/absolabs/hat.webp";
import absolabsOverall from "@/assets/enhance/equipment/absolabs/overall.webp";
import absolabsShoes from "@/assets/enhance/equipment/absolabs/shoes.webp";
import absolabsShoulder from "@/assets/enhance/equipment/absolabs/shoulder.webp";
import absolabsWeapon from "@/assets/enhance/equipment/absolabs/weapon.webp";
import arcaneumbraCape from "@/assets/enhance/equipment/arcaneumbra/cape.webp";
import arcaneumbraGloves from "@/assets/enhance/equipment/arcaneumbra/gloves.webp";
import arcaneumbraHat from "@/assets/enhance/equipment/arcaneumbra/hat.webp";
import arcaneumbraOverall from "@/assets/enhance/equipment/arcaneumbra/overall.webp";
import arcaneumbraShoes from "@/assets/enhance/equipment/arcaneumbra/shoes.webp";
import arcaneumbraShoulder from "@/assets/enhance/equipment/arcaneumbra/shoulder.webp";
import arcaneumbraWeapon from "@/assets/enhance/equipment/arcaneumbra/weapon.webp";
import condensedPowerCrystal from "@/assets/enhance/equipment/boss/condensed-power-crystal.webp";
import crystalVentusBadge from "@/assets/enhance/equipment/boss/crystal-ventus-badge.webp";
import deaSidusEarring from "@/assets/enhance/equipment/boss/dea-sidus-earring.webp";
import dominatorPendant from "@/assets/enhance/equipment/boss/dominator-pendant.webp";
import enragedZakumBelt from "@/assets/enhance/equipment/boss/enraged-zakum-belt.webp";
import guardianAngleRing from "@/assets/enhance/equipment/boss/guardian-angle-ring.webp";
import mechanatorPendant from "@/assets/enhance/equipment/boss/mechanator-pendant.webp";
import nobleIfiasRing from "@/assets/enhance/equipment/boss/noble-ifias-ring.webp";
import papulatusMark from "@/assets/enhance/equipment/boss/papulatus-mark.webp";
import pinkHolyCup from "@/assets/enhance/equipment/boss/pink-holy-cup.webp";
import royalBlackMetalShoulder from "@/assets/enhance/equipment/boss/royal-black-metal-shoulder.webp";
import silverBlossomRing from "@/assets/enhance/equipment/boss/silver-blossom-ring.webp";
import dawnGuardianAngelRing from "@/assets/enhance/equipment/dawn/dawn-guardian-angel-ring.webp";
import daybreakPendant from "@/assets/enhance/equipment/dawn/daybreak-pendant.webp";
import estellaEarrings from "@/assets/enhance/equipment/dawn/estella-earrings.webp";
import twilightMark from "@/assets/enhance/equipment/dawn/twilight-mark.webp";
import eternalBottom from "@/assets/enhance/equipment/eternal/bottom.webp";
import eternalCape from "@/assets/enhance/equipment/eternal/cape.png";
import eternalGloves from "@/assets/enhance/equipment/eternal/gloves.png";
import eternalHat from "@/assets/enhance/equipment/eternal/hat.webp";
import eternalShoes from "@/assets/enhance/equipment/eternal/shoes.png";
import eternalShoulder from "@/assets/enhance/equipment/eternal/shoulder.webp";
import eternalTop from "@/assets/enhance/equipment/eternal/top.webp";
import eternalWeapon from "@/assets/enhance/equipment/eternal/weapon.webp";
import berserked from "@/assets/enhance/equipment/pitched/berserked.webp";
import commandingForceEarring from "@/assets/enhance/equipment/pitched/commanding-force-earring.webp";
import completeUnderControl from "@/assets/enhance/equipment/pitched/complete-under-control.png";
import cursedRedSpellbook from "@/assets/enhance/equipment/pitched/cursed-red-spellbook.webp";
import dreamyBelt from "@/assets/enhance/equipment/pitched/dreamy-belt.webp";
import endlessTerror from "@/assets/enhance/equipment/pitched/endless-terror.webp";
import genesisBadge from "@/assets/enhance/equipment/pitched/genesis-badge.webp";
import magicEyepatch from "@/assets/enhance/equipment/pitched/magic-eyepatch.webp";
import mitrasRageWarrior from "@/assets/enhance/equipment/pitched/mitras-rage-warrior.webp";
import sourceOfSuffering from "@/assets/enhance/equipment/pitched/source-of-suffering.webp";
import whispersOfTheSource from "@/assets/enhance/equipment/radiance/whispers-of-the-source.webp";
import rootabisBottom from "@/assets/enhance/equipment/rootabis/bottom.webp";
import rootabisHat from "@/assets/enhance/equipment/rootabis/hat.webp";
import rootabisTop from "@/assets/enhance/equipment/rootabis/top.webp";
import rootabisWeapon from "@/assets/enhance/equipment/rootabis/weapon.webp";
import { SetType } from "@/constants/enhance";
import type { ItemEquipmentDetail } from "@/types";

function item(slot: string, name: string, icon: string, level: number): ItemEquipmentDetail {
  return {
    item_equipment_slot: slot,
    item_name: name,
    item_icon: icon,
    potential_option_grade: "",
    additional_potential_option_grade: "",
    item_base_option: { base_equipment_level: level },
  };
}

// Job-based sets differ per class (warrior/magician/bowman/thief/pirate) and, for
// weapons, per weapon type. Only the warrior armor and its first weapon type are
// shown here, since a single grid slot can only display one representative item.
export const SET_ITEMS: Record<SetType, ItemEquipmentDetail[]> = {
  [SetType.ROOTABIS]: [
    item("모자", "하이네스 워리어헬름", rootabisHat, 150),
    item("상의", "이글아이 워리어아머", rootabisTop, 150),
    item("하의", "트릭스터 워리어팬츠", rootabisBottom, 150),
    item("무기", "파프니르 미스틸테인", rootabisWeapon, 150),
  ],
  [SetType.ABSOLABS]: [
    item("모자", "앱솔랩스 나이트헬름", absolabsHat, 160),
    item("상의", "앱솔랩스 나이트슈트", absolabsOverall, 160),
    item("신발", "앱솔랩스 나이트슈즈", absolabsShoes, 160),
    item("장갑", "앱솔랩스 나이트글러브", absolabsGloves, 160),
    item("망토", "앱솔랩스 나이트케이프", absolabsCape, 160),
    item("어깨장식", "앱솔랩스 나이트숄더", absolabsShoulder, 160),
    item("무기", "앱솔랩스 세이버", absolabsWeapon, 160),
  ],
  [SetType.ARCANEUMBRA]: [
    item("모자", "아케인셰이드 나이트햇", arcaneumbraHat, 200),
    item("상의", "아케인셰이드 나이트슈트", arcaneumbraOverall, 200),
    item("신발", "아케인셰이드 나이트슈즈", arcaneumbraShoes, 200),
    item("장갑", "아케인셰이드 나이트글러브", arcaneumbraGloves, 200),
    item("망토", "아케인셰이드 나이트케이프", arcaneumbraCape, 200),
    item("어깨장식", "아케인셰이드 나이트숄더", arcaneumbraShoulder, 200),
    item("무기", "아케인셰이드 세이버", arcaneumbraWeapon, 200),
  ],
  [SetType.ETERNAL]: [
    item("모자", "에테르넬 나이트헬름", eternalHat, 250),
    item("상의", "에테르넬 나이트아머", eternalTop, 250),
    item("하의", "에테르넬 나이트팬츠", eternalBottom, 250),
    item("신발", "에테르넬 나이트슈즈", eternalShoes, 250),
    item("장갑", "에테르넬 나이트글러브", eternalGloves, 250),
    item("망토", "에테르넬 나이트케이프", eternalCape, 250),
    item("어깨장식", "에테르넬 나이트숄더", eternalShoulder, 250),
    item("무기", "제네시스 세이버", eternalWeapon, 200),
  ],
  // Accessory sets aren't job-specific, but several offer more options than the
  // grid has slots for (e.g. 3 rings, 4 pendants); only the first per slot is shown.
  [SetType.BOSS]: [
    item("얼굴장식", "응축된 힘의 결정석", condensedPowerCrystal, 110),
    item("눈장식", "파풀라투스 마크", papulatusMark, 145),
    item("귀고리", "데아 시두스 이어링", deaSidusEarring, 130),
    item("반지1", "실버블라썸 링", silverBlossomRing, 110),
    item("반지2", "고귀한 이피아의 반지", nobleIfiasRing, 120),
    item("반지3", "가디언 엔젤 링", guardianAngleRing, 160),
    item("펜던트", "메커네이터 펜던트", mechanatorPendant, 120),
    item("펜던트2", "도미네이터 펜던트", dominatorPendant, 140),
    item("벨트", "분노한 자쿰의 벨트", enragedZakumBelt, 150),
    item("어깨장식", "로얄 블랙메탈 숄더", royalBlackMetalShoulder, 120),
    item("포켓 아이템", "핑크빛 성배", pinkHolyCup, 140),
    item("뱃지", "크리스탈 웬투스 뱃지", crystalVentusBadge, 130),
  ],
  [SetType.DAWN]: [
    item("얼굴장식", "트와일라이트 마크", twilightMark, 140),
    item("귀고리", "에스텔라 이어링", estellaEarrings, 160),
    item("반지1", "여명의 가디언 엔젤 링", dawnGuardianAngelRing, 160),
    item("펜던트", "데이브레이크 펜던트", daybreakPendant, 140),
  ],
  [SetType.PITCHED]: [
    item("얼굴장식", "루즈 컨트롤 머신 마크", berserked, 160),
    item("눈장식", "마력이 깃든 안대", magicEyepatch, 160),
    item("기계 심장", "컴플리트 언더컨트롤", completeUnderControl, 200),
    item("벨트", "몽환의 벨트", dreamyBelt, 200),
    item("펜던트", "고통의 근원", sourceOfSuffering, 160),
    item("뱃지", "창세의 뱃지", genesisBadge, 200),
    item("귀고리", "커맨더 포스 이어링", commandingForceEarring, 200),
    item("반지1", "거대한 공포", endlessTerror, 200),
    item("포켓 아이템", "저주받은 적의 마도서", cursedRedSpellbook, 160),
    item("엠블렘", "미트라의 분노 : 전사", mitrasRageWarrior, 200),
  ],
  [SetType.RADIANCE]: [item("반지1", "근원의 속삭임", whispersOfTheSource, 250)],
};
