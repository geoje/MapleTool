import { Badge, Flex, Radio, Stack } from "@chakra-ui/react";
import ArtifactService from "../../../service/union/artifact/artifact";
import { MAX_APPLIED_EFFECT_LEVEL } from "../../../service/union/artifact/artifactConstants";

export default function EffectLevel({
  artifactLevel,
  effectIndex,
  onChange,
}: {
  artifactLevel: number;
  effectIndex: number;
  onChange: (index: number, effectLevels: number[]) => void;
}) {
  return (
    <Stack>
      {ArtifactService.effectLevels(artifactLevel).map((effectLevels, i) => (
        <Radio
          key={"effect-button-" + i}
          isChecked={i == effectIndex}
          onChange={() => onChange(i, effectLevels)}
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
