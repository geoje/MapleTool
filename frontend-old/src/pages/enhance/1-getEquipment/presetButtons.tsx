import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { SET_TYPE } from "../../../constants/enhance/set";

export default function PresetButtons({
  preset,
  setPreset,
}: {
  preset: number | SET_TYPE;
  setPreset: (value: number) => void;
}) {
  return (
    <Flex gap={1}>
      {[1, 2, 3].map((i) => (
        <Tooltip key={"preset-" + i} label={"프리셋 " + i} placement="top">
          <Button
            size="xs"
            colorScheme={preset == i ? "blue" : undefined}
            onClick={() => setPreset(i)}
          >
            {i}
          </Button>
        </Tooltip>
      ))}
    </Flex>
  );
}
