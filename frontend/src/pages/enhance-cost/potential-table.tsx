import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CubeDataResponse } from "@/constants/enhance";

export function PotentialTable({
  optionData,
  isLoading,
}: {
  optionData: CubeDataResponse | null;
  isLoading: boolean;
}) {
  const grades = useMemo(() => {
    if (!optionData?.gradeUp) return [];
    const uniqueGrades = new Set<string>();
    optionData.gradeUp.forEach((row) => {
      uniqueGrades.add(row.from);
      uniqueGrades.add(row.to);
    });
    return Array.from(uniqueGrades).sort();
  }, [optionData?.gradeUp]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  if (!optionData) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-muted-foreground">데이터를 불러올 수 없습니다</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {optionData.maxGrade && (
        <p className="text-xs text-muted-foreground">최고 등급: {optionData.maxGrade}</p>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-medium">등급 상승 확률</h3>
        <table className="border-collapse w-full text-xs">
          <thead>
            <tr className="border-b">
              <th className="border-r px-3 py-2 text-left font-medium text-muted-foreground">구분</th>
              <th className="px-3 py-2 text-right font-medium text-muted-foreground">확률</th>
            </tr>
          </thead>
          <tbody>
            {optionData.gradeUp.map((row, index) => (
              <tr key={index} className="border-b last:border-b-0 hover:bg-muted/30">
                <td className="border-r px-3 py-2 whitespace-nowrap">
                  {row.from} → {row.to}
                  {row.cubeType && <span className="text-muted-foreground ml-1">({row.cubeType})</span>}
                </td>
                <td className="px-3 py-2 text-right whitespace-nowrap tabular-nums">
                  {(row.probability * 100).toFixed(4)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {optionData.guarantee && optionData.guarantee.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">등급 상승 보장 시스템</h3>
          <table className="border-collapse w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="border-r px-3 py-2 text-left font-medium text-muted-foreground">구분</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">보장 횟수</th>
              </tr>
            </thead>
            <tbody>
              {optionData.guarantee.map((row, index) => (
                <tr key={index} className="border-b last:border-b-0 hover:bg-muted/30">
                  <td className="border-r px-3 py-2 whitespace-nowrap">
                    {row.from} → {row.to}
                    {row.cubeType && <span className="text-muted-foreground ml-1">({row.cubeType})</span>}
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap tabular-nums">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {optionData.optionProbability && optionData.optionProbability.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">옵션 등급 설정 확률</h3>
          <Tabs defaultValue={grades[0]} className="w-full">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${Math.min(grades.length, 4)}, 1fr)` }}>
              {grades.map((grade) => (
                <TabsTrigger key={grade} value={grade} className="text-xs">
                  {grade}
                </TabsTrigger>
              ))}
            </TabsList>

            {grades.map((grade) => {
              const optionsForGrade = optionData.optionProbability?.filter((op) => op.grade === grade) || [];
              return (
                <TabsContent key={grade} value={grade} className="space-y-4">
                  {optionsForGrade.map((option) => (
                    <div key={option.optionNumber} className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">
                        {option.optionNumber}번째 옵션
                      </div>
                      <table className="border-collapse w-full text-xs">
                        <thead>
                          <tr className="border-b">
                            <th className="border-r px-3 py-1 text-left font-medium text-muted-foreground">결과</th>
                            <th className="px-3 py-1 text-right font-medium text-muted-foreground">확률</th>
                          </tr>
                        </thead>
                        <tbody>
                          {option.items.map((item, index) => (
                            <tr key={index} className="border-b last:border-b-0 hover:bg-muted/30">
                              <td className="border-r px-3 py-1">{item.name}</td>
                              <td className="px-3 py-1 text-right whitespace-nowrap tabular-nums">
                                {(item.probability * 100).toFixed(4)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      )}
    </div>
  );
}
