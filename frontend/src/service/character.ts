import axios from "axios";
import { CharacterBasic } from "../model/character";

const KEY_BASIC = "character-basic";

export default class CharacterService {
  static async requestBasic(name: string): Promise<CharacterBasic> {
    return await axios
      .get(`/api/character/basic?name=${name}`)
      .then((res) => res.data);
  }

  static loadBasic(): CharacterBasic {
    return JSON.parse(localStorage.getItem(KEY_BASIC) ?? "{}");
  }

  static saveBasic(basic: CharacterBasic) {
    localStorage.setItem(KEY_BASIC, JSON.stringify(basic));
  }

  static isYesterday(character: CharacterBasic): boolean {
    if (!character.date) return false;

    const characterDate = new Date(Date.parse(character.date));
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    return (
      characterDate.setHours(0, 0, 0, 0) == yesterdayDate.setHours(0, 0, 0, 0)
    );
  }
}
