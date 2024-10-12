import {
  Button,
  HStack,
  Input,
  Tooltip,
  useNumberInput,
} from "@chakra-ui/react";
import {
  MAX_ARTIFACT_LEVEL,
  MIN_ARTIFACT_LEVEL,
} from "../../../constants/artifact";

export default function ArtifactLevel({
  artifactLevel,
  setArtifactlevel,
}: {
  artifactLevel: number;
  setArtifactlevel: (value: number) => void;
}) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      min: MIN_ARTIFACT_LEVEL,
      max: MAX_ARTIFACT_LEVEL,
      value: artifactLevel,
      onChange: (_, value) => setArtifactlevel(value),
    });

  return (
    <HStack maxW={48}>
      <Button {...getDecrementButtonProps()}>-</Button>
      <Input size="lg" {...getInputProps()} />
      <Tooltip label="꾹 누를 수도 있어요">
        <Button {...getIncrementButtonProps()}>+</Button>
      </Tooltip>
    </HStack>
  );
}
