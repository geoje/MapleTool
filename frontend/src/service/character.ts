import axios from "axios";

export default class Character {
  date: Date | undefined;
  name: string | undefined;
  world: string | undefined;
  gender: string | undefined;
  class: string | undefined;
  classLevel: string | undefined;
  level: number | undefined;
  exp: number | undefined;
  expRate: number | undefined;
  guild: string | undefined;
  image: string | undefined;

  constructor(json: string) {
    const obj = JSON.parse(json);
    this.date = new Date(Date.parse(obj["date"]));
    this.name = obj["character_name"];
    this.world = obj["world_name"];
    this.gender = obj["character_gender"];
    this.class = obj["character_class"];
    this.classLevel = obj["character_class_level"];
    this.level = obj["character_level"];
    this.exp = obj["character_exp"];
    this.expRate = obj["character_exp_rate"];
    this.guild = obj["character_guild_name"];
    this.image = obj["character_image"];
  }

  static requestOcid = async (name: string) => {
    return await axios
      .get(`/api/character/ocid?character_name=${name}`)
      .then((res) => res.data)
      .then((json) => new Character(json));
  };
}
