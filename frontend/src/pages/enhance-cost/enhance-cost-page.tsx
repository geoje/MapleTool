import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CollapsedCardBar, CollapsibleCard } from "@/components/collapsible-card";
import { Alert, AlertAction, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SET_COMBOS,
  SetType,
  CubeType,
  CUBE_PROBABILITY_SOURCE,
  EquipmentLevelTier,
  DEFAULT_EQUIPMENT_LEVEL_TIER,
  ASCENDANT_PULSE_RING_ITEM_NAME,
} from "@/constants/enhance";
import { SET_ITEMS } from "@/constants/enhance-set-items";
import { ASCENDANT_RING_PRICE, DEFAULT_EQUIPMENT_CATEGORY, DEFAULT_STARFORCE_LEVEL } from "@/constants/starforce";
import { useCharacterBasic } from "@/hooks/use-character-basic";
import { useCubeProbability } from "@/hooks/use-cube-probability";
import { useItemEquipment } from "@/hooks/use-item-equipment";
import { usePersistedBoolean } from "@/hooks/use-persisted-boolean";
import { fetchItemPrice, type ItemPriceInfo } from "@/lib/price-service";
import { EquipmentGrid, NameInput, PresetTabs } from "@/pages/enhance-cost/equipment-panel";
import { PotentialCommonControls } from "@/pages/enhance-cost/potential-common-controls";
import { AdditionalPotentialControls } from "@/pages/enhance-cost/additional-potential-controls";
import { PotentialTable } from "@/pages/enhance-cost/potential-table";
import { StarforceCard } from "@/pages/enhance-cost/starforce-panel";
import { useEnhanceStore } from "@/stores/enhance-store";
import type { ItemEquipmentDetail } from "@/types";

type Selection = { type: "character"; preset: 1 | 2 | 3 } | { type: "set"; comboIndex: number };

const DEFAULT_COMBO_INDEX = SET_COMBOS.findIndex(
  (combo) => combo.includes(SetType.ETERNAL) && combo.includes(SetType.RADIANCE)
);

// The 모자 item from the default combo above - matches DEFAULT_EQUIPMENT_CATEGORY
// and DEFAULT_EQUIPMENT_LEVEL_TIER/DEFAULT_STARFORCE_LEVEL (모자, 250).
const DEFAULT_EQUIPPED_ITEM_NAME = "에테르넬 나이트헬름";

function getDefaultSelection(characterAvailable: boolean): Selection {
  return characterAvailable ? { type: "character", preset: 1 } : { type: "set", comboIndex: DEFAULT_COMBO_INDEX };
}

