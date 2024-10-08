import blank from "../assets/union/raid/job/blank.png";
import {
  ICONS as ARTIFACT_ICONS,
  MAX_CRYSTAL_LEVEL,
} from "../constants/artifact";
import { JOBS } from "../constants/jobs";
import { WORLDS } from "../constants/worlds";

export function getJobIcon(name?: string) {
  if (!name) return blank;
  return JOBS.find((job) => job.name == name)?.icon ?? blank;
}

export function getWorldIcon(label?: string) {
  if (!label) return blank;
  return WORLDS.find((world) => world.label == label)?.icon ?? blank;
}

export function getArtifactIcon(index?: number, level?: number) {
  return level == MAX_CRYSTAL_LEVEL
    ? ARTIFACT_ICONS[index ?? 0].purple
    : ARTIFACT_ICONS[index ?? 0].blue;
}
