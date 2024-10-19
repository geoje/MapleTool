import { MAX_STARFORCE_COUNTS } from "../constants/enhance/startforce";
import { ItemEquipmentDetail } from "../types/character/itemEquipment/itemEquipment";

export function getMaxStarforceCount(item: ItemEquipmentDetail) {
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
