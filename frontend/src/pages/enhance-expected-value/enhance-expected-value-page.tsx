import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { Alert, AlertAction, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SetType } from "@/constants/enhance";
import { useCharacterBasic } from "@/hooks/use-character-basic";
import { useItemEquipment } from "@/hooks/use-item-equipment";
import {
  CharacterPresetButtons,
  EquipmentGrid,
  NameInput,
  PresetButtons,
} from "@/pages/enhance-expected-value/equipment-panel";
import { useEnhanceStore } from "@/stores/enhance-store";

const SECTION_TITLE = "text-xs font-medium uppercase tracking-wide text-muted-foreground";

export function EnhanceExpectedValuePage() {
  const name = useEnhanceStore((state) => state.name);
  const { data: basic, isFetching: isFetchingBasic } = useCharacterBasic(name);
  const { data: equipment, isFetching: isFetchingEquipment } = useItemEquipment(name);
  const [characterPreset, setCharacterPreset] = useState<1 | 2 | 3>(1);
  const [defaultSet, setDefaultSet] = useState<SetType>();
  const [showNotice, setShowNotice] = useState(true);

  const items =
    characterPreset == 3
      ? equipment?.item_equipment_preset_3
      : characterPreset == 2
        ? equipment?.item_equipment_preset_2
        : equipment?.item_equipment_preset_1;

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
            <CardTitle className={SECTION_TITLE}>① 장비</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <NameInput isFetching={isFetchingBasic || isFetchingEquipment} />
              <CharacterPresetButtons preset={characterPreset} onChange={setCharacterPreset} />
            </div>

            <PresetButtons preset={defaultSet} onChange={setDefaultSet} />

            <EquipmentGrid
              defaultSet={defaultSet}
              characterImage={basic?.character_image}
              items={items ?? []}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
