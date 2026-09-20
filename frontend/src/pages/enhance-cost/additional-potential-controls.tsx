import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CUBE_INFOS, ADDITIONAL_POTENTIAL_CUBES, CubeType, EQUIPMENT_LEVEL_TIERS, EquipmentLevelTier } from "@/constants/enhance";
import { EquipmentCategorySelect } from "@/pages/enhance-cost/equipment-category-select";
import { Link2, Link2Off } from "lucide-react";

export function AdditionalPotentialControls({
  category,
  onCategoryChange,
  equipmentLevelTier,
  onEquipmentLevelTierChange,
  selectedCube,
  onCubeChange,
  isLinked,
  onToggleLink,
}: {
  category: string;
  onCategoryChange: (value: string) => void;
  equipmentLevelTier: EquipmentLevelTier;
  onEquipmentLevelTierChange: (value: EquipmentLevelTier) => void;
  selectedCube: CubeType | null;
  onCubeChange: (cube: CubeType) => void;
  isLinked: boolean;
  onToggleLink: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Equipment Category */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onToggleLink}
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="whitespace-nowrap">장비 분류</span>
          {isLinked ? <Link2 className="w-3 h-3" /> : <Link2Off className="w-3 h-3" />}
        </button>
        <EquipmentCategorySelect category={category} onChange={onCategoryChange} />
      </div>

      {/* Equipment Level */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onToggleLink}
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="whitespace-nowrap">장비 레벨</span>
          {isLinked ? <Link2 className="w-3 h-3" /> : <Link2Off className="w-3 h-3" />}
        </button>
        <ButtonGroup>
          {EQUIPMENT_LEVEL_TIERS.map((tier) => (
            <Button
              key={tier.key}
              type="button"
              variant={equipmentLevelTier === tier.key ? "default" : "outline"}
              size="sm"
              onClick={() => onEquipmentLevelTierChange(tier.key)}
            >
              {tier.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Cube Selection */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">큐브</span>
        <ButtonGroup>
          {ADDITIONAL_POTENTIAL_CUBES.map((cube) => (
            <Tooltip key={cube}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={selectedCube === cube ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCubeChange(cube)}
                >
                  {CUBE_INFOS[cube].displayName}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">{CUBE_INFOS[cube].fullName}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
