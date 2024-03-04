import { Badge, Flex, Select, Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";

export default function SelectEffect({
  effectLevels,
}: {
  effectLevels: number[];
}) {
  return (
    <BoardCard order={3} title="효과 선택">
      <Stack>
        {effectLevels.map((effectLevel, i) => (
          <Flex key={"effect-selector-" + i} align="center" gap={2}>
            <EffectSelector />
            <Badge colorScheme="blue">{effectLevel}</Badge>
          </Flex>
        ))}
      </Stack>
    </BoardCard>
  );
}

function EffectSelector() {
  return (
    <Select placeholder="Select option">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
}
