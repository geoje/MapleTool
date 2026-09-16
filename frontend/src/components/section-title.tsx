import type { ReactNode } from "react";
import { CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  step: number;
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ step, children, className }: SectionTitleProps) {
  return (
    <CardTitle
      className={cn("flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground", className)}
    >
      <span className="font-bold normal-case text-muted-foreground/40 tabular-nums">{String(step).padStart(2, "0")}</span>
      {children}
    </CardTitle>
  );
}
