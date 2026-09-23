import { Loader2 } from "lucide-react";
import { MoneyInput } from "@/components/money-input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function IconPriceRow({
  icon,
  tooltip,
  value,
  onChange,
  isLoading,
}: {
  icon: string;
  tooltip: string;
  value: number;
  onChange: (value: number) => void;
  isLoading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-1.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <img src={icon} alt={tooltip} className="size-4 shrink-0 object-contain" />
        </TooltipTrigger>
        <TooltipContent side="top">{tooltip}</TooltipContent>
      </Tooltip>
      {isLoading ? (
        <Loader2 className="size-3 shrink-0 animate-spin text-muted-foreground" />
      ) : (
        <MoneyInput value={value} onChange={onChange} className="w-auto flex-none rounded-full" />
      )}
    </div>
  );
}
