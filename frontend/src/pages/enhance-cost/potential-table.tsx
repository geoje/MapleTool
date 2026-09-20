import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PotentialGrade, POTENTIAL_GRADE_INFOS } from "@/constants/enhance";
import type { CubeGrade, CubeProbabilityData } from "@/hooks/use-cube-probability";
import { extractPotentialOptionValue } from "@/lib/potential-option";

const GRADE_ORDER: CubeGrade[] = ["rare", "epic", "unique", "legendary"];

const GRADE_LABELS: Record<CubeGrade, string> = {
  rare: POTENTIAL_GRADE_INFOS[PotentialGrade.RARE].name,
  epic: POTENTIAL_GRADE_INFOS[PotentialGrade.EPIC].name,
  unique: POTENTIAL_GRADE_INFOS[PotentialGrade.UNIQUE].name,
  legendary: POTENTIAL_GRADE_INFOS[PotentialGrade.LEGENDARY].name,
};

export function PotentialTable({
  optionData,
  isLoading,
}: {
  optionData: CubeProbabilityData | null;
  isLoading: boolean;
}) {
  const grades = useMemo(
    () => GRADE_ORDER.filter((grade) => (optionData?.[grade]?.length ?? 0) > 0),
    [optionData]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  if (!optionData || grades.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-muted-foreground">데이터를 불러올 수 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">옵션 등급 설정 확률</h3>
      <Tabs defaultValue={grades[0]} className="w-full">
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${grades.length}, 1fr)` }}>
          {grades.map((grade) => (
            <TabsTrigger key={grade} value={grade} className="text-xs">
              {GRADE_LABELS[grade]}
            </TabsTrigger>
          ))}
        </TabsList>

        {grades.map((grade) => (
          <TabsContent key={grade} value={grade} className="space-y-4">
            {optionData[grade]!.map((option) => (
              <div key={option.optionNumber} className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">{option.optionNumber}번째 옵션</div>
                <table className="border-collapse w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="border-r px-3 py-1 text-left font-medium text-muted-foreground">결과</th>
                      <th className="border-r px-3 py-1 text-right font-medium text-muted-foreground">값</th>
                      <th className="px-3 py-1 text-right font-medium text-muted-foreground">확률</th>
                    </tr>
                  </thead>
                  <tbody>
                    {option.items.map((item, index) => {
                      const { name, value } = extractPotentialOptionValue(item.name);
                      return (
                        <tr key={index} className="border-b last:border-b-0 hover:bg-muted/30">
                          <td className="border-r px-3 py-1">{name}</td>
                          <td className="border-r px-3 py-1 text-right whitespace-nowrap tabular-nums">{value}</td>
                          <td className="px-3 py-1 text-right whitespace-nowrap tabular-nums">
                            {(item.probability * 100).toFixed(4)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
