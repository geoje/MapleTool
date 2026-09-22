import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";
import type { EdgeProps } from "@xyflow/react";

export interface LabeledEdgeRow {
  // Multiple icons render as interchangeable alternatives, joined by "또는" (e.g. either
  // circulator item works for the same reroll).
  icon: string | string[];
  value: string;
}

export interface LabeledEdgeData {
  title?: string;
  rows: LabeledEdgeRow[];
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

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} />
      {edgeData && (
        <EdgeLabelRenderer>
          <div
            className="pointer-events-none absolute flex flex-col items-center gap-1 rounded-xl border bg-card px-2.5 py-2 text-center whitespace-nowrap shadow-md"
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
