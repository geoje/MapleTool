import blank from "../assets/world/blank.png";
import { worlds } from "../constants/worlds";

export function GetWorldIcon(label?: string) {
  if (!label) return blank;
  return worlds.find((world) => world.label == label)?.icon ?? blank;
}
