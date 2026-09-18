import { PanelLeftClose, PanelTopClose, PanelTopOpen } from "lucide-react";
import type { ReactNode } from "react";
import { SectionTitle } from "@/components/section-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CollapsibleCard({
  step,
  title,
  collapsed,
  onCollapse,
  onExpand,
  collapseVariant = "left",
  contentClassName,
  children,
}: {
  step: number;
  title: string;
  collapsed: boolean;
  onCollapse: () => void;
  onExpand: () => void;
  /** "left": collapses into a narrow vertical rail on desktop (e.g. standalone panel). "top": always collapses into a full-width horizontal bar, even on desktop (e.g. stacked alongside another panel that's still expanded). */
  collapseVariant?: "left" | "top";
  contentClassName?: string;
  children: ReactNode;
}) {
  if (collapsed) {
    if (collapseVariant === "top") {
      return (
        <Card className="w-full p-0">
          <button
            type="button"
            aria-label="확장"
            onClick={onExpand}
            className="flex w-full items-center gap-1.5 px-4 py-4 transition-colors hover:bg-muted"
          >
            <SectionTitle step={step}>{title}</SectionTitle>
            <PanelTopOpen className="size-4 text-muted-foreground" />
          </button>
        </Card>
      );
    }

    return (
      <>
        <Card className="w-full p-0 md:hidden">
          <button
            type="button"
            aria-label="확장"
            onClick={onExpand}
            className="flex w-full items-center gap-1.5 px-4 py-4 transition-colors hover:bg-muted"
          >
            <SectionTitle step={step}>{title}</SectionTitle>
            <PanelTopOpen className="size-4 text-muted-foreground" />
          </button>
        </Card>

        <Card className="relative hidden min-h-64 w-11 self-stretch overflow-hidden p-0 md:block">
          <button
            type="button"
            aria-label="확장"
            onClick={onExpand}
            className="absolute inset-0 flex items-center justify-center transition-colors hover:bg-muted"
          >
            <span className="flex -rotate-90 items-center gap-1.5 whitespace-nowrap text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <span className="font-bold normal-case text-muted-foreground/40 tabular-nums">
                {String(step).padStart(2, "0")}
              </span>
              {title}
              <PanelTopOpen className="size-4" />
            </span>
          </button>
        </Card>
      </>
    );
  }

  return (
    <Card className="w-full md:w-auto">
      <CardHeader>
        <button
          type="button"
          aria-label="축소"
          onClick={onCollapse}
          className="-m-1 flex w-fit items-center gap-1.5 rounded-md p-1 transition-colors hover:bg-muted"
        >
          <SectionTitle step={step}>{title}</SectionTitle>
          {collapseVariant === "top" ? (
            <PanelTopClose className="size-4 text-muted-foreground" />
          ) : (
            <>
              <PanelTopClose className="size-4 text-muted-foreground md:hidden" />
              <PanelLeftClose className="hidden size-4 text-muted-foreground md:block" />
            </>
          )}
        </button>
      </CardHeader>
      <CardContent className={cn("flex flex-col gap-3", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
