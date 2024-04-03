import axios from "axios";
import { CharacterBasic } from "../../dto/character/characterBasic";
import { CharacterItemEquipment } from "../../dto/character/characterItemEquipment";
import ItemPotential from "../../dto/character/itemEquipment/itemPotential";

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
  static requestPotential(
    part: string,
    grade: string,
    level: number
  ): Promise<ItemPotential[]> {
    return axios
      .get(
        `/api/character/item-equipment/potential?part=${part}&grade=${grade}&level=${level}`
      )
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
