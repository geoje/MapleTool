import { Loader2, Search } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { EQUIPMENT_SLOT_GRID, POTENTIAL_GRADE_INFOS, SET_COMBOS, SET_INFOS } from "@/constants/enhance";
import { getMaxPotentialGrade } from "@/lib/enhance-service";
import { useEnhanceStore } from "@/stores/enhance-store";
import type { ItemEquipmentDetail } from "@/types";

const CELL = 40;
const GRID_COLUMNS = { gridTemplateColumns: `repeat(7, minmax(${CELL}px, 1fr))` };

export function NameInput({ isFetching }: { isFetching?: boolean }) {
  const name = useEnhanceStore((state) => state.name);
  const setName = useEnhanceStore((state) => state.setName);
  const [value, setValue] = useState(name);
  const isComposing = useRef(false);

  const handleSubmit = () => {
    setName(value);
  };

  return (
    <div className="relative min-w-40 flex-1">
      <Input
        placeholder="캐릭터명을 입력하세요."
        enterKeyHint="go"
        value={value}
        onChange={(event) => setValue(event.target.value)}
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
        disabled={isFetching}
        className="absolute top-0.5 right-0.5 size-7 rounded-full text-muted-foreground hover:bg-transparent hover:text-foreground"
        onClick={handleSubmit}
      >
        {isFetching ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
      </Button>
    </div>
  );
}

export function CharacterPresetButtons({
  preset,
  onChange,
}: {
  preset?: 1 | 2 | 3;
  onChange: (preset: 1 | 2 | 3) => void;
}) {
  return (
    <Tabs value={preset != null ? String(preset) : undefined} onValueChange={(value) => onChange(Number(value) as 1 | 2 | 3)}>
      <TabsList>
        {([1, 2, 3] as const).map((no) => (
          <Tooltip key={no}>
            <TooltipTrigger asChild>
              <span className="contents">
                <TabsTrigger value={String(no)} className="w-7 flex-none px-0">
                  {no}
                </TabsTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">프리셋 {no}</TooltipContent>
          </Tooltip>
        ))}
      </TabsList>
    </Tabs>
  );
}

function CharacterCell({ image }: { image?: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-sm bg-muted"
      style={{ gridColumn: "3 / 6", gridRow: "1 / 5" }}
    >
      {image && !imageFailed && (
        <img
          src={image}
          alt=""
          className="pointer-events-none absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}

function EquipmentSlot({ item }: { item?: ItemEquipmentDetail }) {
  const grade = item ? getMaxPotentialGrade(item) : undefined;

  const box = (
    <div
      className="relative flex size-10 items-center justify-center justify-self-center overflow-hidden border bg-muted"
      style={grade ? { borderColor: POTENTIAL_GRADE_INFOS[grade].borderColor } : undefined}
    >
      {item && (
        <img
          src={item.item_icon}
          alt=""
          className="pointer-events-none absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );

  if (!item) return box;

  return (
    <Tooltip disableHoverableContent delayDuration={150}>
      <TooltipTrigger asChild>{box}</TooltipTrigger>
      <TooltipContent side="top" className="flex flex-col items-center gap-0.5">
        <span>{item.item_name}</span>
        <span className="text-[10px] text-background/70">Lv. {item.item_base_option.base_equipment_level}</span>
      </TooltipContent>
    </Tooltip>
  );
}

export function EquipmentGrid({
  characterImage,
  items,
}: {
  characterImage?: string;
  items: ItemEquipmentDetail[];
}) {
  return (
    <div className="grid gap-1" style={GRID_COLUMNS}>
      {EQUIPMENT_SLOT_GRID.flatMap((row, i) =>
        row.map((cell, j) => {
          if (cell == "character") {
            if (i != 0 || j != 2) return null;
            return <CharacterCell key="character" image={characterImage} />;
          }
          if (!cell) return <div key={`${i}-${j}`} />;

          const item = items.find((item) => item.item_equipment_slot == cell.apiSlot);
          return <EquipmentSlot key={`${i}-${j}`} item={item} />;
        })
      )}
    </div>
  );
}

export function PresetButtons({
  preset,
  onChange,
}: {
  preset?: number;
  onChange: (comboIndex: number) => void;
}) {
  return (
    <Tabs value={preset != null ? String(preset) : undefined} onValueChange={(value) => onChange(Number(value))}>
      <TabsList className="flex-wrap">
        {SET_COMBOS.map((combo, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <span className="contents">
                <TabsTrigger value={String(index)} className="flex-none gap-0.5 px-1.5">
                  {combo.map((type) => (
                    <img key={type} src={SET_INFOS[type].icon} alt={SET_INFOS[type].name} className="size-5 object-contain" />
                  ))}
                </TabsTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">{combo.map((type) => SET_INFOS[type].name).join(" + ")}</TooltipContent>
          </Tooltip>
        ))}
      </TabsList>
    </Tabs>
  );
}
