import BossPlan from "./bossPlan";
import { EnhancedItem } from "./enhancedItem";

export default interface User {
  name: string;
  histories: string[];
  bossPlans: BossPlan[];
  inventory: EnhancedItem[];
}
