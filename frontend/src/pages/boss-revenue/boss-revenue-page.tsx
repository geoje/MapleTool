import { Scale, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PRICE_CHANGE_DATE } from "@/constants/boss";
import { convertPlansToParams } from "@/lib/boss-service";
import { cn } from "@/lib/utils";
import { useBossStore } from "@/stores/boss-store";
import { BossTable, BossTableActions } from "@/pages/boss-revenue/boss-table";
import { CharacterList, NameInput, SummaryTable } from "@/pages/boss-revenue/character-panel";
import { ShareDialog } from "@/pages/boss-revenue/share-dialog";

const IS_BEFORE_PRICE_CHANGE = Date.now() < PRICE_CHANGE_DATE.getTime();

export function BossRevenuePage() {
  const bossPlans = useBossStore((state) => state.bossPlans);
  const [selected, setSelected] = useState(-1);
  const [showComparison, setShowComparison] = useState(IS_BEFORE_PRICE_CHANGE);

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
        <CardHeader className="flex items-center">
          <div className="flex flex-1 items-center gap-3">
            <SectionTitle step={1} className="shrink-0">
              캐릭터
            </SectionTitle>
            <NameInput setSelected={setSelected} />
          </div>
          <CardAction className="flex items-center gap-2 self-center">
            <ButtonGroup>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    aria-label="compare"
                    variant={showComparison ? "default" : "outline"}
                    size="icon"
                    className={cn("size-7", !showComparison && "text-muted-foreground hover:text-foreground")}
                    onClick={() => setShowComparison((prev) => !prev)}
                  >
                    <Scale className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {PRICE_CHANGE_DATE.getMonth() + 1}월 {PRICE_CHANGE_DATE.getDate()}일 수익 변화 표시
                </TooltipContent>
              </Tooltip>
            </ButtonGroup>
            <ButtonGroup>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    aria-label="share"
                    variant="outline"
                    size="icon"
                    className="size-7 text-muted-foreground hover:text-foreground"
                    onClick={handleShare}
                  >
                    <Share2 className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>공유</TooltipContent>
              </Tooltip>
            </ButtonGroup>
          </CardAction>
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-3 md:w-auto md:min-w-80">
          <CharacterList selected={selected} setSelected={setSelected} showComparison={showComparison} />
        </CardContent>
      </Card>

      <div className="flex w-full flex-col gap-4 md:w-auto">
        {bossPlans.length > 0 && (
          <Card className="w-full md:w-auto">
            <CardHeader>
              <SectionTitle step={3}>통계</SectionTitle>
            </CardHeader>
            <CardContent className="w-full">
              <SummaryTable showComparison={showComparison} />
            </CardContent>
          </Card>
        )}

        {selected >= 0 && (
          <Card className="w-full md:w-auto">
            <CardHeader className="flex items-center">
              <SectionTitle step={2} className="flex-1">
                보스
              </SectionTitle>
              <CardAction className="self-center">
                <BossTableActions selected={selected} />
              </CardAction>
            </CardHeader>
            <CardContent className="w-full">
              <BossTable selected={selected} />
            </CardContent>
          </Card>
        )}
      </div>

      <ShareDialog />
    </div>
  );
}
