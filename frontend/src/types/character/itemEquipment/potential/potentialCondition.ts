import { POTENTIAL_GRADE } from "../../../../constants/enhance/potential";

export default interface PotentialCondition {
  name: string;
  value: number;
  grades: POTENTIAL_GRADE[];
}
