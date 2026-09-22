import { SquareMinus, SquarePlus } from "lucide-react";
import type { ReactNode } from "react";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CollapsedCardBar({
  step,
  title,
  onExpand,
  className,
}: {
  step: number;
  title: string;
  onExpand: () => void;
  className?: string;
}) {
  return (
    <Card className={cn("w-full p-0 md:w-auto", className)}>
      <button
        type="button"
        aria-label="확장"
        onClick={onExpand}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-muted"
      >
        <SectionTitle step={step}>{title}</SectionTitle>
        <SquarePlus className="size-4 text-muted-foreground" />
      </button>
    </Card>
  );
}

export function CollapsibleCard({
  step,
  title,
  collapsed,
  onCollapse,
  onExpand,
  contentClassName,
  children,
}: {
  step: number;
  title: string;
  collapsed: boolean;
  onCollapse: () => void;
  onExpand: () => void;
  contentClassName?: string;
  children: ReactNode;
}) {
  if (collapsed) {
    // On desktop, the collapsed bar is rendered in the dedicated row above instead; only show it here on mobile.
    return <CollapsedCardBar step={step} title={title} onExpand={onExpand} className="md:hidden" />;
  }

  return (
    <Card className="w-full gap-0 p-0 md:w-auto">
      <div className="flex w-full items-start justify-between gap-3">
        <div className="px-4 pt-4 pb-4">
          <SectionTitle step={step}>{title}</SectionTitle>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="축소"
          onClick={onCollapse}
          className="mt-2 mr-2 text-muted-foreground hover:text-foreground"
        >
          <SquareMinus className="size-4" />
        </Button>
      </div>
      <CardContent className={cn("flex flex-col gap-3 pb-4", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
