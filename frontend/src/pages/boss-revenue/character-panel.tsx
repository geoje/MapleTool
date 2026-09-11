import { Check, ChevronDown, ChevronUp, Copy, Loader2, Pencil, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  MAX_BOSS_SELECTABLE,
  SECOND_HALF_BOSS_TYPES,
} from "@/constants/boss";
import { useCharacterBasic } from "@/hooks/use-character-basic";
import {
  calculateCubes,
  calculateMonthlyCubes,
  calculateMonthlyRevenue,
  calculatePreviousCubes,
  calculatePreviousMonthlyCubes,
  calculatePreviousMonthlyRevenue,
  calculatePreviousRevenue,
  calculateRevenue,
  countWeeklyBoss,
  resolveScheduledBoss,
} from "@/lib/boss-service";
import { formatCountDelta, formatCubeCount, formatDelta, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useBossStore } from "@/stores/boss-store";
import type { BossPlan, BossPlanItem, CharacterSchedule } from "@/types";

function getRowItems(bossPlan: BossPlan, types: BossType[]) {
  return types
    .map((type) => bossPlan.boss.find((item) => item.type == type))
    .filter((item): item is BossPlanItem => !!item);
}

function BossIcon({ item }: { item?: BossPlanItem }) {
  if (!item) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="box-content size-6 border-2 border-dashed border-muted-foreground/20" />
        <div className="flex items-center gap-0.5">
          <span className="invisible rounded-[2px] px-1 text-[10px] leading-tight">-</span>
        </div>
      </div>
    );
  }

  const boss = BOSS[item.type];
  const color = DIFFICULTY_COLOR[item.difficulty];

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative overflow-hidden border-2" style={{ borderColor: color?.border }}>
        <img src={boss.icon} alt="" className="block size-6 object-cover" />
        {item.complete_flag && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute bottom-0 right-0 flex size-2.5 items-center justify-center rounded-full bg-emerald-500">
                <Check className="size-2 text-white" strokeWidth={4} />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">이번주 처치 완료</TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-center gap-0.5">
        <span
          className="rounded-[2px] px-1 text-[10px] leading-tight"
          style={{ color: color?.text, backgroundColor: color?.back }}
        >
          {item.difficulty.charAt(0)}
        </span>
        {item.members >= 2 && (
          <span className="rounded-[2px] bg-secondary px-0.5 text-[10px] leading-tight text-secondary-foreground">
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
  const emptySlotCount = Math.max(0, MAX_BOSS_SELECTABLE - items.length);

  return (
    <div className="flex flex-wrap items-start gap-1.5 sm:flex-nowrap">
      {items.map((item) => (
        <BossIcon key={item.type} item={item} />
      ))}
      {Array.from({ length: emptySlotCount }, (_, i) => (
        <BossIcon key={"empty-" + i} />
      ))}
      <div className="flex items-stretch gap-1.5">
        <Separator orientation="vertical" />
        <BossIcon item={blackMageItem} />
      </div>
    </div>
  );
}

export function NameInput({ setSelected }: { setSelected: (index: number) => void }) {
  const bossPlans = useBossStore((state) => state.bossPlans);
  const addBossPlan = useBossStore((state) => state.addBossPlan);
  const putBossItem = useBossStore((state) => state.putBossItem);
  const [name, setName] = useState("");
  const isComposing = useRef(false);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const index = bossPlans.length;
    setSelected(index);
    addBossPlan(trimmed);
    setName("");

    fetch(`/api/boss/schedule?name=${encodeURIComponent(trimmed)}`)
      .then((response) => (response.ok ? (response.json() as Promise<CharacterSchedule>) : undefined))
      .then((schedule) => {
        if (!schedule) return;

        for (const item of resolveScheduledBoss(schedule.boss_contents)) {
          putBossItem(index, item.type, item.difficulty, item.members, item.complete_flag);
        }
      })
      .catch(() => {});
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

function StatTooltip({
  icon,
  value,
  delta,
  label,
}: {
  icon: string;
  value: React.ReactNode;
  delta?: string | null;
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex w-fit items-center gap-2 font-normal">
          <img src={icon} alt="" className="h-4 w-auto shrink-0" />
          <span>{value}</span>
          {delta && (
            <span className={delta.startsWith("(+") ? "text-red-500" : "text-blue-500"}>{delta}</span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  );
}

function CharacterNameField({
  name,
  readOnly,
  onRename,
  isFetching,
}: {
  name: string;
  readOnly?: boolean;
  onRename?: (name: string) => void;
  isFetching?: boolean;
}) {
  const [value, setValue] = useState(name);
  const [isFocused, setIsFocused] = useState(false);
  const isComposing = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(name);
  }, [name]);

  if (readOnly || !onRename) {
    return (
      <div className="flex items-center gap-1.5">
        <Badge className="rounded-full bg-muted text-xs font-medium text-foreground">{name}</Badge>
        {isFetching && <Loader2 className="size-3 shrink-0 animate-spin text-muted-foreground" />}
      </div>
    );
  }

  const submit = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed != name) onRename(trimmed);
    else setValue(name);
  };

  return (
    <div className="relative w-[100px] shrink-0">
      <Input
        ref={inputRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          submit();
        }}
        onClick={(event) => event.stopPropagation()}
        onCompositionStart={() => (isComposing.current = true)}
        onCompositionEnd={() => (isComposing.current = false)}
        onKeyDown={(event) => {
          if (event.key == "Escape") {
            setValue(name);
            inputRef.current?.blur();
            return;
          }
          if (event.key != "Enter") return;
          if (isComposing.current || event.nativeEvent.isComposing) return;
          inputRef.current?.blur();
        }}
        className="h-6 rounded-full border-transparent bg-muted px-1 py-0 text-center text-xs font-medium"
      />
      <button
        type="button"
        tabIndex={-1}
        disabled={isFetching}
        aria-label={isFocused ? "이름 수정 완료" : "이름 수정"}
        className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground disabled:pointer-events-none"
        onMouseDown={(event) => event.preventDefault()}
        onClick={(event) => {
          event.stopPropagation();
          if (isFocused) inputRef.current?.blur();
          else inputRef.current?.focus();
        }}
      >
        {isFetching ? (
          <Loader2 className="size-3 animate-spin" />
        ) : isFocused ? (
          <Check className="size-3" />
        ) : (
          <Pencil className="size-3" />
        )}
      </button>
    </div>
  );
}

