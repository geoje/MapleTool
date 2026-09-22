import { Handle, Position } from "@xyflow/react";
import { ResetResultTable } from "@/pages/ability-build/reset-result-table";
import type { ResultRowData } from "@/pages/ability-build/reset-result-table";

export function ResultTableNode({ data }: { data: { rows: (ResultRowData | null)[] } }) {
  return (
    <div className="nodrag nopan pointer-events-auto">
      <Handle type="target" position={Position.Left} className="!size-0 !min-w-0 !border-0 !bg-transparent" />
      <ResetResultTable rows={data.rows} />
    </div>
  );
}
