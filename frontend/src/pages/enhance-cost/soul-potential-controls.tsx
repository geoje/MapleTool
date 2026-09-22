import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

const AMPLIFY_LEVELS = [1, 2, 3, 4] as const;

export function SoulPotentialControls({
  amplifyLevel,
  onAmplifyLevelChange,
}: {
  amplifyLevel: number;
  onAmplifyLevelChange: (level: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">각성 단계</span>
      <ButtonGroup>
        {AMPLIFY_LEVELS.map((level) => (
          <Button
            key={level}
            type="button"
            variant={amplifyLevel === level ? "default" : "outline"}
            size="sm"
            onClick={() => onAmplifyLevelChange(level)}
          >
            {level}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
