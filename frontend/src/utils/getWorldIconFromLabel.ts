import { worlds } from "../constants/worlds";
import blank from "../assets/world/blank.png";

export default function GetWorldIconFromLabel(label?: string) {
  if (!label) return blank;
  return worlds.find((world) => world.label == label)?.icon ?? blank;
}
