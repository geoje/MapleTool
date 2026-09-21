import { cn } from "cn";
import { Loader2, Search } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { EQUIPMENT_SLOT_GRID, POTENTIAL_GRADE_INFOS, SET_COMBOS, SET_INFOS } from "@/constants/enhance";
import { getMaxPotentialGrade } from "@/lib/enhance-service";
import { useEnhanceStore } from "@/stores/enhance-store";
import type { ItemEquipmentDetail } from "@/types";

const CELL = 40;
const GRID_COLUMNS = { gridTemplateColumns: `repeat(7, ${CELL}px)` };

export function NameInput({
  isFetching,
  characterPreset,
  characterDisabled,
  onSelectCharacterPreset,
}: {
  isFetching?: boolean;
  characterPreset?: 1 | 2 | 3;
  characterDisabled?: boolean;
  onSelectCharacterPreset: (preset: 1 | 2 | 3) => void;
}) {
  const name = useEnhanceStore((state) => state.name);
  const setName = useEnhanceStore((state) => state.setName);
  const [value, setValue] = useState(name);
  const isComposing = useRef(false);

  const handleSubmit = () => {
    setName(value);
  };

  return (
    <ButtonGroup className="w-full">
      <Input
        variant="outline"
        className="w-0 min-w-0"
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
      />
      <Button
        type="button"
        variant="outline"
        aria-label="search"
        disabled={isFetching}
        className="text-muted-foreground hover:text-foreground"
        onClick={handleSubmit}
      >
        {isFetching ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
      </Button>
      {([1, 2, 3] as const).map((no) => (
        <Tooltip key={`char-${no}`}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant={characterPreset === no ? "default" : "outline"}
              disabled={characterDisabled}
              className="w-7 px-0"
              onClick={() => onSelectCharacterPreset(no)}
            >
              {no}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">프리셋 {no}</TooltipContent>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
}

export function PresetTabs({
  comboIndex,
  onSelectCombo,
}: {
  comboIndex?: number;
  onSelectCombo: (comboIndex: number) => void;
}) {
  return (
    <ButtonGroup>
      {SET_COMBOS.map((combo, index) => (
        <Tooltip key={`set-${index}`}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant={comboIndex === index ? "default" : "outline"}
              size="sm"
              className={cn("gap-0.5 px-1.5", index === SET_COMBOS.length - 1 && "pr-2.5")}
              onClick={() => onSelectCombo(index)}
            >
              {combo.map((type) => (
                <img key={type} src={SET_INFOS[type].icon} alt={SET_INFOS[type].name} className="size-5 object-contain" />
              ))}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{combo.map((type) => SET_INFOS[type].name).join(" + ")}</TooltipContent>
        </Tooltip>
      ))}
    </ButtonGroup>
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

function EquipmentSlot({
  item,
  label,
  onSelectItem,
}: {
  item?: ItemEquipmentDetail;
  label: string;
  onSelectItem?: (item: ItemEquipmentDetail) => void;
}) {
  const grade = item ? getMaxPotentialGrade(item) : undefined;

  const boxClassName = cn(
    "relative flex size-10 items-center justify-center justify-self-center overflow-hidden border bg-muted transition-[background-color,translate] hover:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_8%)] active:translate-y-px active:opacity-80",
    !grade && "rounded-sm"
  );
  const boxStyle = grade ? { borderColor: POTENTIAL_GRADE_INFOS[grade].borderColor } : undefined;

  if (!item) return <div className={boxClassName} style={boxStyle} />;

  const box = (
    <button
      type="button"
      className={boxClassName}
      style={boxStyle}
      onClick={() => onSelectItem?.(item)}
    >
      <img src={item.item_icon} alt="" className="pointer-events-none" />
    </button>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{box}</TooltipTrigger>
      <TooltipContent side="top" className="flex flex-col items-center gap-0.5">
        <span>{item.item_name}</span>
        <span className="text-[10px] text-background/70">
          Lv. {item.item_base_option.base_equipment_level} {label.replace(/\d+$/, "")}
        </span>
      </TooltipContent>
    </Tooltip>
  );
}

export function EquipmentGrid({
  characterImage,
  items,
  onSelectItem,
}: {
  characterImage?: string;
  items: ItemEquipmentDetail[];
  onSelectItem?: (item: ItemEquipmentDetail) => void;
}) {
  return (
    <div className="grid justify-center gap-1" style={GRID_COLUMNS}>
      {EQUIPMENT_SLOT_GRID.flatMap((row, i) =>
        row.map((cell, j) => {
          if (cell == "character") {
            if (i != 0 || j != 2) return null;
            return <CharacterCell key="character" image={characterImage} />;
          }
          if (!cell) return <div key={`${i}-${j}`} />;

          const item = items.find((item) => item.item_equipment_slot == cell.apiSlot);
          return <EquipmentSlot key={`${i}-${j}`} item={item} label={cell.label} onSelectItem={onSelectItem} />;
        })
      )}
    </div>
  );
}
