import {
  Badge,
  Box,
  Flex,
  Stack,
  useColorMode,
  useToken,
} from "@chakra-ui/react";
import { Select, components } from "chakra-react-select";
import {
  EFFECT_NAMES,
  MAX_APPLIED_EFFECT_LEVEL,
} from "../../../service/union/artifact/artifactConstants";

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
    <Stack>
      {effectLevels.map((effectLevel, i) => (
        <Flex key={"effect-selector-" + i} align="center" gap={2}>
          <EffectSelector
            effectName={currentEffectNames[i]}
            currentEffectNames={currentEffectNames}
            onChange={(effectName) => onChange(effectName, i)}
          />
          <Badge
            colorScheme={
              effectLevel > MAX_APPLIED_EFFECT_LEVEL ? "orange" : "blue"
            }
          >
            {Math.min(effectLevel, MAX_APPLIED_EFFECT_LEVEL)}
          </Badge>
        </Flex>
      ))}
    </Stack>
  );
}

function EffectSelector({
  effectName,
  currentEffectNames,
  onChange,
}: {
  effectName: string;
  currentEffectNames: string[];
  onChange: (effectName: string) => void;
}) {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const [hoverColor, selectedColor, hoverSelectedColor] = useToken("colors", [
    dark ? "whiteAlpha.200" : "blackAlpha.200",
    dark ? "blue.800" : "blue.50",
    dark ? "blue.700" : "blue.100",
  ]);

  return (
    <Box flex={1}>
      <Select
        options={EFFECT_NAMES.map(({ full }) => ({
          label: full,
          value: String(currentEffectNames.includes(full) ? true : false),
        }))}
        value={{ label: effectName, value: String(true) }}
        onChange={(selected) => selected && onChange(selected.label)}
        components={{
          Option: (props) => <components.Option {...props}></components.Option>,
        }}
        styles={{
          option: (base, props) => ({
            ...base,
            cursor: "pointer",
            color: dark ? "white" : "black",
            backgroundColor: props.isSelected
              ? props.isFocused
                ? hoverSelectedColor
                : selectedColor
              : props.isFocused
              ? hoverColor
              : undefined,
          }),
        }}
        useBasicStyles
      />
    </Box>
  );
}
