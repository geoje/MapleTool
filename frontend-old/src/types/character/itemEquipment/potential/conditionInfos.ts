import PotentialResponse from "./potentialResponse";

export default interface ConditionInfos {
  [name: string]: {
    [value: number]: {
      [grade: string]: PotentialResponse[][];
    };
  };
}
