import { Badge, Flex, Select, Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import { EFFECT_NAMES } from "../../service/union/artifact/artifactConstants";

export default function SelectEffect({
  effectLevels,
  currentEffectNames,
  onChange,
}: {
  effectLevels: number[];
  currentEffectNames: string[];
  onChange: (effectName: string, index: number) => void;
}) {
  return (
    <BoardCard order={3} title="효과 선택">
      <Stack>
        {effectLevels.map((effectLevel, i) => (
          <Flex key={"effect-selector-" + i} align="center" gap={2}>
            <EffectSelector
              value={currentEffectNames[i]}
              disableNames={currentEffectNames}
              onChange={(effectName) => onChange(effectName, i)}
            />
            <Badge colorScheme="blue">{effectLevel}</Badge>
          </Flex>
        ))}
      </Stack>
    </BoardCard>
  );
}

function EffectSelector({
  value,
  disableNames,
  onChange,
}: {
  value: string;
  disableNames: string[];
  onChange: (effectName: string) => void;
}) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {EFFECT_NAMES.map((effectName, i) => (
        <option
          key={"effect-" + i}
          value={effectName}
          disabled={disableNames.some(
            (disableName) => disableName == effectName
          )}
        >
          {effectName}
        </option>
      ))}
    </Select>
  );
}
