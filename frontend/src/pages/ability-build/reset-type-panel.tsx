import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ResetType } from "@/constants/ability";

export function ResetTypePanel({ resetType, onChange }: { resetType: ResetType; onChange: (type: ResetType) => void }) {
  return (
    <div className="flex items-center justify-between gap-1">
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">재설정</span>
      <ButtonGroup>
        <Button
          type="button"
          variant={resetType === ResetType.NORMAL ? "default" : "outline"}
          size="xs"
          onClick={() => onChange(ResetType.NORMAL)}
        >
          일반
        </Button>
        <Button
          type="button"
          variant={resetType === ResetType.ADVANCED ? "default" : "outline"}
          size="xs"
          onClick={() => onChange(ResetType.ADVANCED)}
        >
          고급
        </Button>
      </ButtonGroup>
    </div>
  );
}
