import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { EFFECT_INFOS, MAX_APPLIED_EFFECT_LEVEL } from "@/constants/artifact";
import { isExcessEffectLevel, nextEffectLevel } from "@/lib/artifact-service";
import { cn } from "@/lib/utils";

export function SelectEffect({
  effectNamesByLevel,
  effectLevels,
  onChange,
}: {
  effectNamesByLevel: Record<number, Set<string>>;
  effectLevels: number[];
  onChange: (full: string) => void;
}) {
  const totalAssigned = Object.values(effectNamesByLevel).reduce((sum, names) => sum + names.size, 0);
  const isFull = totalAssigned >= effectLevels.length;
  const previewLevel = nextEffectLevel(effectNamesByLevel, effectLevels);

  return (
    <div className="flex flex-col gap-2">
      {EFFECT_INFOS.map((effect, i) => {
        const entry = Object.entries(effectNamesByLevel).find(([, fullNames]) => fullNames.has(effect.full));
        const id = `select-effect-${i}`;
        const disabled = !entry && isFull;

        return (
          <FieldLabel key={id} htmlFor={id} className={cn(disabled && "cursor-not-allowed opacity-50")}>
            <Field orientation="horizontal">
              <Checkbox id={id} checked={!!entry} disabled={disabled} onCheckedChange={() => onChange(effect.full)} />
              <FieldContent>
                <FieldTitle>{effect.full}</FieldTitle>
              </FieldContent>
              {entry ? (
                <Badge
                  variant="outline"
                  className={cn(
                    Number(entry[0]) > MAX_APPLIED_EFFECT_LEVEL || isExcessEffectLevel(effectLevels, Number(entry[0]), entry[1], effect.full)
                      ? "border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400"
                      : "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  )}
                >
                  {Math.min(Number(entry[0]), MAX_APPLIED_EFFECT_LEVEL)}
                </Badge>
              ) : (
                !isFull && previewLevel !== undefined && <Badge variant="outline">{previewLevel}</Badge>
              )}
            </Field>
          </FieldLabel>
        );
      })}
    </div>
  );
}
