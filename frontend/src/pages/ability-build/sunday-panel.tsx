import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function SundayPanel({
  reputationDiscount,
  onToggle,
  date,
}: {
  reputationDiscount: boolean;
  onToggle: () => void;
  // Only passed while the toggle still reflects the server-detected sunday event as-is - the
  // caller clears it back to undefined the moment the user manually touches the toggle.
  date?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">썬데이</span>
        {date && (
          <Badge variant="outline" className="border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            {date}
          </Badge>
        )}
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" variant={reputationDiscount ? "default" : "outline"} size="xs" onClick={onToggle}>
            명성치 할인
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">어빌리티 재설정 비용 50% 할인</TooltipContent>
      </Tooltip>
    </div>
  );
}
