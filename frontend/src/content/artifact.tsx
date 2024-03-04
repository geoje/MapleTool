import {
  Badge,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useNumberInput,
} from "@chakra-ui/react";
import ArtifactService, { MAX_ARTIFACT_LEVEL } from "../service/union/artifact";
import { useEffect, useState } from "react";

export default function Artifact() {
  const [artifactLevel, setArtifactLevel] = useState(1);
  const [currentEffectLevels, setEffectLevels] = useState<number[]>([]);

  useEffect(() => {
    setEffectLevels(ArtifactService.generateEffectLevels(artifactLevel)[0]);
  }, [artifactLevel]);

  return (
    <Flex p={4} gap={4} wrap="wrap">
      <Stack>
        <ArtifactLevel onChange={(_, value) => setArtifactLevel(value)} />
        <EffectLevel
          artifactLevel={artifactLevel}
          currentEffectLevels={currentEffectLevels}
          setEffectLevels={setEffectLevels}
        />
      </Stack>
    </Flex>
  );
}

function ArtifactLevel({
  onChange,
}: {
  onChange: (valueAsString: string, valueAsNumber: number) => void;
}) {
  return (
    <Card>
      <CardBody>
        <Heading size="sm" pb={4}>
          아티팩트 레벨
        </Heading>
        <InputArtifactLevel onChange={onChange} />
      </CardBody>
    </Card>
  );
}

function EffectLevel({
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

function InputArtifactLevel({
  onChange,
}: {
  onChange: (valueAsString: string, valueAsNumber: number) => void;
}) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: MAX_ARTIFACT_LEVEL,
      onChange,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW={48}>
      <Button {...dec}>-</Button>
      <Input size="lg" {...input} />
      <Button {...inc}>+</Button>
    </HStack>
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
