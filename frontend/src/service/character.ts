import axios from "axios";
import { CharacterBasic, CharacterOcid } from "../model/character";

const KEY_BASIC = "character-basic";

export default class CharacterService {
  static async requestOcid(name: string): Promise<CharacterOcid> {
    return await axios
      .get(`/api/character/ocid?character_name=${name}`)
      .then((res) => res.data);
  }

  static async requestBasic(ocid: string): Promise<CharacterBasic> {
    return await axios
      .get(`/api/character/basic?ocid=${ocid}`)
      .then((res) => res.data);
  }

  static async getByName(name: string) {
    const ocid = await CharacterService.requestOcid(name).then(
      (json) => json.ocid
    );
    if (!ocid || ocid.trim() == "") throw new Error("Response ocid is empty");
    return await CharacterService.requestBasic(ocid);
  }

  static loadBasic(): CharacterBasic {
    return JSON.parse(localStorage.getItem(KEY_BASIC) ?? "{}");
  }

  static saveBasic(basic: CharacterBasic) {
    localStorage.setItem(KEY_BASIC, JSON.stringify(basic));
  }

  static isToday(character: CharacterBasic): boolean {
    if (!character.date) return false;

    const chaDate = new Date(Date.parse(character.date));

    return chaDate.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }
}
