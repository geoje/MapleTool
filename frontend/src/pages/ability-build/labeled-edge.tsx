import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";
import type { EdgeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";

export interface LabeledEdgeRow {
  // Multiple icons render as interchangeable alternatives, joined by "또는" (e.g. either
  // circulator item works for the same reroll).
  icon: string | string[];
  value: string;
}

export interface LabeledEdgeData {
  title?: string;
  rows: LabeledEdgeRow[];
  // Raw reputation cost this edge adds, used to find the cheapest end-to-end route - not shown
  // directly (rows already hold the formatted display string).
  reputationCost?: number;
  // Raw meso cost this edge adds (advanced reset try cost and/or circulator meso-equivalent
  // price), used to find the cheapest end-to-end route when comparing purely in meso - not shown
  // directly (rows already hold the formatted display string).
  mesoCost?: number;
  // Marks this edge as part of the cheapest route to its branch's final table.
  highlighted?: boolean;
  [key: string]: unknown;
}

export function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const edgeData = data as LabeledEdgeData | undefined;
  const isHighlighted = edgeData?.highlighted === true;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          ...(isHighlighted ? { stroke: "#3b82f6", strokeWidth: 2.5 } : {}),
          transition: "stroke 0.2s ease, stroke-width 0.2s ease",
        }}
      />
      {edgeData && (
        <EdgeLabelRenderer>
          <div
            className={cn(
              "pointer-events-none absolute flex flex-col items-center gap-1 rounded-xl border bg-card px-2.5 py-2 text-center whitespace-nowrap shadow-md transition-colors duration-200",
              isHighlighted && "border-blue-500 bg-blue-50 dark:bg-blue-950/40"
            )}
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
          >
            {edgeData.title && <span className="text-[11px] leading-tight text-muted-foreground">{edgeData.title}</span>}
            {edgeData.rows.map((row, i) => {
              const icons = Array.isArray(row.icon) ? row.icon : [row.icon];
              return (
                <div key={i} className="flex items-center gap-1.5">
                  {icons.map((icon, j) => (
                    <span key={j} className="flex items-center gap-1.5">
                      {j > 0 && <span className="text-[11px] text-muted-foreground">또는</span>}
                      <img src={icon} alt="" className="size-4 shrink-0 object-contain" />
                    </span>
                  ))}
                  <span className="text-xs leading-tight font-semibold tabular-nums">{row.value}</span>
                </div>
              );
            })}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