export function EnhanceCostPage() {
  const name = useEnhanceStore((state) => state.name);
  const searchToken = useEnhanceStore((state) => state.searchToken);
  const { data: basic, isFetching: isFetchingBasic } = useCharacterBasic(name, searchToken);
  const { data: equipment, isFetching: isFetchingEquipment } = useItemEquipment(name, searchToken);
  const [selection, setSelection] = useState<Selection>(() => getDefaultSelection(!!equipment));
  const [equipmentCollapsed, setEquipmentCollapsed] = usePersistedBoolean("enhance-cost:equipment-collapsed", false);
  const [starforceCollapsed, setStarforceCollapsed] = usePersistedBoolean("enhance-cost:starforce-collapsed", false);
  const [starforceLevel, setStarforceLevel] = useState(DEFAULT_STARFORCE_LEVEL);
  const [spareValue, setSpareValue] = useState(0);
  const [spareValuePriceInfo, setSpareValuePriceInfo] = useState<ItemPriceInfo | null>(null);
  const [isFetchingSpareValuePrice, setIsFetchingSpareValuePrice] = useState(false);
  const [potentialCollapsed, setPotentialCollapsed] = usePersistedBoolean("enhance-cost:potential-collapsed", false);
  const [additionalPotentialCollapsed, setAdditionalPotentialCollapsed] = usePersistedBoolean(
    "enhance-cost:additional-potential-collapsed",
    false
  );
  const [selectedCube, setSelectedCube] = useState<CubeType>(CubeType.RESET);
  const [selectedAdditionalCube, setSelectedAdditionalCube] = useState<CubeType | null>(CubeType.ADDI_RESET);
  const [potentialCategory, setPotentialCategory] = useState<string>(DEFAULT_EQUIPMENT_CATEGORY);
  const [potentialLevel, setPotentialLevel] = useState<EquipmentLevelTier>(DEFAULT_EQUIPMENT_LEVEL_TIER);
  const [additionalCategory, setAdditionalCategory] = useState<string>(DEFAULT_EQUIPMENT_CATEGORY);
  const [additionalLevel, setAdditionalLevel] = useState<EquipmentLevelTier>(DEFAULT_EQUIPMENT_LEVEL_TIER);
  const [isLinked, setIsLinked] = useState(true);
  const [showNotice, setShowNotice] = useState(true);

  // While linked, editing either side writes through to both so they never
  // drift apart. Unlinking freezes both at their current (equal) values;
  // re-linking then adopts whichever side's button triggered the re-link.
  const handlePotentialCategoryChange = (val: string) => {
    setPotentialCategory(val);
    if (isLinked) setAdditionalCategory(val);
  };

  const handlePotentialLevelChange = (val: EquipmentLevelTier) => {
    setPotentialLevel(val);
    if (isLinked) setAdditionalLevel(val);
  };

  const handleAdditionalCategoryChange = (val: string) => {
    setAdditionalCategory(val);
    if (isLinked) setPotentialCategory(val);
  };

  const handleAdditionalLevelChange = (val: EquipmentLevelTier) => {
    setAdditionalLevel(val);
    if (isLinked) setPotentialLevel(val);
  };

  const togglePotentialLink = () => {
    const next = !isLinked;
    if (next) {
      setAdditionalCategory(potentialCategory);
      setAdditionalLevel(potentialLevel);
    }
    setIsLinked(next);
  };

  const toggleAdditionalLink = () => {
    const next = !isLinked;
    if (next) {
      setPotentialCategory(additionalCategory);
      setPotentialLevel(additionalLevel);
    }
    setIsLinked(next);
  };

  useEffect(() => {
    setSelection(getDefaultSelection(!!equipment));
  }, [equipment]);

  // Manually editing 노작 가격 detaches it from whatever item's price was last
  // applied, so the badge no longer claims to reflect that item's market price.
  const handleSpareValueChange = (nextValue: number) => {
    setSpareValue(nextValue);
    setSpareValuePriceInfo(null);
  };

  const applyItemPrice = (itemName: string) => {
    // 어센던트 펄스 링 has no market price (untradable), so skip the backend lookup entirely
    // and hardcode its badge/price instead.
    if (itemName === ASCENDANT_PULSE_RING_ITEM_NAME) {
      setSpareValue(ASCENDANT_RING_PRICE);
      setSpareValuePriceInfo({ itemName, price: ASCENDANT_RING_PRICE, date: "" });
      setIsFetchingSpareValuePrice(false);
      return;
    }

    setSpareValue(0);
    setSpareValuePriceInfo(null);
    setIsFetchingSpareValuePrice(true);
    fetchItemPrice(itemName)
      .then((priceInfo) => {
        if (!priceInfo) return;
        setSpareValue(priceInfo.price);
        setSpareValuePriceInfo(priceInfo);
      })
      .finally(() => setIsFetchingSpareValuePrice(false));
  };

  // Clicking an equipped item both jumps the starforce level to that item's
  // level and, if the item has a known market price, fills in 노작 가격.
  const handleSelectItem = (item: ItemEquipmentDetail) => {
    setStarforceLevel(item.item_base_option.base_equipment_level);
    applyItemPrice(item.item_name);
  };

  // The page defaults to 에테르넬 나이트헬름 (모자, 250 레벨) as if it were
  // already clicked, so 노작 가격 is preloaded without requiring a click.
  useEffect(() => {
    applyItemPrice(DEFAULT_EQUIPPED_ITEM_NAME);
  }, []);

  // While the ring is selected, 잠재능력/에디잠재 offer one extra cube option costed in 펄스
  // 인핸서 instead of meso (see PotentialTable's isPulseCubeType) - auto-selected the moment the
  // ring is picked, and reverted back to the plain reset cube once a different item is chosen.
  const isAscendantSelected = spareValuePriceInfo?.itemName === ASCENDANT_PULSE_RING_ITEM_NAME;

  useEffect(() => {
    if (isAscendantSelected) {
      setSelectedCube(CubeType.PULSE_RESET);
      setSelectedAdditionalCube(CubeType.PULSE_ADDI_RESET);
    } else {
      setSelectedCube((prev) => (prev === CubeType.PULSE_RESET ? CubeType.RESET : prev));
      setSelectedAdditionalCube((prev) => (prev === CubeType.PULSE_ADDI_RESET ? CubeType.ADDI_RESET : prev));
    }
  }, [isAscendantSelected]);

  const { data: potentialData, isFetching: isFetchingPotential } = useCubeProbability(
    CUBE_PROBABILITY_SOURCE[selectedCube] ?? selectedCube,
    potentialCategory,
    potentialLevel
  );
  const { data: additionalPotentialData, isFetching: isFetchingAdditionalPotential } = useCubeProbability(
    selectedAdditionalCube && (CUBE_PROBABILITY_SOURCE[selectedAdditionalCube] ?? selectedAdditionalCube),
    additionalCategory,
    additionalLevel
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

  const collapsedCards = [
    { step: 1, title: "장비", collapsed: equipmentCollapsed, onExpand: () => setEquipmentCollapsed(false) },
    { step: 2, title: "스타포스", collapsed: starforceCollapsed, onExpand: () => setStarforceCollapsed(false) },
    { step: 3, title: "잠재능력", collapsed: potentialCollapsed, onExpand: () => setPotentialCollapsed(false) },
    {
      step: 4,
      title: "에디잠재",
      collapsed: additionalPotentialCollapsed,
      onExpand: () => setAdditionalPotentialCollapsed(false),
    },
  ].filter((card) => card.collapsed);

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

      {collapsedCards.length > 0 && (
        <div className="hidden flex-wrap items-start gap-4 md:flex">
          {collapsedCards.map((card) => (
            <CollapsedCardBar key={card.step} step={card.step} title={card.title} onExpand={card.onExpand} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-start gap-4">
        <CollapsibleCard
          step={1}
          title="장비"
          collapsed={equipmentCollapsed}
          onCollapse={() => setEquipmentCollapsed(true)}
          onExpand={() => setEquipmentCollapsed(false)}
        >
          <NameInput
            isFetching={isFetchingBasic || isFetchingEquipment}
            characterPreset={selection.type == "character" ? selection.preset : undefined}
            characterDisabled={!equipment}
            onSelectCharacterPreset={(preset) => setSelection({ type: "character", preset })}
          />
          <div className="relative h-5 text-xs">
            <Separator className="absolute inset-0 top-1/2" />
            <span className="relative mx-auto block w-fit bg-card px-2 text-muted-foreground">또는</span>
          </div>
          <PresetTabs
            comboIndex={selection.type == "set" ? selection.comboIndex : undefined}
            onSelectCombo={(comboIndex) => setSelection({ type: "set", comboIndex })}
          />

          <EquipmentGrid
            characterImage={selection.type == "character" ? basic?.character_image : undefined}
            items={items}
            onSelectItem={handleSelectItem}
          />
        </CollapsibleCard>

        <StarforceCard
          collapsed={starforceCollapsed}
          level={starforceLevel}
          onLevelChange={setStarforceLevel}
          spareValue={spareValue}
          onSpareValueChange={handleSpareValueChange}
          spareValuePriceInfo={spareValuePriceInfo}
          isFetchingSpareValuePrice={isFetchingSpareValuePrice}
          onCollapse={() => setStarforceCollapsed(true)}
          onExpand={() => setStarforceCollapsed(false)}
        />

        <CollapsibleCard
          step={3}
          title="잠재능력"
          collapsed={potentialCollapsed}
          onCollapse={() => setPotentialCollapsed(true)}
          onExpand={() => setPotentialCollapsed(false)}
        >
          <PotentialCommonControls
            category={potentialCategory}
            onCategoryChange={handlePotentialCategoryChange}
            equipmentLevelTier={potentialLevel}
            onEquipmentLevelTierChange={handlePotentialLevelChange}
            selectedCube={selectedCube}
            onCubeChange={setSelectedCube}
            isLinked={isLinked}
            onToggleLink={togglePotentialLink}
            extraCube={isAscendantSelected ? CubeType.PULSE_RESET : undefined}
          />
          <PotentialTable
            data={potentialData}
            isLoading={isFetchingPotential}
            cubeType={selectedCube}
            levelTier={potentialLevel}
            excludedGrades={["rare", "epic"]}
            category={potentialCategory}
            includeDropMeso
          />
        </CollapsibleCard>

        <CollapsibleCard
          step={4}
          title="에디잠재"
          collapsed={additionalPotentialCollapsed}
          onCollapse={() => setAdditionalPotentialCollapsed(true)}
          onExpand={() => setAdditionalPotentialCollapsed(false)}
        >
          <AdditionalPotentialControls
            category={additionalCategory}
            onCategoryChange={handleAdditionalCategoryChange}
            equipmentLevelTier={additionalLevel}
            onEquipmentLevelTierChange={handleAdditionalLevelChange}
            selectedCube={selectedAdditionalCube}
            onCubeChange={setSelectedAdditionalCube}
            isLinked={isLinked}
            onToggleLink={toggleAdditionalLink}
            extraCube={isAscendantSelected ? CubeType.PULSE_ADDI_RESET : undefined}
          />
          <PotentialTable
            data={additionalPotentialData}
            isLoading={isFetchingAdditionalPotential}
            cubeType={selectedAdditionalCube}
            levelTier={additionalLevel}
            excludedGrades={["rare"]}
            category={additionalCategory}
          />
        </CollapsibleCard>
      </div>
    </div>
  );
}
