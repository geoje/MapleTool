import { Badge, Flex, Radio, Stack } from "@chakra-ui/react";
import ArtifactService from "../../service/union/artifact/artifact";
import BoardCard from "../../components/boardCard";

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
    <BoardCard order={2} title="효과 레벨">
      <Stack>
        {ArtifactService.generateEffectLevels(artifactLevel).map(
          (effectLevels, i) => (
            <Radio
              key={"effect-button-" + i}
              isChecked={i == effectIndex}
              onChange={() => onChange(i, effectLevels)}
            >
              <Flex gap={1}>
                {effectLevels.map((effectLevel, j) => (
                  <Badge key={"effect-badge-" + j} colorScheme="blue">
                    {effectLevel}
                  </Badge>
                ))}
              </Flex>
            </Radio>
          )
        )}
      </Stack>
    </BoardCard>
  );
}