function CharacterFieldContent({
  bossPlan,
  radio,
  readOnly,
  showComparison,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onRename,
}: {
  bossPlan: BossPlan;
  radio?: React.ReactNode;
  readOnly?: boolean;
  showComparison?: boolean;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRename?: (name: string) => void;
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

  const monthlyCubes = calculateMonthlyCubes(bossPlan);
  const previousMonthlyCubes = calculatePreviousMonthlyCubes(bossPlan);
  const monthlySilverDelta = showComparison
    ? formatCountDelta(monthlyCubes.silver - previousMonthlyCubes.silver)
    : null;
  const monthlyGoldDelta = showComparison
    ? formatCountDelta(monthlyCubes.gold - previousMonthlyCubes.gold)
    : null;

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

        <CharacterNameField
          name={bossPlan.name}
          readOnly={readOnly}
          onRename={onRename}
          isFetching={isFetching}
        />
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
              <CardIconButton label="duplicate" onClick={onDuplicate}>
                <Copy className="size-3.5" />
              </CardIconButton>
              <CardIconButton label="delete" onClick={onDelete}>
                <X className="size-3.5" />
              </CardIconButton>
            </div>
          )}

          {radio}
        </div>

        <BossRows bossPlan={bossPlan} />

        <div className="flex flex-wrap items-start gap-4 text-xs mt-0 sm:mt-2">
          <div className="flex flex-col gap-1">
            <StatTooltip
              icon={crystalPurple}
              value={formatNumber(revenue)}
              delta={weeklyDelta}
              label="주간 수익"
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <StatTooltip
                icon={CUBE_ICON.silver}
                value={formatCubeCount(cubes.silver)}
                delta={silverDelta}
                label="메멘토 실버 큐브 (주간)"
              />
              <StatTooltip
                icon={CUBE_ICON.gold}
                value={formatCubeCount(cubes.gold)}
                delta={goldDelta}
                label="메멘토 골드 큐브 (주간)"
              />
            </div>
          </div>

          <Separator orientation="vertical" className="h-auto self-stretch" />

          <div className="flex flex-col gap-1">
            <StatTooltip
              icon={crystalYellow}
              value={formatNumber(monthlyRevenue)}
              delta={monthlyDelta}
              label="월간 수익"
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <StatTooltip
                icon={CUBE_ICON.silver}
                value={formatCubeCount(monthlyCubes.silver)}
                delta={monthlySilverDelta}
                label="메멘토 실버 큐브 (월간)"
              />
              <StatTooltip
                icon={CUBE_ICON.gold}
                value={formatCubeCount(monthlyCubes.gold)}
                delta={monthlyGoldDelta}
                label="메멘토 골드 큐브 (월간)"
              />
            </div>
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
  const duplicateBossPlan = useBossStore((state) => state.duplicateBossPlan);
  const renameBossPlan = useBossStore((state) => state.renameBossPlan);

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
            key={"character-" + i}
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
                onRename={(name) => renameBossPlan(i, name)}
                onDelete={() => {
                  deleteBossPlan(i);
                  if (selected == i) setSelected(-1);
                  else if (selected > i) setSelected(selected - 1);
                }}
                onDuplicate={() => {
                  duplicateBossPlan(i);
                  if (selected > i) setSelected(selected + 1);
                }}
                onMoveDown={
                  i < bossPlans.length - 1
                    ? () => {
                        moveBossPlan(i, i + 1);
                        if (selected == i) setSelected(i + 1);
                        else if (selected == i + 1) setSelected(i);
                      }
                    : undefined
                }
                onMoveUp={
                  i > 0
                    ? () => {
                        moveBossPlan(i, i - 1);
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

function ValueWithDelta({
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
  const [excludedIndices, setExcludedIndices] = useState<Set<number>>(new Set());

  if (!bossPlans.length) return null;

  const toggleSelected = (index: number) =>
    setExcludedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const selectedPlans = bossPlans.filter((_, i) => !excludedIndices.has(i));

  const totalWeekly = selectedPlans.reduce((acc, plan) => acc + calculateRevenue(plan), 0);
  const totalMonthly = selectedPlans.reduce((acc, plan) => acc + calculateMonthlyRevenue(plan), 0);
  const totalCubes = selectedPlans.reduce(
    (acc, plan) => {
      const cubes = calculateCubes(plan);
      return { silver: acc.silver + cubes.silver, gold: acc.gold + cubes.gold };
    },
    { silver: 0, gold: 0 }
  );
  const totalMonthlyCubes = selectedPlans.reduce(
    (acc, plan) => {
      const cubes = calculateMonthlyCubes(plan);
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
  const totalPrevMonthlyCubes = showComparison
    ? selectedPlans.reduce(
        (acc, plan) => {
          const cubes = calculatePreviousMonthlyCubes(plan);
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
  const totalMonthlySilverDelta =
    totalPrevMonthlyCubes != null
      ? formatCountDelta(totalMonthlyCubes.silver - totalPrevMonthlyCubes.silver)
      : null;
  const totalMonthlyGoldDelta =
    totalPrevMonthlyCubes != null
      ? formatCountDelta(totalMonthlyCubes.gold - totalPrevMonthlyCubes.gold)
      : null;

  const dividerRow = bossPlans.length + 2;
  const lastRowEnd = bossPlans.length + 4; // header(1) + one row per plan + divider row + totals row, as a grid line index

  return (
    <>
      <Separator />

      <div className="w-full overflow-x-auto">
        <div className="grid select-none grid-cols-[max-content_1fr_repeat(9,max-content)] items-center gap-x-3 gap-y-1.5 text-xs min-w-max">
          <div
            className="w-px self-stretch bg-border"
            style={{ gridColumn: 3, gridRow: `1 / ${lastRowEnd}` }}
          />
          <div
            className="w-px self-stretch bg-border"
            style={{ gridColumn: 8, gridRow: `1 / ${lastRowEnd}` }}
          />

          <span />
          <span className="font-medium text-muted-foreground">캐릭터명</span>
          <span className="text-right font-medium text-muted-foreground">주간 결정 개수</span>
          <span className="text-right font-medium text-muted-foreground">주간 수익</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src={CUBE_ICON.silver}
                alt="메멘토 실버 큐브 (주간)"
                className="h-4 w-auto shrink-0 justify-self-center"
              />
            </TooltipTrigger>
            <TooltipContent>메멘토 실버 큐브 (주간)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src={CUBE_ICON.gold}
                alt="메멘토 골드 큐브 (주간)"
                className="h-4 w-auto shrink-0 justify-self-center"
              />
            </TooltipTrigger>
            <TooltipContent>메멘토 골드 큐브 (주간)</TooltipContent>
          </Tooltip>
          <span className="text-right font-medium text-muted-foreground">월간 수익</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src={CUBE_ICON.silver}
                alt="메멘토 실버 큐브 (월간)"
                className="h-4 w-auto shrink-0 justify-self-center"
              />
            </TooltipTrigger>
            <TooltipContent>메멘토 실버 큐브 (월간)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src={CUBE_ICON.gold}
                alt="메멘토 골드 큐브 (월간)"
                className="h-4 w-auto shrink-0 justify-self-center"
              />
            </TooltipTrigger>
            <TooltipContent>메멘토 골드 큐브 (월간)</TooltipContent>
          </Tooltip>

          {bossPlans.map((plan, i) => {
            const cubes = calculateCubes(plan);
            const monthlyCubes = calculateMonthlyCubes(plan);
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
            const previousMonthlyCubes = showComparison ? calculatePreviousMonthlyCubes(plan) : null;
            const monthlySilverDelta = previousMonthlyCubes
              ? formatCountDelta(monthlyCubes.silver - previousMonthlyCubes.silver)
              : null;
            const monthlyGoldDelta = previousMonthlyCubes
              ? formatCountDelta(monthlyCubes.gold - previousMonthlyCubes.gold)
              : null;
            const isSelected = !excludedIndices.has(i);
            const dim = !isSelected ? "opacity-40" : undefined;

            return (
              <div
                key={"summary-" + i}
                className="contents"
                onClick={() => toggleSelected(i)}
              >
                <span onClick={(event) => event.stopPropagation()} className="flex items-center">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleSelected(i)}
                  />
                </span>
                <span className={cn("truncate", dim)}>{plan.name}</span>
                <span className={cn("text-right", dim)}>{countWeeklyBoss(plan)}</span>
                <ValueWithDelta value={formatNumber(revenue)} delta={weeklyDelta} className={dim} />
                <ValueWithDelta
                  value={formatCubeCount(cubes.silver)}
                  delta={silverDelta}
                  align="center"
                  className={dim}
                />
                <ValueWithDelta
                  value={formatCubeCount(cubes.gold)}
                  delta={goldDelta}
                  align="center"
                  className={dim}
                />
                <ValueWithDelta
                  value={formatNumber(monthlyRevenue)}
                  delta={monthlyDelta}
                  className={dim}
                />
                <ValueWithDelta
                  value={formatCubeCount(monthlyCubes.silver)}
                  delta={monthlySilverDelta}
                  align="center"
                  className={dim}
                />
                <ValueWithDelta
                  value={formatCubeCount(monthlyCubes.gold)}
                  delta={monthlyGoldDelta}
                  align="center"
                  className={dim}
                />
              </div>
            );
          })}

          <div className="border-t" style={{ gridColumn: "1 / -1", gridRow: dividerRow }} />

          <span />
          <span className="font-medium">총합</span>
          <span className="text-right font-medium">{totalCrystals}</span>
          <ValueWithDelta
            value={formatNumber(totalWeekly)}
            delta={totalWeeklyDelta}
            className="font-medium"
          />
          <ValueWithDelta
            value={formatCubeCount(totalCubes.silver)}
            delta={totalSilverDelta}
            align="center"
            className="font-medium"
          />
          <ValueWithDelta
            value={formatCubeCount(totalCubes.gold)}
            delta={totalGoldDelta}
            align="center"
            className="font-medium"
          />
          <ValueWithDelta
            value={formatNumber(totalMonthly)}
            delta={totalMonthlyDelta}
            className="font-medium"
          />
          <ValueWithDelta
            value={formatCubeCount(totalMonthlyCubes.silver)}
            delta={totalMonthlySilverDelta}
            align="center"
            className="font-medium"
          />
          <ValueWithDelta
            value={formatCubeCount(totalMonthlyCubes.gold)}
            delta={totalMonthlyGoldDelta}
            align="center"
            className="font-medium"
          />
        </div>
      </div>
    </>
  );
}
