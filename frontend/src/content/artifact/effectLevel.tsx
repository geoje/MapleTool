import {
  Badge,
  Card,
  CardBody,
  Flex,
  Heading,
  Radio,
  Stack,
} from "@chakra-ui/react";
import ArtifactService from "../../service/union/artifact";

export default function EffectLevel({
  artifactLevel,
  currentEffectLevels,
  setEffectLevels,
}: {
  artifactLevel: number;
  currentEffectLevels: number[];
  setEffectLevels: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  return (
    <Card>
      <CardBody>
        <Heading size="sm" pb={4}>
          효과 레벨
        </Heading>
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
      </CardBody>
    </Card>
  );
}

function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
