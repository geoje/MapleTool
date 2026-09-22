import { useReactFlow } from "@xyflow/react";
import { Maximize, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";

// Mirrors React Flow's own zoom/fit-view controls, but relocated into the app
// nav bar (via the shared ReactFlowProvider set up in AppLayout) instead of
// floating over the canvas.
export function CanvasControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <ButtonGroup>
      <Button type="button" variant="outline" size="icon-sm" aria-label="화면에 맞추기" onClick={() => fitView()}>
        <Maximize className="size-3.5" />
      </Button>
      <ButtonGroupSeparator />
      <Button type="button" variant="outline" size="icon-sm" aria-label="축소" onClick={() => zoomOut()}>
        <ZoomOut className="size-3.5" />
      </Button>
      <Button type="button" variant="outline" size="icon-sm" aria-label="확대" onClick={() => zoomIn()}>
        <ZoomIn className="size-3.5" />
      </Button>
    </ButtonGroup>
  );
}
