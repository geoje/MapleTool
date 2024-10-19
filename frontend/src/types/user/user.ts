import BossPlan from "./bossPlan";
import { ChangeItem } from "./changeItem";

export default interface User {
  name: string;
  histories: string[];
  bossPlans: BossPlan[];
  inventory: ChangeItem[];
}
