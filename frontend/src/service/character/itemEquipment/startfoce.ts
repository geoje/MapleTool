import { CharacterItemEquipmentDetail } from "../../../types/character/characterItemEquipment";
import { MAX_STARFORCE_COUNTS } from "./itemEquipmentConst";

export default abstract class StarfoceService {
  static getMaxStarforceCount(item: CharacterItemEquipmentDetail) {
    if (
      [
        item.scroll_upgrade,
        item.scroll_upgradeable_count,
        item.scroll_resilience_count,
      ].every((upgrade) => upgrade == "0")
    ) {
      return 0;
    }

    // TODO: calculate for superior
    for (const startforceCount of MAX_STARFORCE_COUNTS) {
      if (item.item_base_option.base_equipment_level >= startforceCount.level) {
        return startforceCount.common;
      }
    }
    return MAX_STARFORCE_COUNTS[MAX_STARFORCE_COUNTS.length - 1].common;
  }
}
