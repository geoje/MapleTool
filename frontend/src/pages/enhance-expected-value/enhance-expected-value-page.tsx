import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "@/components/section-title";
import { Alert, AlertAction, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SET_COMBOS } from "@/constants/enhance";
import { SET_ITEMS } from "@/constants/enhance-set-items";
import { useCharacterBasic } from "@/hooks/use-character-basic";
import { useItemEquipment } from "@/hooks/use-item-equipment";
import {
  CharacterPresetButtons,
  EquipmentGrid,
  NameInput,
  PresetButtons,
} from "@/pages/enhance-expected-value/equipment-panel";
import { useEnhanceStore } from "@/stores/enhance-store";

type Selection = { type: "character"; preset: 1 | 2 | 3 } | { type: "set"; comboIndex: number };

export function EnhanceExpectedValuePage() {
  const name = useEnhanceStore((state) => state.name);
  const { data: basic, isFetching: isFetchingBasic } = useCharacterBasic(name);
  const { data: equipment, isFetching: isFetchingEquipment } = useItemEquipment(name);
  const [selection, setSelection] = useState<Selection>({ type: "character", preset: 1 });
  const [showNotice, setShowNotice] = useState(true);

  const characterItems =
    selection.type != "character"
      ? undefined
      : selection.preset == 3
        ? equipment?.item_equipment_preset_3
        : selection.preset == 2
          ? equipment?.item_equipment_preset_2
          : equipment?.item_equipment_preset_1;

  const items =
    selection.type == "set"
      ? SET_COMBOS[selection.comboIndex].flatMap((set) => SET_ITEMS[set])
      : (characterItems ?? []);

  return (
    <div className="flex flex-col gap-4">
      {showNotice && (
        <Alert variant="warning">
          <AlertTriangle />
          <AlertDescription>이 페이지는 현재 개발중입니다.</AlertDescription>
          <AlertAction>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="닫기"
              className="size-6 text-current hover:bg-transparent hover:opacity-70"
              onClick={() => setShowNotice(false)}
            >
              <X className="size-4" />
            </Button>
          </AlertAction>
        </Alert>
      )}

      <div className="flex flex-wrap items-start gap-4">
        <Card className="w-full md:w-auto">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <SectionTitle step={1}>장비</SectionTitle>
              <PresetButtons
                preset={selection.type == "set" ? selection.comboIndex : undefined}
                onChange={(comboIndex) => setSelection({ type: "set", comboIndex })}
              />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <NameInput isFetching={isFetchingBasic || isFetchingEquipment} />
              <CharacterPresetButtons
                preset={selection.type == "character" ? selection.preset : undefined}
                onChange={(preset) => setSelection({ type: "character", preset })}
              />
            </div>

            <EquipmentGrid
              characterImage={selection.type == "character" ? basic?.character_image : undefined}
              items={items}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
