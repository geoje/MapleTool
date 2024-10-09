import BossPlan from "./bossPlan";

export default interface User {
  name: string;
  history: string[];
  bossPlan: BossPlan[];
}
