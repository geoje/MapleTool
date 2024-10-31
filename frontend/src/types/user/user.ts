import { MATERIAL_TYPE } from "../../constants/enhance/material";
import { POTENTIAL_GRADE } from "../../constants/enhance/potential";
import BossPlan from "./bossPlan";
import { EnhancedItem } from "./enhancedItem";

export default interface User {
  name: string;
  histories: string[];
  bossPlans: BossPlan[];
  inventory: EnhancedItem[];
  guarantees: Partial<
    Record<MATERIAL_TYPE, Partial<Record<POTENTIAL_GRADE, number>>>
  >;
}
