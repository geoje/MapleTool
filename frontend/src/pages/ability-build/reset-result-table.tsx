import { ABILITY_OPTION_INFOS } from "@/constants/ability";
import { cn } from "@/lib/utils";

const SAMPLE_RESULTS = [
  { info: ABILITY_OPTION_INFOS[0], value: 9 },
  { info: ABILITY_OPTION_INFOS[1], value: 7 },
  { info: ABILITY_OPTION_INFOS[2], value: 18 },
];

export function ResetResultTable() {
  return (
    <div className="w-fit overflow-hidden rounded-xl border bg-card shadow-lg">
      {SAMPLE_RESULTS.map(({ info, value }, index) => (
        <div
          key={info.name}
          className={cn("px-3 py-2 text-xs whitespace-nowrap tabular-nums", index !== SAMPLE_RESULTS.length - 1 && "border-b")}
        >
          {info.resultTemplate.replace("n", String(value))}
        </div>
      ))}
    </div>
  );
}
