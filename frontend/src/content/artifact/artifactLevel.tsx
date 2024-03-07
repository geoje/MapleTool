import {
  Button,
  HStack,
  Input,
  Tooltip,
  useNumberInput,
} from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import {
  MAX_ARTIFACT_LEVEL,
  MIN_ARTIFACT_LEVEL,
} from "../../service/union/artifact/artifactConstants";

export default function ArtifactLevel({
  onChange,
}: {
  onChange: (value: number) => void;
}) {
  return (
    <BoardCard order={1} title="아티팩트 레벨">
      <InputArtifactLevel onChange={onChange} />
    </BoardCard>
  );
}

function InputArtifactLevel({
  onChange,
}: {
  onChange: (value: number) => void;
}) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: MIN_ARTIFACT_LEVEL,
      min: MIN_ARTIFACT_LEVEL,
      max: MAX_ARTIFACT_LEVEL,
      onChange: (_, value) => onChange(value),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW={48}>
      <Button {...dec}>-</Button>
      <Input size="lg" {...input} />
      <Tooltip label="꾹 누를 수도 있어요">
        <Button {...inc}>+</Button>
      </Tooltip>
    </HStack>
  );
}
