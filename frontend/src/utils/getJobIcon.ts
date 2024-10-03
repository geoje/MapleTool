import blank from "../assets/union/raid/job/blank.png";
import { jobs } from "../constants/jobs";

export function GetJobIcon(name?: string) {
  if (!name) return blank;
  return jobs.find((job) => job.name == name)?.icon ?? blank;
}
