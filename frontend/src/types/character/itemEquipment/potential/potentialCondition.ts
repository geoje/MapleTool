import PotentialResponse from "./potentialResponse";

export default interface PotentialCondition {
  target: PotentialResponse;
  sources: PotentialResponse[];
}
