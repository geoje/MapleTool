import type { CubeGrade } from "@/hooks/use-cube-probability";
import { cn } from "@/lib/utils";
import { GRADE_BADGE_COLORS } from "@/pages/enhance-cost/potential-table";

export interface ResultCellData {
  text: string;
  grade: CubeGrade;
  // 이번 단계에서 새로 결정된 칸만 true - 이전 단계에서부터 이어져 온 칸은 평범하게(강조 없이) 표시한다.
  isNew: boolean;
}

// 1번째 줄은 항상 100% 레전드리라 확률이 다르지만, 2번째/3번째 줄은 확률이 완전히 같아서 서로 구분할 의미가
// 없다 - 둘 다 잠그지 않은 채로 동시에 굴러가는 "같은 줄"이나 마찬가지다. 그래서 세로로 3줄을 나누는 대신
// 1번째 줄(row1) 아래에 그 "같은 줄"을 col1/col2 두 칸으로 나란히 붙여 표시한다.
export interface ResultTableData {
  row1: ResultCellData | null;
  row2Col1: ResultCellData | null;
  row2Col2: ResultCellData | null;
}

// A plain border on the cell got clipped by the container's overflow-hidden + rounded corners
// (its square corners poked out past the container's rounded mask on an edge cell), so this uses
// a ring (box-shadow) instead - it follows the cell's own rounded corners on the outer edges.
// It must stay inset: an outward ring on a "new" cell (relative z-10, stacked above its siblings)
// paints over the divider border of whichever cell sits next to it, erasing that boundary line.
const GRADE_RING_COLORS: Record<CubeGrade, string> = {
  rare: "ring-cyan-500/60",
  epic: "ring-purple-500/60",
  unique: "ring-yellow-500/60",
  legendary: "ring-green-500/60",
};

// "보공 15~20%" 같은 텍스트를 옵션 이름과 값으로 나눠 두 줄로 보여준다 - 템플릿이 전부
// "{줄임말} n{단위}" 형태라 첫 공백을 기준으로 자르면 항상 이름/값으로 나뉜다.
function splitCellText(text: string): [name: string, value: string] {
  const spaceIndex = text.indexOf(" ");
  return spaceIndex === -1 ? [text, ""] : [text.slice(0, spaceIndex), text.slice(spaceIndex + 1)];
}

function Cell({ data, splitLines, className }: { data: ResultCellData | null; splitLines: boolean; className?: string }) {
  const [name, value] = data && splitLines ? splitCellText(data.text) : [data?.text ?? "", null];

  return (
    <div
      className={cn(
        "flex min-h-12 flex-col items-center justify-center px-3 py-2 text-xs whitespace-nowrap tabular-nums",
        data
          ? cn("relative z-10 gap-0.5", GRADE_BADGE_COLORS[data.grade], data.isNew && cn("ring-2 ring-inset", GRADE_RING_COLORS[data.grade]))
          : "text-muted-foreground/40",
        className
      )}
    >
      {data ? (
        <>
          <span>{name}</span>
          {value !== null && <span>{value}</span>}
        </>
      ) : (
        "-"
      )}
    </div>
  );
}

// null인 칸은 그 자리의 옵션이 아직 이 분기에서 정해지지 않았다는 뜻이라 색 없이 "-"로 비워 둔다.
// row2는 두 줄(2·3번째 줄)이 나란히 합쳐진 자리라, min-h-24로 row1(min-h-12)의 딱 두 배 높이를 잡는다.
// row1은 항상 한 줄로 쭉 표시하고, row2 칸만 이름/값을 두 줄로 나눈다.
export function ResetResultTable({ row1, row2Col1, row2Col2 }: ResultTableData) {
  return (
    <div className="w-fit rounded-xl border bg-card shadow-lg">
      <Cell data={row1} splitLines={false} className="rounded-t-xl border-b" />
      <div className="flex">
        <Cell data={row2Col1} splitLines className="min-h-24 flex-1 rounded-bl-xl border-r" />
        <Cell data={row2Col2} splitLines className="min-h-24 flex-1 rounded-br-xl" />
      </div>
    </div>
  );
}
