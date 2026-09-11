import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MAX_BOSS_SELECTABLE } from "@/constants/boss";
import { calculateRevenue } from "@/lib/boss-service";
import { formatNumber } from "@/lib/format";
import type { BossPlan } from "@/types";

export function ResultTable({ bossPlans }: { bossPlans: BossPlan[] }) {
  const [excludes, setExcludes] = useState<Set<number>>(new Set());

  if (!bossPlans.length) {
    return <p className="py-6 text-center text-sm text-muted-foreground">캐릭터를 등록해주세요.</p>;
  }

  const revenues = bossPlans.map((plan) => calculateRevenue(plan));
  const totalCount = bossPlans
    .map((plan) => plan.boss.length)
    .filter((_, i) => !excludes.has(i))
    .reduce((acc, cur) => acc + cur, 0);
  const totalRevenue = revenues
    .filter((_, i) => !excludes.has(i))
    .reduce((acc, cur) => acc + cur, 0);

  const toggle = (index: number, checked: boolean) => {
    const next = new Set(excludes);
    if (checked) next.delete(index);
    else next.add(index);
    setExcludes(next);
  };

  return (
    <div className="grid grid-cols-2">
      {bossPlans.map((plan, i) => (
        <div key={"result-" + i} className="contents">
          <div
            className="flex items-center gap-2 border-b py-1"
            style={{ opacity: excludes.has(i) ? 0.4 : 1 }}
          >
            <label className="flex items-center gap-2 font-medium">
              <Checkbox checked={!excludes.has(i)} onCheckedChange={(c) => toggle(i, c == true)} />
              {plan.name}
            </label>
            <Badge variant={plan.boss.length == MAX_BOSS_SELECTABLE ? "default" : "secondary"}>
              {plan.boss.length}
            </Badge>
          </div>
          <div
            className="flex items-center justify-end border-b py-1 pl-2"
            style={{ opacity: excludes.has(i) ? 0.4 : 1 }}
          >
            {formatNumber(revenues[i])}
          </div>
        </div>
      ))}
      <div className="col-span-2 flex items-center justify-between gap-2 pt-2">
        <Badge
          variant={
            totalCount == MAX_BOSS_SELECTABLE * revenues.filter((_, i) => !excludes.has(i)).length
              ? "default"
              : "secondary"
          }
        >
          {totalCount}
        </Badge>
        <span className="font-bold">{formatNumber(totalRevenue)}</span>
      </div>
    </div>
  );
}
