import {
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Input,
  useNumberInput,
} from "@chakra-ui/react";
import { MAX_ARTIFACT_LEVEL } from "../../service/union/artifact";

export default function ArtifactLevel({
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
