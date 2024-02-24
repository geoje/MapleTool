import axios from "axios";
import { CharacterBasic, CharacterItemEquipment } from "../../domain/character";

const KEY_BASIC = "character-basic";
const KEY_ITEM_EQUIPMENT = "character-item-equipment";

export default abstract class CharacterService {
  static requestBasic(name: string): Promise<CharacterBasic> {
    return axios
      .get(`/api/character/basic?name=${name}`)
      .then((res) => res.data);
  }
  static requestItemEquipment(name: string): Promise<CharacterItemEquipment> {
    return axios
      .get(`/api/character/item-equipment?name=${name}`)
      .then((res) => res.data);
  }

  static loadBasic(): CharacterBasic | null {
    return JSON.parse(localStorage.getItem(KEY_BASIC) ?? "null");
  }
  static loadItemEquipment(): CharacterItemEquipment | null {
    return JSON.parse(localStorage.getItem(KEY_ITEM_EQUIPMENT) ?? "null");
  }

  static saveBasic(basic: CharacterBasic) {
    localStorage.setItem(KEY_BASIC, JSON.stringify(basic));
  }
  static saveItemEquipment(itemEquipment: CharacterItemEquipment) {
    localStorage.setItem(KEY_ITEM_EQUIPMENT, JSON.stringify(itemEquipment));
  }
}
