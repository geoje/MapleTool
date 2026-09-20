import { useEffect, useState } from "react";
import { CollapsibleCard } from "@/components/collapsible-card";
import { SectionTitle } from "@/components/section-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  SET_COMBOS,
  SetType,
  CubeType,
  POTENTIAL_CUBES,
  ADDITIONAL_POTENTIAL_CUBES,
  EquipmentLevelTier,
  DEFAULT_EQUIPMENT_LEVEL_TIER,
} from "@/constants/enhance";
import { SET_ITEMS } from "@/constants/enhance-set-items";
import { DEFAULT_EQUIPMENT_CATEGORY, DEFAULT_STARFORCE_LEVEL } from "@/constants/starforce";
import { useCharacterBasic } from "@/hooks/use-character-basic";
import { useCubeProbability } from "@/hooks/use-cube-probability";
import { useItemEquipment } from "@/hooks/use-item-equipment";
import { usePersistedBoolean } from "@/hooks/use-persisted-boolean";
import { EquipmentGrid, NameInput, PresetTabs } from "@/pages/enhance-cost/equipment-panel";
import { PotentialCommonControls } from "@/pages/enhance-cost/potential-common-controls";
import { AdditionalPotentialControls } from "@/pages/enhance-cost/additional-potential-controls";
import { PotentialTable } from "@/pages/enhance-cost/potential-table";
import { StarforceCard } from "@/pages/enhance-cost/starforce-panel";
import { useEnhanceStore } from "@/stores/enhance-store";

type Selection = { type: "character"; preset: 1 | 2 | 3 } | { type: "set"; comboIndex: number };

const DEFAULT_COMBO_INDEX = SET_COMBOS.findIndex(
  (combo) => combo.includes(SetType.ETERNAL) && combo.includes(SetType.RADIANCE)
);

function getDefaultSelection(characterAvailable: boolean): Selection {
  return characterAvailable ? { type: "character", preset: 1 } : { type: "set", comboIndex: DEFAULT_COMBO_INDEX };
}

export function EnhanceCostPage() {
  const name = useEnhanceStore((state) => state.name);
  const searchToken = useEnhanceStore((state) => state.searchToken);
  const { data: basic, isFetching: isFetchingBasic } = useCharacterBasic(name, searchToken);
  const { data: equipment, isFetching: isFetchingEquipment } = useItemEquipment(name, searchToken);
  const [selection, setSelection] = useState<Selection>(() => getDefaultSelection(!!equipment));
  const [starforceCollapsed, setStarforceCollapsed] = usePersistedBoolean("enhance-cost:starforce-collapsed", false);
  const [starforceLevel, setStarforceLevel] = useState(DEFAULT_STARFORCE_LEVEL);
  const [potentialCollapsed, setPotentialCollapsed] = usePersistedBoolean("enhance-cost:potential-collapsed", false);
  const [additionalPotentialCollapsed, setAdditionalPotentialCollapsed] = usePersistedBoolean(
    "enhance-cost:additional-potential-collapsed",
    false
  );
  const [selectedCube, setSelectedCube] = useState<CubeType>(POTENTIAL_CUBES[0]);
  const [selectedAdditionalCube, setSelectedAdditionalCube] = useState<CubeType | null>(ADDITIONAL_POTENTIAL_CUBES[0]);
  const [potentialCategory, setPotentialCategory] = useState<string>(DEFAULT_EQUIPMENT_CATEGORY);
  const [potentialLevel, setPotentialLevel] = useState<EquipmentLevelTier>(DEFAULT_EQUIPMENT_LEVEL_TIER);
  const [additionalCategory, setAdditionalCategory] = useState<string>(DEFAULT_EQUIPMENT_CATEGORY);
  const [additionalLevel, setAdditionalLevel] = useState<EquipmentLevelTier>(DEFAULT_EQUIPMENT_LEVEL_TIER);
  const [isLinked, setIsLinked] = useState(true);

  const actualAdditionalCategory = isLinked ? potentialCategory : additionalCategory;
  const actualAdditionalLevel = isLinked ? potentialLevel : additionalLevel;

  const handleAdditionalCategoryChange = (val: string) => {
    if (isLinked) {
      setPotentialCategory(val);
    } else {
      setAdditionalCategory(val);
    }
  };

  const handleAdditionalLevelChange = (val: EquipmentLevelTier) => {
    if (isLinked) {
      setPotentialLevel(val);
    } else {
      setAdditionalLevel(val);
    }
  };

  useEffect(() => {
    setSelection(getDefaultSelection(!!equipment));
  }, [equipment]);

  const { data: potentialData, isFetching: isFetchingPotential } = useCubeProbability(
    selectedCube,
    potentialCategory,
    potentialLevel
  );
  const { data: additionalPotentialData, isFetching: isFetchingAdditionalPotential } = useCubeProbability(
    selectedAdditionalCube,
    actualAdditionalCategory,
    actualAdditionalLevel
  );

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
              category={potentialCategory}
              onCategoryChange={setPotentialCategory}
              equipmentLevelTier={potentialLevel}
              onEquipmentLevelTierChange={setPotentialLevel}
              selectedCube={selectedCube}
              onCubeChange={setSelectedCube}
              isLinked={isLinked}
              onToggleLink={() => setIsLinked(!isLinked)}
            />
            <PotentialTable optionData={potentialData} isLoading={isFetchingPotential} />
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
            <AdditionalPotentialControls
              category={actualAdditionalCategory}
              onCategoryChange={handleAdditionalCategoryChange}
              equipmentLevelTier={actualAdditionalLevel}
              onEquipmentLevelTierChange={handleAdditionalLevelChange}
              selectedCube={selectedAdditionalCube}
              onCubeChange={setSelectedAdditionalCube}
              isLinked={isLinked}
              onToggleLink={() => setIsLinked(!isLinked)}
            />
            <PotentialTable optionData={additionalPotentialData} isLoading={isFetchingAdditionalPotential} />
          </CollapsibleCard>
        </div>
      </div>
    </div>
  );
}
