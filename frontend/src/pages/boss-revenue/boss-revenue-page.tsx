import { Scale, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { convertPlansToParams } from "@/lib/boss-service";
import { cn } from "@/lib/utils";
import { useBossStore } from "@/stores/boss-store";
import { BossTable, BossTableActions } from "@/pages/boss-revenue/boss-table";
import { CharacterList, NameInput, SummaryTable } from "@/pages/boss-revenue/character-panel";
import { ShareDialog } from "@/pages/boss-revenue/share-dialog";

const SECTION_TITLE = "text-xs font-medium uppercase tracking-wide text-muted-foreground";

export function BossRevenuePage() {
  const bossPlans = useBossStore((state) => state.bossPlans);
  const [selected, setSelected] = useState(-1);
  const [showComparison, setShowComparison] = useState(false);

  const handleShare = async () => {
    if (!bossPlans.length) {
      toast.warning("캐릭터를 등록해주세요.");
      return;
    }

    const url = convertPlansToParams(bossPlans);

    if (!navigator.clipboard) {
      toast.info("수동 링크 복사", { description: url });
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success("클립보드에 복사됨", { description: url });
    } catch {
      toast.info("수동 링크 복사", { description: url });
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-4">
      <Card className="w-full md:w-auto">
        <CardHeader>
          <div className="flex flex-1 items-center gap-3">
            <CardTitle className={cn(SECTION_TITLE, "shrink-0")}>캐릭터</CardTitle>
            <NameInput setSelected={setSelected} />
          </div>
          <CardAction className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="compare"
                  variant={showComparison ? "secondary" : "ghost"}
                  size="icon"
                  className={cn("size-7", !showComparison && "text-muted-foreground hover:text-foreground")}
                  onClick={() => setShowComparison((prev) => !prev)}
                >
                  <Scale className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>2026년 9월 17일 기준 증감량 표시</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="share"
                  variant="ghost"
                  size="icon"
                  className="size-7 text-muted-foreground hover:text-foreground"
                  onClick={handleShare}
                >
                  <Share2 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>공유</TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-3 md:w-auto md:min-w-80">
          <CharacterList selected={selected} setSelected={setSelected} showComparison={showComparison} />
          <SummaryTable />
        </CardContent>
      </Card>

      {selected >= 0 && (
        <Card className="w-full md:w-auto">
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>보스</CardTitle>
            <CardAction>
              <BossTableActions selected={selected} />
            </CardAction>
          </CardHeader>
          <CardContent className="w-full">
            <BossTable selected={selected} />
          </CardContent>
        </Card>
      )}

      <ShareDialog />
    </div>
  );
}
