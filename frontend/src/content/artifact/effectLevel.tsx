import { Badge, Flex, Radio, Stack } from "@chakra-ui/react";
import ArtifactService from "../../service/union/artifact/artifact";
import BoardCard from "../../components/boardCard";

export default function EffectLevel({
  artifactLevel,
  effectLevels: currentEffectLevels,
  setEffectLevels,
}: {
  artifactLevel: number;
  effectLevels: number[];
  setEffectLevels: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  return (
    <BoardCard order={2} title="효과 레벨">
      <Stack>
        {ArtifactService.generateEffectLevels(artifactLevel).map(
          (effectLevels, i) => (
            <Radio
              key={"effect-button-" + i}
              isChecked={arraysEqual(effectLevels, currentEffectLevels)}
              onChange={() => setEffectLevels(effectLevels)}
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

function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
