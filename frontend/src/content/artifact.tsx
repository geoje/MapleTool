import {
  Badge,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  useNumberInput,
} from "@chakra-ui/react";
import ArtifactService, {
  MAX_ARTIFACT_LEVEL,
  MAX_APPLIED_EFFECT_LEVEL,
} from "../service/union/artifact";
import { useState } from "react";

export default function Artifact() {
  const [artifactLevel, setArtifactLevel] = useState(1);

  return (
    <Flex p={4} gap={4} wrap="wrap">
      <Card>
        <CardBody>
          <Heading size="sm" pb={4}>
            레벨
          </Heading>
          <InputArtifactLevel
            onChange={(_, value) => setArtifactLevel(value)}
          />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Stack>
            {ArtifactService.generateEffectLevels(artifactLevel).map(
              (effectLevels, i) => (
                <Button
                  key={"effect-button-" + i}
                  gap={1}
                  variant="ghost"
                  size="xs"
                >
                  {effectLevels.slice(1).map((effectLevel, j) => (
                    <Badge key={"effect-badge-" + j} colorScheme="blue">
                      {effectLevel}
                    </Badge>
                  ))}
                </Button>
              )
            )}
          </Stack>
        </CardBody>
      </Card>
    </Flex>
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
