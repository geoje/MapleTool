import { ChevronDown, ChevronUp, Loader2, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import crystalPurple from "@/assets/crystal/purple.png";
import crystalYellow from "@/assets/crystal/yellow.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  BOSS,
  BossType,
  CUBE_ICON,
  DIFFICULTY_COLOR,
  FIRST_HALF_BOSS_TYPES,
  SECOND_HALF_BOSS_TYPES,
} from "@/constants/boss";
import { useCharacterBasic } from "@/hooks/use-character-basic";
import {
  calculateCubes,
  calculateMonthlyRevenue,
  calculatePreviousCubes,
  calculatePreviousMonthlyRevenue,
  calculatePreviousRevenue,
  calculateRevenue,
  countWeeklyBoss,
} from "@/lib/boss-service";
import { formatCountDelta, formatDelta, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useBossStore } from "@/stores/boss-store";
import type { BossPlan, BossPlanItem } from "@/types";

function getRowItems(bossPlan: BossPlan, types: BossType[]) {
  return types
    .map((type) => bossPlan.boss.find((item) => item.type == type))
    .filter((item): item is BossPlanItem => !!item);
}

function BossIcon({ item }: { item: BossPlanItem }) {
  const boss = BOSS[item.type];
  const color = DIFFICULTY_COLOR[item.difficulty];

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden border-2" style={{ borderColor: color?.border }}>
        <img src={boss.icon} alt="" className="block size-6 object-cover" />
      </div>
      <div className="flex items-center gap-0.5">
        <span
          className="rounded-b-[2px] px-1 text-[10px] leading-tight"
          style={{ color: color?.text, backgroundColor: color?.back }}
        >
          {item.difficulty.charAt(0)}
        </span>
        {item.members >= 2 && (
          <span className="rounded-b-[2px] bg-secondary px-0.5 text-[10px] leading-tight text-secondary-foreground">
            {item.members}
          </span>
        )}
      </div>
    </div>
  );
}

function BossRows({ bossPlan }: { bossPlan: BossPlan }) {
  const items = getRowItems(bossPlan, [...FIRST_HALF_BOSS_TYPES, ...SECOND_HALF_BOSS_TYPES]);
  const blackMageItem = bossPlan.boss.find((item) => item.type == BossType.BLACK_MAGE);

  return (
    <div className="flex flex-wrap items-start gap-1.5 sm:flex-nowrap">
      {items.map((item) => (
        <BossIcon key={item.type} item={item} />
      ))}
      {blackMageItem && (
        <div className="flex items-stretch gap-1.5">
          {items.length > 0 && <Separator orientation="vertical" />}
          <BossIcon item={blackMageItem} />
        </div>
      )}
    </div>
  );
}

export function NameInput({ setSelected }: { setSelected: (index: number) => void }) {
  const bossPlans = useBossStore((state) => state.bossPlans);
  const addBossPlan = useBossStore((state) => state.addBossPlan);
  const [name, setName] = useState("");
  const isComposing = useRef(false);

  const handleSubmit = () => {
    if (!name.trim()) return;

    setSelected(bossPlans.length);
    addBossPlan(name);
    setName("");
  };

  return (
    <div className="relative min-w-40 flex-1">
      <Input
        placeholder="캐릭터명을 입력하세요."
        value={name}
        onChange={(event) => setName(event.target.value)}
        onCompositionStart={() => (isComposing.current = true)}
        onCompositionEnd={() => (isComposing.current = false)}
        onKeyDown={(event) => {
          if (event.key != "Enter") return;
          if (isComposing.current || event.nativeEvent.isComposing) return;
          handleSubmit();
        }}
        className="pr-9"
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label="search"
        className="absolute right-0.5 top-0.5 size-7 rounded-full text-muted-foreground hover:bg-transparent hover:text-foreground"
        onClick={handleSubmit}
      >
        <Search className="size-4" />
      </Button>
    </div>
  );
}

function CardIconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className="flex size-6 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}

