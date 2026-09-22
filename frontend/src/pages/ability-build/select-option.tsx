import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { ABILITY_OPTION_INFOS, MAX_SELECTED_ABILITY_OPTIONS, ResetType } from "@/constants/ability";
import { cn } from "@/lib/utils";
import { GradeBadge } from "@/pages/enhance-cost/potential-table";

function gradeForSelectionOrder(order: number, resetType: ResetType) {
  if (resetType === ResetType.ADVANCED) return "legendary";
  return order === 0 ? "legendary" : "unique";
}

export function SelectOption({
  selectedNames,
  onChange,
  resetType,
}: {
  selectedNames: Set<string>;
  onChange: (name: string) => void;
  resetType: ResetType;
}) {
  const isFull = selectedNames.size >= MAX_SELECTED_ABILITY_OPTIONS;
  const selectionOrder = Array.from(selectedNames);

  return (
    <div className="flex flex-col gap-1">
      {ABILITY_OPTION_INFOS.map((option) => {
        const id = `select-option-${option.name}`;
        const checked = selectedNames.has(option.name);
        const disabled = !checked && isFull;
        const order = selectionOrder.indexOf(option.name);

        return (
          <FieldLabel
            key={id}
            htmlFor={id}
            className={cn("gap-1.5 *:data-[slot=field]:p-1.5", disabled && "cursor-not-allowed opacity-50")}
          >
            <Field orientation="horizontal" className="gap-1.5">
              <Checkbox id={id} checked={checked} disabled={disabled} onCheckedChange={() => onChange(option.name)} />
              <FieldContent>
                <FieldTitle className="text-xs">{option.abbreviation}</FieldTitle>
              </FieldContent>
              {checked ? (
                <GradeBadge grade={gradeForSelectionOrder(order, resetType)} />
              ) : (
                !isFull && <GradeBadge grade={gradeForSelectionOrder(selectionOrder.length, resetType)} className="opacity-40" />
              )}
            </Field>
          </FieldLabel>
        );
      })}
    </div>
  );
}
