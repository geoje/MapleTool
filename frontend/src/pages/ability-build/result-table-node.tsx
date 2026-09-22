import { Handle, Position } from "@xyflow/react";
import { ResetResultTable } from "@/pages/ability-build/reset-result-table";
import type { ResultTableData } from "@/pages/ability-build/reset-result-table";

export function ResultTableNode({ data }: { data: ResultTableData & { pinned?: boolean } }) {
  return (
    // pointer-events-auto (but no nodrag/nopan) so hovering this node still fires onNodeMouseEnter/
    // Leave for the route highlight, while a drag starting here still bubbles up to pan the canvas
    // like the empty background does. React Flow's own .react-flow__node rule forces cursor:default,
    // which otherwise flips the cursor away from the pane's grab/grabbing as soon as this element
    // becomes the pointer-events hit target - !cursor-grab overrides that back to match the pane.
    <div className="pointer-events-auto !cursor-grab">
      <Handle type="target" position={Position.Left} className="!size-0 !min-w-0 !border-0 !bg-transparent" />
      <ResetResultTable {...data} />
      <Handle type="source" position={Position.Right} className="!size-0 !min-w-0 !border-0 !bg-transparent" />
    </div>
  );
}
