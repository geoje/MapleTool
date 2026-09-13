import { Diamond } from "lucide-react";
import { MAX_CRYSTAL_LEVEL } from "@/constants/artifact";
import { cn } from "@/lib/utils";

export function Crystal({
  level,
  effects,
  icon,
  hoverEffect,
  setHoverEffect,
  pinnedEffect,
  setPinnedEffect,
}: {
  level: number;
  effects: string[];
  icon: string;
  hoverEffect: string;
  setHoverEffect: (value: string) => void;
  pinnedEffect: string;
  setPinnedEffect: (value: string) => void;
}) {
  const isMaxLevel = level == MAX_CRYSTAL_LEVEL;

  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg border p-2 sm:p-4",
        isMaxLevel
          ? "border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950/40"
          : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40"
      )}
    >
      <div className="flex justify-center gap-1 pt-2">
        {Array.from({ length: level }, (_, i) => (
          <Diamond
            key={"diamond-" + i}
            className={cn("size-3", isMaxLevel ? "text-purple-500" : "text-blue-500")}
            fill="currentColor"
          />
        ))}
      </div>
      <div className="my-auto flex aspect-square w-full items-center justify-center sm:h-32 sm:w-32">
        <img src={icon} alt="" className="h-full w-full object-contain" />
      </div>
      {effects.map((effect, i) => (
        <button
          key={"effect-" + i}
          type="button"
          className={cn(
            "flex h-6 items-center justify-center rounded-full px-2 text-xs transition-colors",
            isMaxLevel
              ? "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/60 dark:hover:bg-purple-800"
              : "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 dark:hover:bg-blue-800",
            effect &&
              (hoverEffect == effect || pinnedEffect == effect) &&
              (isMaxLevel ? "bg-purple-200 dark:bg-purple-800" : "bg-blue-200 dark:bg-blue-800")
          )}
          onMouseEnter={() => setHoverEffect(effect)}
          onMouseLeave={() => setHoverEffect("")}
          onClick={() => effect && setPinnedEffect(pinnedEffect == effect ? "" : effect)}
        >
          {effect}
        </button>
      ))}
    </div>
  );
}
