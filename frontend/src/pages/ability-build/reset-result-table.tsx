import type { CubeGrade } from "@/hooks/use-cube-probability";
import { cn } from "@/lib/utils";
import { GRADE_BADGE_COLORS } from "@/pages/enhance-cost/potential-table";

export interface ResultCellData {
  text: string;
  grade: CubeGrade;
}

// row2/row3 have identical odds and roll simultaneously, so they're merged into row2Col1/row2Col2
// instead of separate row2/row3 fields.
export interface ResultTableData {
  row1: ResultCellData | null;
  row2Col1: ResultCellData | null;
  row2Col2: ResultCellData | null;
}

// Every option text follows "{abbreviation} n{unit}", so splitting on the first space always
// separates name from value.
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
        data ? cn("border", GRADE_BADGE_COLORS[data.grade]) : "text-muted-foreground/40",
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
