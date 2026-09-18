import { PanelLeftClose, PanelTopClose, PanelTopOpen } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCostExact, formatCostRounded } from "@/lib/format";
import { getStarforceCost } from "@/lib/starforce-service";
import { StarforceLevelInput } from "@/pages/enhance-expected-value/starforce-level-input";

const STAR_LEVELS = Array.from({ length: 31 }, (_, star) => star);

export function StarforceCard({
  collapsed,
  level,
  onCollapse,
  onExpand,
  onLevelChange,
}: {
  collapsed: boolean;
  level: number;
  onCollapse: () => void;
  onExpand: () => void;
  onLevelChange: (level: number) => void;
}) {
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
            <SectionTitle step={2}>스타포스</SectionTitle>
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
              <span className="font-bold normal-case text-muted-foreground/40 tabular-nums">02</span>
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
        <div className="flex items-center justify-between gap-3">
          <SectionTitle step={2}>스타포스</SectionTitle>
          <Button type="button" variant="ghost" size="icon-sm" aria-label="축소" onClick={onCollapse}>
            <PanelTopClose className="size-4 md:hidden" />
            <PanelLeftClose className="hidden size-4 md:block" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <StarforceLevelInput level={level} onChange={onLevelChange} />

        <table className="border-collapse text-xs">
          <thead>
            <tr className="border-b">
              <th className="border-r px-3 py-1 text-right font-medium text-muted-foreground">단계</th>
              <th className="w-32 px-3 py-1 text-right font-medium text-muted-foreground">단일 비용</th>
            </tr>
          </thead>
          <tbody>
            {STAR_LEVELS.map((star) => {
              const cost = getStarforceCost(level, star);
              return (
                <tr key={star} className="border-b last:border-b-0">
                  <td className="border-r px-3 py-1 text-right whitespace-nowrap tabular-nums">{star}</td>
                  <td className="w-32 px-3 py-1 text-right whitespace-nowrap tabular-nums">
                    {cost != null && (
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
      </CardContent>
    </Card>
  );
}
