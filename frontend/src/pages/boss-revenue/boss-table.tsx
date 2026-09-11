import { ChevronsUpDown, ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { BOSS, BossDifficulty, BossType, DIFFICULTY_COLOR, FIRST_HALF_BOSS_TYPES } from "@/constants/boss";
import { getMaxDifficulty, getMaxMembers } from "@/lib/boss-service";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useBossStore } from "@/stores/boss-store";
import type { BossOrder, BossPlan } from "@/types";
import { formatNumber } from "@/lib/format";

function getNextOrder(order: BossOrder): BossOrder {
  return order == "" ? "price-asc" : order == "price-asc" ? "price-desc" : "";
}

export function BossTableActions({ selected }: { selected: number }) {
  const bossPlans = useBossStore((state) => state.bossPlans);
  const clearBossItems = useBossStore((state) => state.clearBossItems);
  const putBossItem = useBossStore((state) => state.putBossItem);
  const bossPlan = selected >= 0 && selected < bossPlans.length ? bossPlans[selected] : null;

  if (!bossPlan) return null;

  const handleSelectFirstHalfMax = () => {
    for (const type of FIRST_HALF_BOSS_TYPES) {
      const existingItem = bossPlan.boss.find((item) => item.type == type);
      if (type == BossType.LOTUS) {
        if (existingItem?.difficulty == BossDifficulty.EXTREME) continue;
        putBossItem(selected, type, BossDifficulty.HARD, 1);
        continue;
      }

      putBossItem(selected, type, getMaxDifficulty(type), 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="outline" className="h-7" onClick={handleSelectFirstHalfMax}>
        검밑솔
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="reset"
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:text-foreground"
            onClick={() => clearBossItems(selected)}
          >
            <RotateCcw className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>전체 해제</TooltipContent>
      </Tooltip>
    </div>
  );
}

export function BossTable({ selected }: { selected: number }) {
  const bossPlans = useBossStore((state) => state.bossPlans);
  const setBossOrder = useBossStore((state) => state.setBossOrder);
  const bossPlan = selected >= 0 && selected < bossPlans.length ? bossPlans[selected] : null;

  if (!bossPlan) return null;

  return (
    <div className="grid grid-cols-[max-content_1fr_max-content_max-content]">
      <HeadCell>보스</HeadCell>
      <HeadCell>난이도</HeadCell>
      <HeadCell className="text-center">파티원</HeadCell>
      <Button
        size="sm"
        variant="ghost"
        className="h-7 justify-end px-2"
        onClick={() => setBossOrder(selected, getNextOrder(bossPlan.order))}
      >
        가격
        {bossPlan.order == "price-asc" ? (
          <ChevronUp className="size-3.5" />
        ) : bossPlan.order == "price-desc" ? (
          <ChevronDown className="size-3.5" />
        ) : (
          <ChevronsUpDown className="size-3.5" />
        )}
      </Button>

      {bossPlan.order ? (
        <OrderedRows selected={selected} bossPlan={bossPlan} descending={bossPlan.order == "price-desc"} />
      ) : (
        <DefaultRows selected={selected} bossPlan={bossPlan} />
      )}
    </div>
  );
}

function HeadCell({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("px-2 py-1 text-sm font-medium", className)}>{children}</div>;
}

function DefaultRows({ selected, bossPlan }: { selected: number; bossPlan: BossPlan }) {
  const putBossItem = useBossStore((state) => state.putBossItem);
  const removeBossItem = useBossStore((state) => state.removeBossItem);

  return (
    <>
      {Object.entries(BOSS).map(([type, boss], i) => {
        const parsedType = type as BossType;
        const selectedItem = bossPlan.boss.find(({ type: t }) => t == parsedType);

        return (
          <BossRow
            key={"boss-" + i}
            icon={boss.icon}
            label={boss.abbreviate}
            difficulties={Object.keys(boss.prices) as BossDifficulty[]}
            selectedDifficulty={selectedItem?.difficulty}
            maxMembers={getMaxMembers(parsedType, selectedItem?.difficulty)}
            members={selectedItem?.members ?? 1}
            price={selectedItem ? boss.prices[selectedItem.difficulty] : undefined}
            onDifficultyChange={(difficulty) =>
              difficulty
                ? putBossItem(selected, parsedType, difficulty)
                : removeBossItem(selected, parsedType)
            }
            onMembersChange={(members) => putBossItem(selected, parsedType, undefined, members)}
          />
        );
      })}
    </>
  );
}

function OrderedRows({
  selected,
  bossPlan,
  descending,
}: {
  selected: number;
  bossPlan: BossPlan;
  descending: boolean;
}) {
  const putBossItem = useBossStore((state) => state.putBossItem);
  const removeBossItem = useBossStore((state) => state.removeBossItem);

  const bossInfos = Object.entries(BOSS)
    .flatMap(([type, boss]) =>
      Object.entries(boss.prices).map(([difficulty, price]) => ({
        type: type as BossType,
        icon: boss.icon,
        abbreviate: boss.abbreviate,
        difficulty: difficulty as BossDifficulty,
        price,
      }))
    )
    .sort((a, b) => (descending ? b.price - a.price : a.price - b.price));

  return (
    <>
      {bossInfos.map(({ type, icon, abbreviate, difficulty, price }, i) => {
        const selectedItem = bossPlan.boss.find(({ type: t }) => t == type);
        const isSelectedDifficulty = selectedItem?.difficulty == difficulty;

        return (
          <BossRow
            key={"boss-" + i}
            icon={icon}
            label={abbreviate}
            difficulties={[difficulty]}
            selectedDifficulty={selectedItem?.difficulty}
            maxMembers={getMaxMembers(type, selectedItem?.difficulty)}
            members={isSelectedDifficulty ? selectedItem.members : 1}
            price={price}
            onDifficultyChange={(newDifficulty) =>
              newDifficulty
                ? putBossItem(selected, type, newDifficulty, 1)
                : removeBossItem(selected, type)
            }
            onMembersChange={(members) => putBossItem(selected, type, undefined, members)}
          />
        );
      })}
    </>
  );
}

function BossRow({
  icon,
  label,
  difficulties,
  selectedDifficulty,
  maxMembers,
  members,
  price,
  onDifficultyChange,
  onMembersChange,
}: {
  icon: string;
  label: string;
  difficulties: BossDifficulty[];
  selectedDifficulty?: BossDifficulty;
  maxMembers: number;
  members: number;
  price?: number;
  onDifficultyChange: (difficulty?: BossDifficulty) => void;
  onMembersChange: (members: number) => void;
}) {
  return (
    <>
      <div className="flex items-center gap-2 border-t py-1 pr-4">
        <img src={icon} alt="" className="size-6 object-cover" />
        <span className="hidden text-sm sm:inline">{label}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t py-1 pr-4 md:flex-nowrap">
        {difficulties.map((difficulty, i) => {
          const color = DIFFICULTY_COLOR[difficulty];
          return (
            <label key={`difficulty-${i}`} className="flex items-center gap-1.5">
              <Checkbox
                checked={selectedDifficulty == difficulty}
                onCheckedChange={(checked) => onDifficultyChange(checked ? difficulty : undefined)}
              />
              <Badge
                className="px-1.5 text-[10px] leading-none"
                style={{
                  color: color?.text,
                  backgroundColor: color?.back,
                  borderColor: color?.border,
                }}
              >
                {difficulty}
              </Badge>
            </label>
          );
        })}
      </div>

      <div className="flex items-center justify-center border-t py-1">
        <Select value={String(members)} onValueChange={(value) => onMembersChange(Number(value))}>
          <SelectTrigger size="sm" className="h-7 w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: maxMembers }, (_, i) => i + 1).map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-end border-t py-1 pl-4 text-xs">
        {price && formatNumber(price / members)}
      </div>
    </>
  );
}
