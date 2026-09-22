import type { CubeGrade } from "@/hooks/use-cube-probability";
import { cn } from "@/lib/utils";
import { GRADE_BADGE_COLORS } from "@/pages/enhance-cost/potential-table";

export interface ResultRowData {
  text: string;
  grade: CubeGrade;
}

// A plain inset border on the row got clipped by the container's overflow-hidden + rounded
// corners (its square corners poked out past the container's rounded mask on the first/last row).
// A ring (box-shadow) escapes outward from the row's own edge instead of being drawn inset, and
// with overflow-hidden dropped from the container it's free to spill past the table's own border
// entirely, which is the point - it should read as breaking out, not being boxed in.
const GRADE_RING_COLORS: Record<CubeGrade, string> = {
  rare: "ring-cyan-500/60",
  epic: "ring-purple-500/60",
  unique: "ring-yellow-500/60",
  legendary: "ring-green-500/60",
};

// Always renders exactly 3 rows (the 3 ability lines) - an entry of null means that line's option
// isn't determined yet on this branch, so it's shown blank (a muted "-") instead of colored.
export function ResetResultTable({ rows }: { rows: (ResultRowData | null)[] }) {
  return (
    <div className="w-fit rounded-xl border bg-card shadow-lg">
      {rows.map((row, index) => (
        <div
          key={index}
          className={cn(
            "px-3 py-2 text-xs whitespace-nowrap tabular-nums first:rounded-t-xl last:rounded-b-xl",
            index !== rows.length - 1 && "border-b",
            row
              ? cn("relative z-10 ring-2", GRADE_RING_COLORS[row.grade], GRADE_BADGE_COLORS[row.grade])
              : "text-center text-muted-foreground/40"
          )}
        >
          {row ? row.text : "-"}
        </div>
      ))}
    </div>
  );
}
