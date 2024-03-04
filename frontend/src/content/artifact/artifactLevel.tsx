import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { MAX_ARTIFACT_LEVEL } from "../../service/union/artifact";
import BoardCard from "../../components/boardCard";

export default function ArtifactLevel({
  onChange,
}: {
  onChange: (valueAsString: string, valueAsNumber: number) => void;
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
