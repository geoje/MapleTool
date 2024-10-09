import blank from "../assets/world/blank.png";
import { WORLDS } from "../constants/worlds";

export function GetWorldIcon(label?: string) {
  if (!label) return blank;
  return WORLDS.find((world) => world.label == label)?.icon ?? blank;
}
