import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SUNDAY_STARFORCE_EFFECTS } from "@/constants/sunday-maple";

export function SundayStarforcePanel({
  activeKeys,
  onToggle,
}: {
  activeKeys: Set<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">썬데이</span>
      <div className="flex items-center gap-2">
        {SUNDAY_STARFORCE_EFFECTS.map((effect) => {
          const active = activeKeys.has(effect.key);
          return (
            <Tooltip key={effect.key}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={active ? "default" : "outline"}
                  size="sm"
                  onClick={() => onToggle(effect.key)}
                >
                  {effect.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">{effect.description}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
