import JOB_BLANK from "../assets/union/raid/job/blank.png";
import WORLD_BLANK from "../assets/world/blank.png";
import {
  ICONS as ARTIFACT_ICONS,
  MAX_CRYSTAL_LEVEL,
} from "../constants/artifact";
import { MATERIAL_INFOS } from "../constants/enhance/material";
import { JOBS } from "../constants/jobs";
import { WORLDS } from "../constants/worlds";
import MESO from "../assets/item/meso/bag.png";
import { ICONS as RING_ICONS } from "../constants/enhance/ring";

export function getJobIcon(name?: string) {
  if (!name) return JOB_BLANK;
  return JOBS.find((job) => job.name == name)?.icon ?? JOB_BLANK;
}

export function getWorldIcon(label?: string) {
  if (!label) return WORLD_BLANK;
  return WORLDS.find((world) => world.label == label)?.icon ?? WORLD_BLANK;
}

export function getArtifactIcon(index?: number, level?: number) {
  return level == MAX_CRYSTAL_LEVEL
    ? ARTIFACT_ICONS[index ?? 0].purple
    : ARTIFACT_ICONS[index ?? 0].blue;
}

export function getMaterialIcon(materialName: string) {
  if (materialName == "메소") return MESO;
  return Object.values(MATERIAL_INFOS).find(({ name }) => name == materialName)
    ?.icon;
}

export function getSpecialRingIcon(level: number) {
  return level >= 1 && level <= RING_ICONS.length
    ? RING_ICONS[level - 1]
    : undefined;
}
