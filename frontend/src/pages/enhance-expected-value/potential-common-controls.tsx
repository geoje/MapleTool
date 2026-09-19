import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { EQUIPMENT_LEVEL_TIERS, EquipmentLevelTier } from "@/constants/enhance";
import { MIRACLE_TIME_EFFECT } from "@/constants/sunday-maple";
import { EquipmentCategorySelect } from "@/pages/enhance-expected-value/equipment-category-select";

export function PotentialCommonControls({
  category,
  onCategoryChange,
  equipmentLevelTier,
  onEquipmentLevelTierChange,
  miracleTime,
  onToggleMiracleTime,
}: {
  category: string;
  onCategoryChange: (value: string) => void;
  equipmentLevelTier: EquipmentLevelTier;
  onEquipmentLevelTierChange: (value: EquipmentLevelTier) => void;
  miracleTime: boolean;
  onToggleMiracleTime: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      <EquipmentCategorySelect category={category} onChange={onCategoryChange} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">장비 레벨</span>
        <ButtonGroup>
          {EQUIPMENT_LEVEL_TIERS.map((tier) => (
            <Button
              key={tier.key}
              type="button"
              variant={equipmentLevelTier == tier.key ? "default" : "outline"}
              size="sm"
              onClick={() => onEquipmentLevelTierChange(tier.key)}
            >
              {tier.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">썬데이</span>
        <Button type="button" variant={miracleTime ? "default" : "outline"} size="sm" onClick={onToggleMiracleTime}>
          {MIRACLE_TIME_EFFECT.label}
        </Button>
      </div>
    </div>
  );
}
