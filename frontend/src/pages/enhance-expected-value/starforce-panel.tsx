import { PanelLeftClose, PanelTopClose, PanelTopOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionTitle } from "@/components/section-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

  if (collapsed) {
    return (
      <>
        <Card className="w-full p-0 md:hidden">
          <button
            type="button"
            aria-label="확장"
            onClick={onExpand}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-muted"
          >
            <SectionTitle step={3}>스타포스</SectionTitle>
            <PanelTopOpen className="size-4 text-muted-foreground" />
          </button>
        </Card>

        <Card className="relative hidden w-11 self-stretch overflow-hidden p-0 md:block">
          <button
            type="button"
            aria-label="확장"
            onClick={onExpand}
            className="absolute inset-0 flex items-center justify-center transition-colors hover:bg-muted"
          >
            <span className="flex -rotate-90 items-center gap-1.5 whitespace-nowrap text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <span className="font-bold normal-case text-muted-foreground/40 tabular-nums">03</span>
              스타포스
              <PanelTopOpen className="size-4" />
            </span>
          </button>
        </Card>
      </>
    );
  }

  return (
    <Card className="w-full md:w-auto">
      <CardHeader>
        <button
          type="button"
          aria-label="축소"
          onClick={onCollapse}
          className="-m-1 flex w-fit items-center gap-1.5 rounded-md p-1 transition-colors hover:bg-muted"
        >
          <SectionTitle step={3}>스타포스</SectionTitle>
          <PanelTopClose className="size-4 text-muted-foreground md:hidden" />
          <PanelLeftClose className="hidden size-4 text-muted-foreground md:block" />
        </button>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
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
                      isSelected && "bg-muted/50",
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
      </CardContent>
    </Card>
  );
}
