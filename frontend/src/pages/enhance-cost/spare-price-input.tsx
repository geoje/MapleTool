import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MoneyInput } from "@/components/money-input";
import type { ItemPriceInfo } from "@/lib/itemprice-service";

export function SparePriceInput({
  value,
  onChange,
  priceInfo,
  isLoadingPriceInfo,
}: {
  value: number;
  onChange: (value: number) => void;
  priceInfo?: ItemPriceInfo | null;
  isLoadingPriceInfo?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">노작 가격</span>
        {priceInfo ? (
          <Badge variant="outline" className="border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            {priceInfo.itemName}
          </Badge>
        ) : (
          isLoadingPriceInfo && <Loader2 className="size-3 shrink-0 animate-spin text-muted-foreground" />
        )}
      </div>
      <MoneyInput value={value} onChange={onChange} />
    </div>
  );
}
