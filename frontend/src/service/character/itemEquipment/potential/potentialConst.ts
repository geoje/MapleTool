import potentialOptions from "./potentialProbability.json";

export const UPGRADE_RATE = [0, 0.1, 0.035, 0.014];
export const CEILING_COUNT = [0, 10, 42, 107];
export const POTENTIAL_OPTIONS: {
  [key: string]: {
    [key: string]: {
      [key: string]: (string | number)[][][];
    };
  };
} = { ...potentialOptions };
