import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { EFFECT_INFOS } from "@/constants/artifact";
import { groupEffectLevelsCount } from "@/lib/artifact-service";
import { cn } from "@/lib/utils";

export function SelectEffect({
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
  const isComplete = fullNamesCount == effectLevels.length;

  return (
    <div className={cn("flex flex-col", isComplete ? "gap-0" : "gap-4")}>
      <div className="flex flex-wrap gap-1">
        {Object.keys(effectLevelsCount)
          .map((level) => Number(level))
          .sort((a, b) => b - a)
          .flatMap((level) =>
            Array.from(
              {
                length: Math.max(0, (effectLevelsCount[level] ?? 0) - (effectNamesByLevel[level]?.size ?? 0)),
              },
              (_, i) => (
                <Badge key={`level-${level}-${i}`} variant="secondary">
                  {level}
                </Badge>
              )
            )
          )}
      </div>
      <div className="flex flex-wrap gap-1">
        {EFFECT_INFOS.map((effect, i) => {
          const entry = Object.entries(effectNamesByLevel).find(([, fullNames]) => fullNames.has(effect.full));

          return (
            <Tooltip key={"effect-" + i}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="xs"
                  variant={entry ? "default" : "outline"}
                  disabled={!entry && isComplete}
                  onClick={() => {
                    if (entry) {
                      const [level, fullNames] = entry;
                      const next = new Set(fullNames);
                      next.delete(effect.full);
                      setEffectNamesByLevel({ ...effectNamesByLevel, [Number(level)]: next });
                      return;
                    }

                    for (const level of new Set(effectLevels)) {
                      if ((effectNamesByLevel[level]?.size ?? 0) < effectLevelsCount[level]) {
                        setEffectNamesByLevel({
                          ...effectNamesByLevel,
                          [level]: new Set([...(effectNamesByLevel[level] ?? []), effect.full]),
                        });
                        return;
                      }
                    }
                  }}
                >
                  {effect.abbreviate}
                  {entry ? ` ${entry[0]}` : ""}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{effect.full}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
