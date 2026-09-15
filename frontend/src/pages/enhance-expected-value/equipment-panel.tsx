import { Loader2, Search } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { EQUIPMENT_SLOT_GRID, POTENTIAL_GRADE_INFOS, SET_INFOS, SetType } from "@/constants/enhance";
import { getMaxPotentialGrade } from "@/lib/enhance-service";
import { cn } from "@/lib/utils";
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

export function CharacterPresetButtons({
  preset,
  onChange,
}: {
  preset: 1 | 2 | 3;
  onChange: (preset: 1 | 2 | 3) => void;
}) {
  return (
    <div className="flex gap-1">
      {([1, 2, 3] as const).map((no) => (
        <Tooltip key={no}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant={preset == no ? "default" : "outline"}
              size="icon"
              className="size-7"
              onClick={() => onChange(no)}
            >
              {no}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">프리셋 {no}</TooltipContent>
        </Tooltip>
      ))}
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

function EquipmentSlot({ item, icon }: { item?: ItemEquipmentDetail; icon?: string }) {
  const src = item?.item_icon ?? icon;
  const grade = item ? getMaxPotentialGrade(item) : undefined;

  const box = (
    <div
      className={cn(
        "relative flex size-10 items-center justify-center overflow-hidden border bg-muted",
        !item && "border-dashed border-muted-foreground/20"
      )}
      style={grade ? { borderColor: POTENTIAL_GRADE_INFOS[grade].borderColor } : undefined}
    >
      {src && (
        <img
          src={src}
          alt=""
          className="pointer-events-none absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );

  if (!item) return box;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{box}</TooltipTrigger>
      <TooltipContent side="top">{item.item_name}</TooltipContent>
    </Tooltip>
  );
}

export function EquipmentGrid({
  defaultSet,
  characterImage,
  items,
}: {
  defaultSet?: SetType;
  characterImage?: string;
  items: ItemEquipmentDetail[];
}) {
  const defaultIcon = defaultSet ? SET_INFOS[defaultSet].icon : undefined;

  return (
    <div className="grid gap-1" style={GRID_COLUMNS}>
      {EQUIPMENT_SLOT_GRID.flatMap((row, i) =>
        row.map((cell, j) => {
          if (cell == "character") {
            if (i != 0 || j != 2) return null;
            return <CharacterCell key="character" image={defaultSet ? undefined : characterImage} />;
          }
          if (!cell) return <div key={`${i}-${j}`} />;

          if (defaultSet) {
            return <EquipmentSlot key={`${i}-${j}`} icon={cell.label == "모자" ? defaultIcon : undefined} />;
          }

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
  preset?: SetType;
  onChange: (type: SetType) => void;
}) {
  return (
    <div className="flex flex-wrap justify-end gap-1">
      {Object.entries(SET_INFOS).map(([type, info]) => (
        <Tooltip key={type}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant={preset == type ? "default" : "outline"}
              size="icon"
              className="size-8"
              onClick={() => onChange(type as SetType)}
            >
              <img src={info.icon} alt={info.name} className="size-5 object-contain" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{info.name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
