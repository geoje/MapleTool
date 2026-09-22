import { Handle, Position } from "@xyflow/react";
import { ResetResultTable } from "@/pages/ability-build/reset-result-table";
import type { ResultTableData } from "@/pages/ability-build/reset-result-table";

export function ResultTableNode({ data }: { data: ResultTableData }) {
  return (
    // No nodrag/nopan/pointer-events-auto here (unlike OptionPanelNode) - this table has no
    // interactive controls, so it should stay pass-through and pan the canvas like the empty
    // background does, cursor included.
    <div>
      <Handle type="target" position={Position.Left} className="!size-0 !min-w-0 !border-0 !bg-transparent" />
      <ResetResultTable {...data} />
      <Handle type="source" position={Position.Right} className="!size-0 !min-w-0 !border-0 !bg-transparent" />
    </div>
  );
}
