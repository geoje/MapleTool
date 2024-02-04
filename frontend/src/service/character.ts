import axios from "axios";

export default class Character {
  date: string | undefined;
  character_name: string | undefined;
  world_name: string | undefined;
  character_gender: string | undefined;
  character_class: string | undefined;
  character_class_level: string | undefined;
  character_level: number | undefined;
  character_exp: number | undefined;
  character_exp_rate: number | undefined;
  character_guild_name: string | undefined;
  character_image: string | undefined;

  static requestOcid = async (name: string) => {
    return await axios
      .get(`/api/character/ocid?character_name=${name}`)
      .then((res) => res.data);
  };

  static requestBasic = async (ocid: string) => {
    return await axios
      .get(`/api/character/basic?ocid=${ocid}`)
      .then((res) => res.data);
  };

  static getByName = async (name: string) => {
    const ocid = await Character.requestOcid(name).then((json) => json.ocid);
    const character: Character = Object.assign(
      new Character(),
      await Character.requestBasic(ocid)
    );
    return character;
  };

  parsedDate = () =>
    new Date(Date.parse(this.date ?? new Date(0).toISOString()));
}
