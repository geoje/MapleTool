import { POTENTIAL_OPTIONS } from "./potentialProbabilityConst";

const PROPABILITY_OFFSET = 0.00001;

test("sumOfProbabilityIsOne", () => {
  for (const type in POTENTIAL_OPTIONS)
    for (const level in POTENTIAL_OPTIONS[type])
      for (const grade in POTENTIAL_OPTIONS[type][level]) {
        const options = POTENTIAL_OPTIONS[type][level][grade];
        for (const order in options) {
          const sumOfPropability = options[order]
            .map((option) => <number>option[2])
            .reduce((p, c) => p + c);
          const actual = Math.abs(1 - sumOfPropability);

          expect(actual).toBeLessThan(PROPABILITY_OFFSET);
        }
      }
});
