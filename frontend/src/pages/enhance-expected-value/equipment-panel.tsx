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
  const value = characterPreset != null ? `char-${characterPreset}` : comboIndex != null ? `set-${comboIndex}` : "";

  const handleChange = (next: string) => {
    if (next.startsWith("char-")) {
      onSelectCharacterPreset(Number(next.slice(5)) as 1 | 2 | 3);
    } else {
      onSelectCombo(Number(next.slice(4)));
    }
  };

  return (
    <Tabs value={value} onValueChange={handleChange}>
      <TabsList className="w-full flex-wrap justify-between">
        <div className="flex flex-wrap items-center gap-0.5">
          {SET_COMBOS.map((combo, index) => (
            <Tooltip key={`set-${index}`}>
              <TooltipTrigger asChild>
                <TabsTrigger value={`set-${index}`} className="flex-none gap-0.5 px-1.5">
                  {combo.map((type) => (
                    <img key={type} src={SET_INFOS[type].icon} alt={SET_INFOS[type].name} className="size-5 object-contain" />
                  ))}
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">{combo.map((type) => SET_INFOS[type].name).join(" + ")}</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          {([1, 2, 3] as const).map((no) => (
            <Tooltip key={`char-${no}`}>
              <TooltipTrigger asChild>
                <TabsTrigger value={`char-${no}`} disabled={characterDisabled} className="w-7 flex-none px-0">
                  {no}
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">프리셋 {no}</TooltipContent>
            </Tooltip>
          ))}
        </div>
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

function EquipmentSlot({ item, label }: { item?: ItemEquipmentDetail; label: string }) {
  const grade = item ? getMaxPotentialGrade(item) : undefined;

  const box = (
    <div
      className="relative flex size-10 items-center justify-center justify-self-center overflow-hidden border bg-muted"
      style={grade ? { borderColor: POTENTIAL_GRADE_INFOS[grade].borderColor } : undefined}
    >
      {item && <img src={item.item_icon} alt="" className="pointer-events-none" />}
    </div>
  );

  if (!item) return box;

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
}: {
  characterImage?: string;
  items: ItemEquipmentDetail[];
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
          return <EquipmentSlot key={`${i}-${j}`} item={item} label={cell.label} />;
        })
      )}
    </div>
  );
}
