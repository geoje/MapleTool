import { Handle, Position } from "@xyflow/react";
import type { ResetType } from "@/constants/ability";
import { ResetTypePanel } from "@/pages/ability-build/reset-type-panel";
import { SelectOption } from "@/pages/ability-build/select-option";
import { SundayPanel } from "@/pages/ability-build/sunday-panel";

export const OPTION_PANEL_WIDTH = 160;

export interface OptionPanelData {
  selectedNames: Set<string>;
  onChangeSelected: (name: string) => void;
  reputationDiscount: boolean;
  onToggleDiscount: () => void;
  resetType: ResetType;
  onChangeResetType: (type: ResetType) => void;
}

export function OptionPanelNode({ data }: { data: OptionPanelData }) {
  return (
    // React Flow makes `.react-flow__node` pointer-events:none once dragging is
    // disabled (it inherits), so the checkboxes/buttons inside need it explicitly
    // re-enabled; "nodrag nopan" also stops clicks here from panning the canvas.
    <div
      className="nodrag nopan pointer-events-auto flex flex-col gap-2 rounded-2xl border bg-card p-3 shadow-lg"
      style={{ width: OPTION_PANEL_WIDTH }}
    >
      <span className="text-xs font-semibold">옵션</span>
      <ResetTypePanel resetType={data.resetType} onChange={data.onChangeResetType} />
      <SundayPanel reputationDiscount={data.reputationDiscount} onToggle={data.onToggleDiscount} />
      <SelectOption selectedNames={data.selectedNames} onChange={data.onChangeSelected} resetType={data.resetType} />
      <Handle type="source" position={Position.Right} className="!size-0 !min-w-0 !border-0 !bg-transparent" />
    </div>
  );
}
