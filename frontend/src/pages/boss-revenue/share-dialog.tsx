import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { parsePlansFromParams } from "@/lib/boss-service";
import { useBossStore } from "@/stores/boss-store";
import { CharacterButton } from "@/pages/boss-revenue/character-panel";
import { ResultTable } from "@/pages/boss-revenue/result-table";

export function ShareDialog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const setBossPlans = useBossStore((state) => state.setBossPlans);

  const loadedBossPlans = parsePlansFromParams(searchParams);
  if (!loadedBossPlans.length) return null;

  const close = () => setSearchParams(new URLSearchParams());

  return (
    <Dialog open onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>공유된 보스 수익</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[50vh] flex-col gap-2 overflow-y-auto">
          {loadedBossPlans.map((bossPlan, i) => (
            <CharacterButton key={"loaded-" + i} bossPlan={bossPlan} index={i} />
          ))}
        </div>

        <div className="rounded-md border p-2">
          <ResultTable bossPlans={loadedBossPlans} />
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button variant="outline" onClick={close}>
            취소
          </Button>
          <Button
            onClick={() => {
              setBossPlans(loadedBossPlans);
              close();
            }}
          >
            불러오기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
