import { Badge, Flex, Radio, Stack } from "@chakra-ui/react";
import { MAX_APPLIED_EFFECT_LEVEL } from "../../../constants/artifact";
import { calcEffectLevels } from "../../../utils/artifact";
import { useEffect } from "react";

export default function EffectLevel({
  artifactLevel,
  effectIndex,
  setEffectIndex,
  setEffectLevels,
}: {
  artifactLevel: number;
  effectIndex: number;
  setEffectIndex: (value: number) => void;
  setEffectLevels: (values: number[]) => void;
}) {
  useEffect(() => {
    setEffectIndex(0);
    setEffectLevels(calcEffectLevels(artifactLevel)[0]);
  }, [artifactLevel]);

  return (
    <Stack>
      {calcEffectLevels(artifactLevel).map((effectLevels, i) => (
        <Radio
          key={"effect-button-" + i}
          isChecked={i == effectIndex}
          onChange={() => {
            setEffectIndex(i);
            setEffectLevels(effectLevels);
          }}
        >
          <Flex gap={1}>
            {effectLevels.map((effectLevel, j) => (
              <Badge
                key={"effect-badge-" + j}
                colorScheme={
                  effectLevel > MAX_APPLIED_EFFECT_LEVEL ? "orange" : "blue"
                }
              >
                {effectLevel}
              </Badge>
            ))}
          </Flex>
        </Radio>
      ))}
    </Stack>
  );
}
