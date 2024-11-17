import { Badge, Button, Flex, Stack, Tooltip } from "@chakra-ui/react";
import { EFFECT_INFOS } from "../../../constants/artifact";
import { groupEffectLevelsCount } from "../../../services/artifact";

export default function SelectEffect({
  effectLevels,
  effectNamesByLevel,
  setEffectNamesByLevel,
}: {
  effectLevels: number[];
  effectNamesByLevel: Record<number, Set<string>>;
  setEffectNamesByLevel: (values: Record<number, Set<string>>) => void;
}) {
  const effectLevelsCount = groupEffectLevelsCount(effectLevels);
  const fullNamesCount = Object.values(effectNamesByLevel)
    .map((levels) => levels.size)
    .reduce((prev, cur) => prev + cur, 0);

  return (
    <Stack gap={fullNamesCount == effectLevels.length ? 0 : 4}>
      <Flex gap={1} wrap="wrap">
        {Object.keys(effectLevelsCount)
          .map((level) => Number(level))
          .sort((a, b) => b - a)
          .map((level) =>
            new Array(
              (effectLevelsCount[level] ?? 0) -
                (effectNamesByLevel[level]?.size ?? 0)
            )
              .fill(0)
              .map((_, i) => (
                <Badge key={"level-" + i} size="xs" colorScheme="blue">
                  {level}
                </Badge>
              ))
          )}
      </Flex>
      <Flex gap={1} wrap="wrap">
        {EFFECT_INFOS.map((effect, i) => {
          const entry = Object.entries(effectNamesByLevel).find(
            ([_, fullNames]) => fullNames.has(effect.full)
          );

          return (
            <Tooltip key={"effect-" + i} placement="top" label={effect.full}>
              <Button
                size="xs"
                colorScheme="blue"
                variant={entry ? undefined : "outline"}
                isDisabled={!entry && fullNamesCount == effectLevels.length}
                onClick={() => {
                  if (entry) {
                    entry[1].delete(effect.full);
                    setEffectNamesByLevel({
                      ...effectNamesByLevel,
                      [Number(entry[0])]: entry[1],
                    });
                    return;
                  }

                  for (const level of new Set(effectLevels)) {
                    if (
                      (effectNamesByLevel[level]?.size ?? 0) <
                      effectLevelsCount[level]
                    ) {
                      setEffectNamesByLevel({
                        ...effectNamesByLevel,
                        [level]: new Set([
                          ...(effectNamesByLevel[level] ?? []),
                          effect.full,
                        ]),
                      });
                      return;
                    }
                  }
                }}
              >
                {effect.abbreviate}
                {entry ? ` ${entry[0]}` : ""}
              </Button>
            </Tooltip>
          );
        })}
      </Flex>
    </Stack>
  );
}
