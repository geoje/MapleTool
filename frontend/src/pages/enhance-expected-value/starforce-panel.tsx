import { useEffect, useState } from "react";
import { CollapsibleCard } from "@/components/collapsible-card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatCostExact, formatCostRounded } from "@/lib/format";
import { getMaxStar, getStarforceCost } from "@/lib/starforce-service";

export function StarforceCard({
  collapsed,
  level,
  onCollapse,
  onExpand,
}: {
  collapsed: boolean;
  level: number;
  onCollapse: () => void;
  onExpand: () => void;
}) {
  const [currentStar, setCurrentStar] = useState(0);

  const maxStar = getMaxStar(level);
  const starLevels = Array.from({ length: maxStar + 1 }, (_, star) => star);

  useEffect(() => {
    setCurrentStar((prev) => (prev > maxStar ? maxStar : prev));
  }, [maxStar]);

  return (
    <CollapsibleCard step={3} title="스타포스" collapsed={collapsed} onCollapse={onCollapse} onExpand={onExpand}>
      <RadioGroup
        className="contents"
        value={String(currentStar)}
        onValueChange={(value) => setCurrentStar(Number(value))}
      >
        <table className="border-collapse text-xs">
          <thead>
            <tr className="border-b">
              <th className="border-r px-3 py-1 text-right font-medium text-muted-foreground">현재</th>
              <th className="border-r px-3 py-1 text-right font-medium text-muted-foreground">목표</th>
              <th className="w-32 px-3 py-1 text-right font-medium text-muted-foreground">단일 비용</th>
            </tr>
          </thead>
          <tbody>
            {starLevels.map((star) => {
              const cost = getStarforceCost(level, star);
              const target = star < maxStar ? star + 1 : null;
              const isSelected = currentStar === star;
              const isFaded = target != null && target <= currentStar;
              return (
                <tr
                  key={star}
                  onClick={() => setCurrentStar(star)}
                  className={cn(
                    "border-b last:border-b-0 hover:bg-muted/30",
                    isFaded && "text-muted-foreground/40",
                  )}
                >
                  <td className="border-r px-3 py-1">
                    <div className="flex items-center justify-between gap-2 whitespace-nowrap tabular-nums">
                      <RadioGroupItem value={String(star)} aria-label={`현재 ${star}`} />
                      <span className={cn(!isSelected && "text-muted-foreground/40")}>{star}</span>
                    </div>
                  </td>
                  <td className="border-r px-3 py-1 text-right whitespace-nowrap tabular-nums">{target}</td>
                  <td className="w-32 px-3 py-1 text-right whitespace-nowrap tabular-nums">
                    {cost != null && target != null && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>{formatCostRounded(cost)}</span>
                        </TooltipTrigger>
                        <TooltipContent side="top">{formatCostExact(cost)}</TooltipContent>
                      </Tooltip>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </RadioGroup>
    </CollapsibleCard>
  );
}
