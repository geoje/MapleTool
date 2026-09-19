import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CollapsibleCard } from "@/components/collapsible-card";
import { SectionTitle } from "@/components/section-title";
import { Alert, AlertAction, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DEFAULT_EQUIPMENT_LEVEL_TIER, EquipmentLevelTier, SET_COMBOS, SetType } from "@/constants/enhance";
import { SET_ITEMS } from "@/constants/enhance-set-items";
import { DEFAULT_EQUIPMENT_CATEGORY, DEFAULT_STARFORCE_LEVEL } from "@/constants/starforce";
import { useCharacterBasic } from "@/hooks/use-character-basic";
import { useItemEquipment } from "@/hooks/use-item-equipment";
import { EquipmentGrid, NameInput, PresetTabs } from "@/pages/enhance-expected-value/equipment-panel";
import { PotentialCommonControls } from "@/pages/enhance-expected-value/potential-common-controls";
import { StarforceCard } from "@/pages/enhance-expected-value/starforce-panel";
import { useEnhanceStore } from "@/stores/enhance-store";

type Selection = { type: "character"; preset: 1 | 2 | 3 } | { type: "set"; comboIndex: number };

const DEFAULT_COMBO_INDEX = SET_COMBOS.findIndex(
  (combo) => combo.includes(SetType.ETERNAL) && combo.includes(SetType.RADIANCE)
);

function getDefaultSelection(characterAvailable: boolean): Selection {
  return characterAvailable ? { type: "character", preset: 1 } : { type: "set", comboIndex: DEFAULT_COMBO_INDEX };
}

export function EnhanceExpectedValuePage() {
  const name = useEnhanceStore((state) => state.name);
  const searchToken = useEnhanceStore((state) => state.searchToken);
  const { data: basic, isFetching: isFetchingBasic } = useCharacterBasic(name, searchToken);
  const { data: equipment, isFetching: isFetchingEquipment } = useItemEquipment(name, searchToken);
  const [selection, setSelection] = useState<Selection>(() => getDefaultSelection(!!equipment));
  const [showNotice, setShowNotice] = useState(true);
  const [starforceCollapsed, setStarforceCollapsed] = useState(false);
  const [starforceLevel, setStarforceLevel] = useState(DEFAULT_STARFORCE_LEVEL);
  const [equipmentCategory, setEquipmentCategory] = useState<string>(DEFAULT_EQUIPMENT_CATEGORY);
  const [equipmentLevelTier, setEquipmentLevelTier] = useState<EquipmentLevelTier>(DEFAULT_EQUIPMENT_LEVEL_TIER);
  const [potentialCollapsed, setPotentialCollapsed] = useState(false);
  const [additionalPotentialCollapsed, setAdditionalPotentialCollapsed] = useState(false);
  const [miracleTime, setMiracleTime] = useState(false);

  useEffect(() => {
    setSelection(getDefaultSelection(!!equipment));
  }, [equipment]);

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
        <div className="flex w-full flex-col gap-4 md:w-auto">
          <Card className="w-full md:w-auto">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <SectionTitle step={1}>장비</SectionTitle>
                <NameInput isFetching={isFetchingBasic || isFetchingEquipment} />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <PresetTabs
                characterPreset={selection.type == "character" ? selection.preset : undefined}
                comboIndex={selection.type == "set" ? selection.comboIndex : undefined}
                characterDisabled={!equipment}
                onSelectCharacterPreset={(preset) => setSelection({ type: "character", preset })}
                onSelectCombo={(comboIndex) => setSelection({ type: "set", comboIndex })}
              />

              <EquipmentGrid
                characterImage={selection.type == "character" ? basic?.character_image : undefined}
                items={items}
                onSelectLevel={setStarforceLevel}
              />
            </CardContent>
          </Card>
        </div>

        <StarforceCard
          collapsed={starforceCollapsed}
          level={starforceLevel}
          onLevelChange={setStarforceLevel}
          onCollapse={() => setStarforceCollapsed(true)}
          onExpand={() => setStarforceCollapsed(false)}
        />

        <div className="flex w-full flex-col gap-4 md:w-auto">
          <CollapsibleCard
            step={3}
            title="잠재능력"
            collapsed={potentialCollapsed}
            onCollapse={() => setPotentialCollapsed(true)}
            onExpand={() => setPotentialCollapsed(false)}
            collapseVariant={additionalPotentialCollapsed ? "left" : "top"}
            contentClassName="min-h-48"
          >
            <PotentialCommonControls
              category={equipmentCategory}
              onCategoryChange={setEquipmentCategory}
              equipmentLevelTier={equipmentLevelTier}
              onEquipmentLevelTierChange={setEquipmentLevelTier}
              miracleTime={miracleTime}
              onToggleMiracleTime={() => setMiracleTime((prev) => !prev)}
            />
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-muted-foreground/40">준비 중입니다.</p>
            </div>
          </CollapsibleCard>

          <CollapsibleCard
            step={4}
            title="에디잠재"
            collapsed={additionalPotentialCollapsed}
            onCollapse={() => setAdditionalPotentialCollapsed(true)}
            onExpand={() => setAdditionalPotentialCollapsed(false)}
            collapseVariant={potentialCollapsed ? "left" : "top"}
            contentClassName="min-h-48"
          >
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-muted-foreground/40">준비 중입니다.</p>
            </div>
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
}
