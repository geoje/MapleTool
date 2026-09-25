import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SUNDAY_STARFORCE_EFFECTS } from "@/constants/sunday-maple";

export function SundayStarforcePanel({
  activeKeys,
  onToggle,
  date,
}: {
  activeKeys: Set<string>;
  onToggle: (key: string) => void;
  // Only passed while the selection still reflects the server-detected sunday event as-is - the
  // caller clears it back to undefined the moment the user manually touches any toggle.
  date?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">썬데이</span>
        {date && (
          <Badge variant="outline" className="border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            {date}
          </Badge>
        )}
      </div>
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
