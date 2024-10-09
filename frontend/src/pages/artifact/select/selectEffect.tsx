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
} from "../../../constants/artifact";
import { useEffect } from "react";

export default function SelectEffect({
  effectLevels,
  effectNames,
  setEffectNames,
}: {
  effectLevels: number[];
  effectNames: string[];
  setEffectNames: (values: string[]) => void;
}) {
  useEffect(() => {
    const unusedEffectNames = EFFECT_NAMES.filter(
      ({ full }) => !effectNames.some((existName) => existName == full)
    ).map(({ full }) => full);
    const newEffectNames = [...effectNames, ...unusedEffectNames].slice(
      0,
      effectLevels.length
    );
    setEffectNames(newEffectNames);
  }, [effectLevels, effectNames, setEffectNames]);

  return (
    <Stack>
      {effectLevels.map((effectLevel, i) => (
        <Flex key={"effect-selector-" + i} align="center" gap={2}>
          <EffectSelector
            effectName={effectNames[i]}
            effectNames={effectNames}
            onNameSelected={(effectName) => {
              const symmetryIndex = effectNames.indexOf(effectName);
              const temp = [...effectNames];
              temp[i] = effectName;
              if (symmetryIndex != -1) temp[symmetryIndex] = effectNames[i];
              setEffectNames(temp);
            }}
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
  effectNames,
  onNameSelected,
}: {
  effectName: string;
  effectNames: string[];
  onNameSelected: (effectName: string) => void;
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
        size="sm"
        options={EFFECT_NAMES.map(({ full }) => ({
          label: full,
          value: String(effectNames.includes(full) ? true : false),
        }))}
        value={{ label: effectName, value: String(true) }}
        onChange={(selected) => selected && onNameSelected(selected.label)}
        components={{
          Option: (props) => <components.Option {...props} />,
        }}
        styles={{
          option: (base, props) => ({
            ...base,
            fontSize: "var(--chakra-fontSizes-sm)",
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
