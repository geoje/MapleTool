import axios from "axios";
import { CharacterBasic } from "../../dto/character/characterBasic";
import { CharacterItemEquipment } from "../../dto/character/characterItemEquipment";
import PotentialProbability from "../../dto/character/itemEquipment/potentialProbability";

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
  ): Promise<PotentialProbability[]> {
    return axios
      .get(
        `/api/character/item-equipment/potential?part=${part}&grade=${grade}&level=${level}`
      )
      .then((res) => res.data);
  }
  static requestAdditionalPotential(
    part: string,
    grade: string,
    level: number
  ): Promise<PotentialProbability[]> {
    return axios
      .get(
        `/api/character/item-equipment/additional-potential?part=${part}&grade=${grade}&level=${level}`
      )
      .then((res) => res.data);
  }

  static loadBasic(): CharacterBasic | null {
    return JSON.parse(localStorage.getItem(KEY_BASIC) ?? "null");
  }
  static loadItemEquipment(): CharacterItemEquipment | null {
    return JSON.parse(localStorage.getItem(KEY_ITEM_EQUIPMENT) ?? "null");
  }

  static saveBasic(basic?: CharacterBasic) {
    if (!basic) {
      localStorage.removeItem(KEY_BASIC);
      return;
    }
    localStorage.setItem(KEY_BASIC, JSON.stringify(basic));
  }
  static saveItemEquipment(itemEquipment?: CharacterItemEquipment) {
    if (!itemEquipment) {
      localStorage.removeItem(KEY_ITEM_EQUIPMENT);
      return;
    }
    localStorage.setItem(KEY_ITEM_EQUIPMENT, JSON.stringify(itemEquipment));
  }
}
