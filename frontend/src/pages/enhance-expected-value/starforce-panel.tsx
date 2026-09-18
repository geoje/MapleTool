import { Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CollapsibleCard } from "@/components/collapsible-card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MEMBERSHIP_GRADES, PC_ROOM_DISCOUNT_RATE } from "@/constants/starforce";
import { cn } from "@/lib/utils";
import { formatCostExact, formatCostRounded, formatCubeCount } from "@/lib/format";
import { computeStarforceTable, getMaxStar } from "@/lib/starforce-service";
import { StarforceDiscountPanel } from "@/pages/enhance-expected-value/discount-panel";
import { SparePriceInput } from "@/pages/enhance-expected-value/spare-price-input";
import { StarforceLevelInput } from "@/pages/enhance-expected-value/starforce-level-input";
import { SundayStarforcePanel } from "@/pages/enhance-expected-value/sunday-maple-panel";

export function StarforceCard({
  collapsed,
  level,
  onLevelChange,
  onCollapse,
  onExpand,
}: {
  collapsed: boolean;
  level: number;
  onLevelChange: (value: number) => void;
  onCollapse: () => void;
  onExpand: () => void;
}) {
  const [currentStar, setCurrentStar] = useState(0);
  const [activeSundayKeys, setActiveSundayKeys] = useState<Set<string>>(new Set());
  const [membershipGrade, setMembershipGrade] = useState<string | null>(null);
  const [pcRoom, setPcRoom] = useState(false);
  const [spareValue, setSpareValue] = useState(0);

  const maxStar = getMaxStar(level);

  const costDiscountRate =
    (activeSundayKeys.has("enhanceDiscount") ? 0.3 : 0) +
    (membershipGrade ? (MEMBERSHIP_GRADES.find((grade) => grade.key === membershipGrade)?.discountRate ?? 0) / 100 : 0) +
    (pcRoom ? PC_ROOM_DISCOUNT_RATE / 100 : 0);

  const starforceTable = useMemo(
    () =>
      computeStarforceTable({
        level,
        spareValue,
        costDiscountRate,
        destroyReductionActive: activeSundayKeys.has("destructionReduction"),
        restoreMesoDiscountActive: activeSundayKeys.has("restoreDiscount"),
      }),
    [level, spareValue, costDiscountRate, activeSundayKeys],
  );
  const starLevels = Array.from({ length: maxStar + 1 }, (_, star) => star);

  useEffect(() => {
    setCurrentStar((prev) => (prev > maxStar ? maxStar : prev));
  }, [maxStar]);

  const toggleSundayEffect = (key: string) => {
    setActiveSundayKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const selectMembershipGrade = (key: string) => {
    setMembershipGrade((prev) => (prev === key ? null : key));
  };

  return (
    <CollapsibleCard step={2} title="스타포스" collapsed={collapsed} onCollapse={onCollapse} onExpand={onExpand}>
      <StarforceLevelInput level={level} onChange={onLevelChange} />
      <SparePriceInput value={spareValue} onChange={setSpareValue} />
      <SundayStarforcePanel activeKeys={activeSundayKeys} onToggle={toggleSundayEffect} />
      <StarforceDiscountPanel
        membershipGrade={membershipGrade}
        onSelectMembershipGrade={selectMembershipGrade}
        pcRoom={pcRoom}
        onTogglePcRoom={() => setPcRoom((prev) => !prev)}
      />
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
              <th className="w-32 border-r px-3 py-1 text-right font-medium text-muted-foreground">기대값</th>
              <th className="w-24 border-r px-3 py-1 text-right font-medium text-muted-foreground">기대 노작 개수</th>
              <th className="border-r px-3 py-1 text-center font-medium text-muted-foreground">파괴방지</th>
              <th className="px-3 py-1 text-center font-medium text-muted-foreground">파괴복구</th>
            </tr>
          </thead>
          <tbody>
            {starLevels.map((star) => {
              const step = star < maxStar ? starforceTable[star] : undefined;
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
                  <td className="w-32 border-r px-3 py-1 text-right whitespace-nowrap tabular-nums">
                    {step != null && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>{formatCostRounded(step.expectedCost)}</span>
                        </TooltipTrigger>
                        <TooltipContent side="top">{formatCostExact(step.expectedCost)}</TooltipContent>
                      </Tooltip>
                    )}
                  </td>
                  <td className="w-24 border-r px-3 py-1 text-right whitespace-nowrap tabular-nums">
                    {step != null && formatCubeCount(step.expectedSpareCount)}
                  </td>
                  <td className="border-r px-3 py-1 text-center">
                    {step?.useSafeguard && <Check className="mx-auto size-3.5" />}
                  </td>
                  <td className="px-3 py-1 text-center">{step?.useRestore && <Check className="mx-auto size-3.5" />}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </RadioGroup>
    </CollapsibleCard>
  );
}
