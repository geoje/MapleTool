import { useEffect, useState } from "react";
import { CollapsedCardBar, CollapsibleCard } from "@/components/collapsible-card";
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
import {
  ASCENDANT_RING_PRICE,
  DEFAULT_EQUIPMENT_CATEGORY,
  DEFAULT_STARFORCE_LEVEL,
  EQUIPMENT_SLOT_TO_CATEGORY,
} from "@/constants/starforce";
import { useCharacterBasic } from "@/hooks/use-character-basic";
import { useCubeProbability } from "@/hooks/use-cube-probability";
import { useItemEquipment } from "@/hooks/use-item-equipment";
import { usePersistedBoolean } from "@/hooks/use-persisted-boolean";
import { useSoulProbability } from "@/hooks/use-soul-probability";
import { fetchItemPrice, type ItemPriceInfo } from "@/lib/price-service";
import { EquipmentGrid, NameInput, PresetTabs } from "@/pages/enhance-cost/equipment-panel";
import { PotentialCommonControls } from "@/pages/enhance-cost/potential-common-controls";
import { AdditionalPotentialControls } from "@/pages/enhance-cost/additional-potential-controls";
import { PotentialTable } from "@/pages/enhance-cost/potential-table";
import { SoulPotentialControls } from "@/pages/enhance-cost/soul-potential-controls";
import { SoulPotentialTable } from "@/pages/enhance-cost/soul-potential-table";
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
  const [soulCollapsed, setSoulCollapsed] = usePersistedBoolean("enhance-cost:soul-collapsed", false);
  const [soulAmplifyLevel, setSoulAmplifyLevel] = useState(1);
  const [selectedCube, setSelectedCube] = useState<CubeType>(CubeType.RESET);
  const [selectedAdditionalCube, setSelectedAdditionalCube] = useState<CubeType | null>(CubeType.ADDI_RESET);
  const [potentialCategory, setPotentialCategory] = useState<string>(DEFAULT_EQUIPMENT_CATEGORY);
  const [potentialLevel, setPotentialLevel] = useState<EquipmentLevelTier>(DEFAULT_EQUIPMENT_LEVEL_TIER);
  const [additionalCategory, setAdditionalCategory] = useState<string>(DEFAULT_EQUIPMENT_CATEGORY);
  const [additionalLevel, setAdditionalLevel] = useState<EquipmentLevelTier>(DEFAULT_EQUIPMENT_LEVEL_TIER);
  const [isLinked, setIsLinked] = useState(true);

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

  // Manually editing 스타포스 레벨 only drops the badge when it's the 어센던트 펄스 링's - a
  // normal item's badge/price should stay put even if the level field is nudged afterward.
  const handleStarforceLevelChange = (value: number) => {
    setStarforceLevel(value);
    setSpareValuePriceInfo((prev) => (prev?.itemName === ASCENDANT_PULSE_RING_ITEM_NAME ? null : prev));
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

  // Clicking an equipped item jumps the starforce level to that item's level, fills in 노작
  // 가격 if the item has a known market price, and drives 잠재능력/에디잠재's category (mapped
  // from the item's slot) and level tier (<=200 -> 120~200, otherwise 250) - both sides
  // regardless of the 잠재/에디잠재 link toggle, since a concrete equipped item should always
  // set both to match it.
  const handleSelectItem = (item: ItemEquipmentDetail) => {
    setStarforceLevel(item.item_base_option.base_equipment_level);
    applyItemPrice(item.item_name);

    const category = EQUIPMENT_SLOT_TO_CATEGORY[item.item_equipment_slot];
    if (category) {
      handlePotentialCategoryChange(category);
      handleAdditionalCategoryChange(category);
    }

    const levelTier =
      item.item_base_option.base_equipment_level <= 200 ? EquipmentLevelTier.LOW : EquipmentLevelTier.HIGH;
    handlePotentialLevelChange(levelTier);
    handleAdditionalLevelChange(levelTier);
  };

  // The page defaults to 에테르넬 나이트헬름 (모자, 250 레벨) as if it were
  // already clicked, so 노작 가격 is preloaded without requiring a click.
  useEffect(() => {
    applyItemPrice(DEFAULT_EQUIPPED_ITEM_NAME);
  }, []);

  // Whenever each side's own category/level is 반지 / 120~200, that side offers one extra cube
  // option costed in 펄스 인핸서 instead of meso (see PotentialTable's isPulseCubeType) -
  // auto-selected the moment it becomes eligible, regardless of whether the ascendant ring item
  // itself was ever clicked. Manually changing category away from 반지 or level to 250 drops
  // eligibility (and the extra option) immediately, reverting a still-selected pulse cube back to
  // the plain reset cube; manually picking a different real cube while still eligible is left
  // alone (the pulse option just stays available to pick again).
  const isPotentialPulseEligible = potentialCategory === "반지" && potentialLevel === EquipmentLevelTier.LOW;
  const isAdditionalPulseEligible = additionalCategory === "반지" && additionalLevel === EquipmentLevelTier.LOW;

  useEffect(() => {
    if (isPotentialPulseEligible) {
      setSelectedCube(CubeType.PULSE_RESET);
    } else {
      setSelectedCube((prev) => (prev === CubeType.PULSE_RESET ? CubeType.RESET : prev));
    }
  }, [isPotentialPulseEligible]);

  useEffect(() => {
    if (isAdditionalPulseEligible) {
      setSelectedAdditionalCube(CubeType.PULSE_ADDI_RESET);
    } else {
      setSelectedAdditionalCube((prev) => (prev === CubeType.PULSE_ADDI_RESET ? CubeType.ADDI_RESET : prev));
    }
  }, [isAdditionalPulseEligible]);

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
  const { data: soulData, isFetching: isFetchingSoul } = useSoulProbability(soulAmplifyLevel);

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
    { step: 5, title: "소울잠재", collapsed: soulCollapsed, onExpand: () => setSoulCollapsed(false) },
  ].filter((card) => card.collapsed);

  return (
    <div className="flex flex-col gap-4">
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
          onLevelChange={handleStarforceLevelChange}
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
            extraCube={isPotentialPulseEligible ? CubeType.PULSE_RESET : undefined}
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
            extraCube={isAdditionalPulseEligible ? CubeType.PULSE_ADDI_RESET : undefined}
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

        <CollapsibleCard
          step={5}
          title="소울잠재"
          collapsed={soulCollapsed}
          onCollapse={() => setSoulCollapsed(true)}
          onExpand={() => setSoulCollapsed(false)}
        >
          <SoulPotentialControls amplifyLevel={soulAmplifyLevel} onAmplifyLevelChange={setSoulAmplifyLevel} />
          <SoulPotentialTable data={soulData} isLoading={isFetchingSoul} />
        </CollapsibleCard>
      </div>
    </div>
  );
}