function CharacterFieldContent({
  bossPlan,
  radio,
  readOnly,
  showComparison,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  bossPlan: BossPlan;
  radio?: React.ReactNode;
  readOnly?: boolean;
  showComparison?: boolean;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const { data, isFetching } = useCharacterBasic(bossPlan.name);
  const [imageFailed, setImageFailed] = useState(false);
  const revenue = calculateRevenue(bossPlan);
  const monthlyRevenue = calculateMonthlyRevenue(bossPlan);
  const weeklyDelta = showComparison ? formatDelta(revenue - calculatePreviousRevenue(bossPlan)) : null;
  const monthlyDelta = showComparison
    ? formatDelta(monthlyRevenue - calculatePreviousMonthlyRevenue(bossPlan))
    : null;

  const cubes = calculateCubes(bossPlan);
  const previousCubes = calculatePreviousCubes(bossPlan);
  const silverDelta = showComparison ? formatCountDelta(cubes.silver - previousCubes.silver) : null;
  const goldDelta = showComparison ? formatCountDelta(cubes.gold - previousCubes.gold) : null;

  return (
    <div className="flex w-full flex-wrap items-start gap-3">
      <div className="flex w-[100px] shrink-0 flex-col items-center gap-1.5">
        <div className="relative size-[100px] overflow-hidden rounded-md bg-muted">
          {data?.character_image && !imageFailed && (
            <img
              src={data.character_image}
              alt=""
              className="pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
              onError={() => setImageFailed(true)}
            />
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Badge className="rounded-full bg-muted text-xs font-medium text-foreground">
            {bossPlan.name}
          </Badge>
          {isFetching && <Loader2 className="size-3 shrink-0 animate-spin text-muted-foreground" />}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-end gap-1">
          {!readOnly && (
            <div className="flex items-center gap-0.5">
              <CardIconButton label="move down" disabled={!onMoveDown} onClick={onMoveDown}>
                <ChevronDown className="size-3.5" />
              </CardIconButton>
              <CardIconButton label="move up" disabled={!onMoveUp} onClick={onMoveUp}>
                <ChevronUp className="size-3.5" />
              </CardIconButton>
              <CardIconButton label="delete" onClick={onDelete}>
                <X className="size-3.5" />
              </CardIconButton>
            </div>
          )}

          {radio}
        </div>

        {bossPlan.boss.length > 0 && <BossRows bossPlan={bossPlan} />}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:items-stretch sm:gap-3 sm:mt-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:flex-col sm:flex-nowrap sm:items-start sm:justify-center sm:gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex w-fit items-center gap-2">
                  <img src={crystalPurple} alt="" className="h-4 w-auto shrink-0" />
                  <span>{formatNumber(revenue)}</span>
                  {weeklyDelta && (
                    <span className={weeklyDelta.startsWith("(+") ? "text-red-500" : "text-blue-500"}>
                      {weeklyDelta}
                    </span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">주간 수익</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex w-fit items-center gap-2">
                  <img src={crystalYellow} alt="" className="h-4 w-auto shrink-0" />
                  <span>{formatNumber(monthlyRevenue)}</span>
                  {monthlyDelta && (
                    <span className={monthlyDelta.startsWith("(+") ? "text-red-500" : "text-blue-500"}>
                      {monthlyDelta}
                    </span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">월간 수익</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-4 sm:h-auto" />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:flex-col sm:flex-nowrap sm:items-start sm:justify-center sm:gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex w-fit items-center gap-2">
                  <img src={CUBE_ICON.silver} alt="" className="h-4 w-auto shrink-0" />
                  <span>{cubes.silver}</span>
                  {silverDelta && (
                    <span className={silverDelta.startsWith("(+") ? "text-red-500" : "text-blue-500"}>
                      {silverDelta}
                    </span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">메멘토 실버 큐브</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex w-fit items-center gap-2">
                  <img src={CUBE_ICON.gold} alt="" className="h-4 w-auto shrink-0" />
                  <span>{cubes.gold}</span>
                  {goldDelta && (
                    <span className={goldDelta.startsWith("(+") ? "text-red-500" : "text-blue-500"}>
                      {goldDelta}
                    </span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">메멘토 골드 큐브</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CharacterButton({ bossPlan }: { bossPlan: BossPlan; index: number }) {
  return (
    <Field className="rounded-lg border p-2.5">
      <CharacterFieldContent bossPlan={bossPlan} readOnly />
    </Field>
  );
}

export function CharacterList({
  selected,
  setSelected,
  showComparison,
}: {
  selected: number;
  setSelected: (index: number) => void;
  showComparison?: boolean;
}) {
  const bossPlans = useBossStore((state) => state.bossPlans);
  const moveBossPlan = useBossStore((state) => state.moveBossPlan);
  const deleteBossPlan = useBossStore((state) => state.deleteBossPlan);

  if (!bossPlans.length) return null;

  return (
    <RadioGroup
      value={selected >= 0 ? String(selected) : ""}
      onValueChange={(value) => setSelected(value ? Number(value) : -1)}
    >
      {bossPlans.map((plan, i) => {
        const id = `character-${i}`;

        return (
          <FieldLabel
            key={"character-" + plan.name}
            htmlFor={id}
            className="has-data-checked:border-primary/30 has-data-checked:bg-muted/50"
          >
            <Field>
              <CharacterFieldContent
                bossPlan={plan}
                showComparison={showComparison}
                radio={
                  <RadioGroupItem
                    value={String(i)}
                    id={id}
                    onClick={(event) => {
                      if (selected == i) {
                        event.preventDefault();
                        setSelected(-1);
                      }
                    }}
                  />
                }
                onDelete={() => {
                  deleteBossPlan(i);
                  if (selected == i) setSelected(-1);
                }}
                onMoveDown={
                  i < bossPlans.length - 1
                    ? () => {
                        moveBossPlan(plan.name, bossPlans[i + 1].name);
                        if (selected == i) setSelected(i + 1);
                        else if (selected == i + 1) setSelected(i);
                      }
                    : undefined
                }
                onMoveUp={
                  i > 0
                    ? () => {
                        moveBossPlan(plan.name, bossPlans[i - 1].name);
                        if (selected == i) setSelected(i - 1);
                        else if (selected == i - 1) setSelected(i);
                      }
                    : undefined
                }
              />
            </Field>
          </FieldLabel>
        );
      })}
    </RadioGroup>
  );
}

function DeltaValue({
  value,
  delta,
  align = "end",
  className,
}: {
  value: React.ReactNode;
  delta?: string | null;
  align?: "end" | "center";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center gap-1",
        align == "end" ? "justify-end" : "justify-center",
        className
      )}
    >
      {value}
      {delta && (
        <span className={delta.startsWith("(+") ? "text-red-500" : "text-blue-500"}>{delta}</span>
      )}
    </span>
  );
}

export function SummaryTable({ showComparison }: { showComparison?: boolean }) {
  const bossPlans = useBossStore((state) => state.bossPlans);
  const [excludedNames, setExcludedNames] = useState<Set<string>>(new Set());

  if (!bossPlans.length) return null;

  const toggleSelected = (name: string) =>
    setExcludedNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const selectedPlans = bossPlans.filter((plan) => !excludedNames.has(plan.name));

  const totalWeekly = selectedPlans.reduce((acc, plan) => acc + calculateRevenue(plan), 0);
  const totalMonthly = selectedPlans.reduce((acc, plan) => acc + calculateMonthlyRevenue(plan), 0);
  const totalCubes = selectedPlans.reduce(
    (acc, plan) => {
      const cubes = calculateCubes(plan);
      return { silver: acc.silver + cubes.silver, gold: acc.gold + cubes.gold };
    },
    { silver: 0, gold: 0 }
  );
  const totalCrystals = selectedPlans.reduce((acc, plan) => acc + countWeeklyBoss(plan), 0);

  const totalPrevWeekly = showComparison
    ? selectedPlans.reduce((acc, plan) => acc + calculatePreviousRevenue(plan), 0)
    : null;
  const totalPrevMonthly = showComparison
    ? selectedPlans.reduce((acc, plan) => acc + calculatePreviousMonthlyRevenue(plan), 0)
    : null;
  const totalPrevCubes = showComparison
    ? selectedPlans.reduce(
        (acc, plan) => {
          const cubes = calculatePreviousCubes(plan);
          return { silver: acc.silver + cubes.silver, gold: acc.gold + cubes.gold };
        },
        { silver: 0, gold: 0 }
      )
    : null;

  const totalWeeklyDelta = totalPrevWeekly != null ? formatDelta(totalWeekly - totalPrevWeekly) : null;
  const totalMonthlyDelta =
    totalPrevMonthly != null ? formatDelta(totalMonthly - totalPrevMonthly) : null;
  const totalSilverDelta =
    totalPrevCubes != null ? formatCountDelta(totalCubes.silver - totalPrevCubes.silver) : null;
  const totalGoldDelta =
    totalPrevCubes != null ? formatCountDelta(totalCubes.gold - totalPrevCubes.gold) : null;

  return (
    <>
      <Separator />

      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-[max-content_1fr_repeat(5,max-content)] items-center gap-x-3 gap-y-1.5 text-xs min-w-max">
          <span />
          <span className="font-medium text-muted-foreground">캐릭터명</span>
          <span className="text-right font-medium text-muted-foreground">주간 결정 개수</span>
          <span className="text-right font-medium text-muted-foreground">주간 수익</span>
          <span className="text-right font-medium text-muted-foreground">월간 수익</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src={CUBE_ICON.silver}
                alt="메멘토 실버 큐브"
                className="h-4 w-auto shrink-0 justify-self-center"
              />
            </TooltipTrigger>
            <TooltipContent>메멘토 실버 큐브</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src={CUBE_ICON.gold}
                alt="메멘토 골드 큐브"
                className="h-4 w-auto shrink-0 justify-self-center"
              />
            </TooltipTrigger>
            <TooltipContent>메멘토 골드 큐브</TooltipContent>
          </Tooltip>

          {bossPlans.map((plan) => {
            const cubes = calculateCubes(plan);
            const revenue = calculateRevenue(plan);
            const monthlyRevenue = calculateMonthlyRevenue(plan);
            const weeklyDelta = showComparison
              ? formatDelta(revenue - calculatePreviousRevenue(plan))
              : null;
            const monthlyDelta = showComparison
              ? formatDelta(monthlyRevenue - calculatePreviousMonthlyRevenue(plan))
              : null;
            const previousCubes = showComparison ? calculatePreviousCubes(plan) : null;
            const silverDelta = previousCubes
              ? formatCountDelta(cubes.silver - previousCubes.silver)
              : null;
            const goldDelta = previousCubes ? formatCountDelta(cubes.gold - previousCubes.gold) : null;
            const isSelected = !excludedNames.has(plan.name);
            const dim = !isSelected ? "opacity-40" : undefined;

            return (
              <div
                key={"summary-" + plan.name}
                className="contents"
                onClick={() => toggleSelected(plan.name)}
              >
                <span onClick={(event) => event.stopPropagation()} className="flex items-center">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleSelected(plan.name)}
                  />
                </span>
                <span className={cn("truncate", dim)}>{plan.name}</span>
                <span className={cn("text-right", dim)}>{countWeeklyBoss(plan)}</span>
                <DeltaValue value={formatNumber(revenue)} delta={weeklyDelta} className={dim} />
                <DeltaValue value={formatNumber(monthlyRevenue)} delta={monthlyDelta} className={dim} />
                <DeltaValue value={cubes.silver} delta={silverDelta} align="center" className={dim} />
                <DeltaValue value={cubes.gold} delta={goldDelta} align="center" className={dim} />
              </div>
            );
          })}

          <div className="col-span-7 border-t" />

          <span />
          <span className="font-medium">총합</span>
          <span className="text-right font-medium">{totalCrystals}</span>
          <span className="font-medium">
            <DeltaValue value={formatNumber(totalWeekly)} delta={totalWeeklyDelta} />
          </span>
          <span className="font-medium">
            <DeltaValue value={formatNumber(totalMonthly)} delta={totalMonthlyDelta} />
          </span>
          <span className="font-medium">
            <DeltaValue value={totalCubes.silver} delta={totalSilverDelta} align="center" />
          </span>
          <span className="font-medium">
            <DeltaValue value={totalCubes.gold} delta={totalGoldDelta} align="center" />
          </span>
        </div>
      </div>
    </>
  );
}
