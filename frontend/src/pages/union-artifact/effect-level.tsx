import { Badge } from "@/components/ui/badge";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MAX_APPLIED_EFFECT_LEVEL } from "@/constants/artifact";
import { calcEffectLevelGrid } from "@/lib/artifact-service";
import { cn } from "@/lib/utils";

export function EffectLevel({
  artifactLevel,
  effectIndex,
  inGameEffectIndex,
  onChange,
}: {
  artifactLevel: number;
  effectIndex: number;
  inGameEffectIndex?: number;
  onChange: (value: number) => void;
}) {
  const grid = calcEffectLevelGrid(artifactLevel);

  return (
    <RadioGroup value={String(effectIndex)} onValueChange={(value) => onChange(Number(value))}>
      {grid.map((effectLevels, i) => {
        const id = `effect-level-${i}`;

        return (
          <FieldLabel key={id} htmlFor={id}>
            <Field orientation="horizontal">
              <RadioGroupItem value={String(i)} id={id} />
              <FieldContent>
                <div className="flex flex-wrap gap-1">
                  {effectLevels.map((level, j) => (
                    <Badge
                      key={"badge-" + j}
                      variant="outline"
                      className={cn(
                        level > MAX_APPLIED_EFFECT_LEVEL
                          ? "border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400"
                          : "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      )}
                    >
                      {level}
                    </Badge>
                  ))}
                  {i == inGameEffectIndex && (
                    <Badge variant="outline" className="border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400">
                      적용중
                    </Badge>
                  )}
                </div>
              </FieldContent>
            </Field>
          </FieldLabel>
        );
      })}
    </RadioGroup>
  );
}
