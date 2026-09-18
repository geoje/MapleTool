import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SUNDAY_MAPLE_EFFECTS } from "@/constants/sunday-maple";
import { cn } from "@/lib/utils";

export function SundayMaplePanel() {
  const [thisWeek, setThisWeek] = useState(true);
  const [checkedNames, setCheckedNames] = useState<Set<string>>(new Set());

  const toggleEffect = (name: string) => {
    setCheckedNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">썬데이 메이플</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn("h-7", thisWeek ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}
          onClick={() => setThisWeek((prev) => !prev)}
        >
          이번 주
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {SUNDAY_MAPLE_EFFECTS.map((effect) => {
          const id = `sunday-maple-effect-${effect.name}`;
          const checked = checkedNames.has(effect.name);

          const field = (
            <Field orientation="horizontal">
              <Checkbox id={id} checked={checked} onCheckedChange={() => toggleEffect(effect.name)} />
              <FieldContent>
                <FieldTitle>{effect.name}</FieldTitle>
              </FieldContent>
            </Field>
          );

          return effect.description ? (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <FieldLabel htmlFor={id}>{field}</FieldLabel>
              </TooltipTrigger>
              <TooltipContent side="top">{effect.description}</TooltipContent>
            </Tooltip>
          ) : (
            <FieldLabel key={id} htmlFor={id}>
              {field}
            </FieldLabel>
          );
        })}
      </div>
    </div>
  );
}
