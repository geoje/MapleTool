import BossPlan from "./bossPlan";

export default interface User {
  name: string;
  histories: string[];
  bossPlans: BossPlan[];
}
