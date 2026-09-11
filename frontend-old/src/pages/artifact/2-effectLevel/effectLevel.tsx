import { Badge, Flex, Radio, Stack } from "@chakra-ui/react";
import { MAX_APPLIED_EFFECT_LEVEL } from "../../../constants/artifact";
import { calcEffectLevelGrid } from "../../../services/artifact";

export default function EffectLevel({
  artifactLevel,
  effectIndex,
  setEffectIndex,
}: {
  artifactLevel: number;
  effectIndex: number;
  setEffectIndex: (value: number) => void;
}) {
  return (
    <Stack>
      {calcEffectLevelGrid(artifactLevel).map((effectLevels, i) => (
        <Radio
          key={"effect-button-" + i}
          isChecked={i == effectIndex}
          onChange={() => {
            setEffectIndex(i);
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
