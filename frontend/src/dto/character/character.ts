import { CharacterBasic } from "./characterBasic";
import { CharacterItemEquipment } from "./characterItemEquipment";

export default interface Character {
  basic?: CharacterBasic;
  itemEquipment?: CharacterItemEquipment;
}
