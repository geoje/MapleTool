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

export function NameInput({ isFetching }: { isFetching?: boolean }) {
  const name = useEnhanceStore((state) => state.name);
  const setName = useEnhanceStore((state) => state.setName);
  const [value, setValue] = useState(name);
  const isComposing = useRef(false);

  const handleSubmit = () => {
    setName(value);
  };

  return (
    <ButtonGroup className="min-w-40 flex-1">
      <Input
        variant="outline"
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
    </ButtonGroup>
  );
}

export function PresetTabs({
  characterPreset,
  comboIndex,
  characterDisabled,
  onSelectCharacterPreset,
  onSelectCombo,
}: {
  characterPreset?: 1 | 2 | 3;
  comboIndex?: number;
  characterDisabled?: boolean;
  onSelectCharacterPreset: (preset: 1 | 2 | 3) => void;
  onSelectCombo: (comboIndex: number) => void;
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2">
      <ButtonGroup>
        {SET_COMBOS.map((combo, index) => (
          <Tooltip key={`set-${index}`}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={comboIndex === index ? "default" : "outline"}
                size="sm"
                className="gap-0.5 px-1.5"
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
      <ButtonGroup>
        {([1, 2, 3] as const).map((no) => (
          <Tooltip key={`char-${no}`}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={characterPreset === no ? "default" : "outline"}
                size="sm"
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
    </div>
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
    "relative flex size-10 items-center justify-center justify-self-center overflow-hidden border bg-muted",
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
