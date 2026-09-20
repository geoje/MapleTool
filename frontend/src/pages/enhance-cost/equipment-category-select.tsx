import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EQUIPMENT_CATEGORIES } from "@/constants/starforce";

export function EquipmentCategorySelect({
  category,
  onChange,
}: {
  category: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={category} onValueChange={onChange}>
      <SelectTrigger size="sm" className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {EQUIPMENT_CATEGORIES.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
