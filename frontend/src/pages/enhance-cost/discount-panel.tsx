import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MEMBERSHIP_GRADES, PC_ROOM_DISCOUNT_RATE } from "@/constants/starforce";

function membershipDiscountLabel(grade: (typeof MEMBERSHIP_GRADES)[number]) {
  const isHighestGrade = grade.key === MEMBERSHIP_GRADES[MEMBERSHIP_GRADES.length - 1].key;
  return `MVP ${grade.label}${isHighestGrade ? " 이상" : ""} ${grade.discountRate}% 할인`;
}

export function StarforceDiscountPanel({
  membershipGrade,
  onSelectMembershipGrade,
  pcRoom,
  onTogglePcRoom,
}: {
  membershipGrade: string | null;
  onSelectMembershipGrade: (key: string) => void;
  pcRoom: boolean;
  onTogglePcRoom: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">할인</span>
      <div className="flex items-center gap-2">
        <ButtonGroup>
          {MEMBERSHIP_GRADES.map((grade) => (
            <Tooltip key={grade.key}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={membershipGrade === grade.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSelectMembershipGrade(grade.key)}
                >
                  {grade.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">{membershipDiscountLabel(grade)}</TooltipContent>
            </Tooltip>
          ))}
        </ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant={pcRoom ? "default" : "outline"} size="sm" onClick={onTogglePcRoom}>
              PC방
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{`PC방 ${PC_ROOM_DISCOUNT_RATE}% 할인`}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
