import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { EFFECT_INFOS } from "@/constants/artifact";

export function SelectEffect({ effectNamesByLevel }: { effectNamesByLevel: Record<number, Set<string>> }) {
  return (
    <div className="flex flex-wrap gap-1">
      {EFFECT_INFOS.map((effect, i) => {
        const entry = Object.entries(effectNamesByLevel).find(([, fullNames]) => fullNames.has(effect.full));

        return (
          <Tooltip key={"effect-" + i}>
            <TooltipTrigger asChild>
              <Badge variant={entry ? "default" : "outline"}>
                {effect.abbreviate}
                {entry ? ` ${entry[0]}` : ""}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>{effect.full}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
