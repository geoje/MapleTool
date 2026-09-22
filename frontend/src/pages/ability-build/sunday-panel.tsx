import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function SundayPanel({ reputationDiscount, onToggle }: { reputationDiscount: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between gap-1">
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">썬데이</span>
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
