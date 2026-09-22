import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CubeType } from "@/constants/enhance";
import type { CubeGrade, CubeOptionGroup, CubeProbabilityData } from "@/hooks/use-cube-probability";
import {
  ATTACK_TEMPLATE,
  buildGradeUpRows,
  buildOptionRows,
  CostHeaderLabel,
  GRADE_LABELS,
  GRADE_ORDER,
  GradeBadge,
  OptionRowsTable,
  SkeletonCell,
} from "@/pages/enhance-cost/potential-table";
import type { GradeUpStep, OptionRow } from "@/pages/enhance-cost/potential-table";

// 소울 잠재는 장비분류/장비레벨/큐브 구분이 없는 단일 옵션 풀이라, 무기류처럼
// 공격력%만 챙기면 된다 (보스 몬스터 데미지/방무 등은 표시하지 않는다).
function buildSoulOptionRowGroups(groups: CubeOptionGroup[]): OptionRow[][] {
  return [buildOptionRows(groups, [ATTACK_TEMPLATE], (value) => `공격력 ${value}%`)].filter((rows) => rows.length > 0);
}

// 넥슨 공식 "SOUL WEAPON 재설정 비용/재설정 횟수" 공시 수치. 레전드리는 등급업
// 대상이 없어 SOUL_GRADE_UP_STEPS에는 없지만, 재설정 비용 자체는 여전히 존재한다.
const SOUL_RESET_COSTS: Record<CubeGrade, number> = {
  rare: 20_000_000,
  epic: 40_000_000,
  unique: 65_000_000,
  legendary: 88_000_000,
};

const SOUL_GRADE_UP_STEPS: Partial<Record<CubeGrade, GradeUpStep>> = {
  rare: { probability: 0.015, pity: 100 },
  epic: { probability: 0.005875, pity: 256 },
  unique: { probability: 0.003322, pity: 451 },
};

// 소울에는 미라클 타임 같은 확률 2배 이벤트가 없으므로, 공용 buildGradeUpRows가
// 함께 만들어주는 "등급업 (미라클)" 행은 걷어내고 "등급업" 행만 사용한다.
function buildSoulGradeUpRows(grade: CubeGrade): OptionRow[] {
  return buildGradeUpRows(SOUL_GRADE_UP_STEPS[grade]).filter((row) => row.label === "등급업");
}

const SKELETON_ROW_COUNT = 3;

function SoulLoadingSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="flex items-center gap-1.5 rounded-t-md bg-muted/50 px-3 py-1.5">
        <Skeleton className="h-4 w-4 rounded-sm bg-muted-foreground/20" />
        <Skeleton className="h-4 w-12 bg-muted-foreground/20" />
      </div>
      <table className="border-collapse w-full text-xs">
        <thead>
          <tr className="border-b">
            <th className="border-r px-3 py-1 text-left font-medium text-muted-foreground">옵션</th>
            <th className="px-3 py-1 text-right font-medium text-muted-foreground">
              <CostHeaderLabel cubeType={CubeType.RESET} />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
            <tr key={index} className="border-b last:border-b-0">
              <td className="border-r px-3 py-1">
                <SkeletonCell className="h-4 w-20" />
              </td>
              <td className="px-3 py-1 text-right">
                <SkeletonCell className="ml-auto h-4 w-10" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SoulPotentialTable({ data, isLoading }: { data: CubeProbabilityData | null; isLoading: boolean }) {
  const grades = GRADE_ORDER.filter((grade) => (data?.[grade]?.length ?? 0) > 0);

  const [expandedGrades, setExpandedGrades] = useState<Set<CubeGrade>>(new Set());
  const hasInitializedRef = useRef(false);

  // Same "only the highest grade starts expanded, only on first real data"
  // behavior as PotentialTable - see its own comment for why.
  useEffect(() => {
    if (hasInitializedRef.current || grades.length === 0) return;
    hasInitializedRef.current = true;
    setExpandedGrades(new Set([grades[grades.length - 1]]));
  }, [grades]);

  const toggleGrade = (grade: CubeGrade) => {
    setExpandedGrades((prev) => {
      const next = new Set(prev);
      if (next.has(grade)) next.delete(grade);
      else next.add(grade);
      return next;
    });
  };

  if (!data || grades.length === 0) {
    if (isLoading) return <SoulLoadingSkeleton />;
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-muted-foreground">데이터를 불러올 수 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {grades.map((grade) => {
        const isExpanded = expandedGrades.has(grade);
        // 재설정 비용은 재설정 1회당 비용이라 옵션/등급업 어느 쪽을 노리든 동일하게
        // 적용된다 - PotentialTable의 RESET_COSTS와 같은 취급.
        const rowGroups = [buildSoulGradeUpRows(grade), ...buildSoulOptionRowGroups(data[grade]!)].filter(
          (rows) => rows.length > 0
        );

        return (
          <div key={grade} className={cn("rounded-md border", isExpanded && "rounded-b-none")}>
            <button
              type="button"
              onClick={() => toggleGrade(grade)}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-left text-xs font-medium transition-colors hover:bg-muted",
                isExpanded && "rounded-b-none"
              )}
            >
              <span className="flex items-center gap-1.5">
                <GradeBadge grade={grade} />
                {GRADE_LABELS[grade]}
              </span>
              {isExpanded ? (
                <ChevronUp className="size-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="size-4 text-muted-foreground" />
              )}
            </button>
            {isExpanded && (
              <OptionRowsTable
                rowGroups={rowGroups}
                isLoading={isLoading}
                costPerTry={SOUL_RESET_COSTS[grade]}
                cubeType={CubeType.RESET}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
