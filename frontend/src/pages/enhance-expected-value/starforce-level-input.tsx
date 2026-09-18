import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { MAX_STARFORCE_LEVEL, MIN_STARFORCE_LEVEL, STARFORCE_LEVEL_PRESETS } from "@/constants/starforce";
import { cn } from "@/lib/utils";

function clamp(value: number) {
  return Math.min(MAX_STARFORCE_LEVEL, Math.max(MIN_STARFORCE_LEVEL, value));
}

export function StarforceLevelInput({ level, onChange }: { level: number; onChange: (value: number) => void }) {
  const [text, setText] = useState(String(level));
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) setText(String(level));
  }, [level]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <span className="mr-1 text-xs font-medium text-muted-foreground whitespace-nowrap">장비 레벨</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label="decrease by 10"
          disabled={level <= MIN_STARFORCE_LEVEL}
          onClick={() => onChange(clamp(level - 10))}
        >
          -10
        </Button>
        <Input
          inputMode="numeric"
          className="min-w-0 flex-1 text-center"
          value={text}
          onFocus={() => {
            isFocused.current = true;
          }}
          onBlur={() => {
            isFocused.current = false;
            setText(String(level));
          }}
          onChange={(event) => {
            const digits = event.target.value.replace(/[^0-9]/g, "");
            setText(digits);
            onChange(digits ? clamp(Number(digits)) : MIN_STARFORCE_LEVEL);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label="increase by 10"
          disabled={level >= MAX_STARFORCE_LEVEL}
          onClick={() => onChange(clamp(level + 10))}
        >
          +10
        </Button>
      </div>
      <ButtonGroup className="w-full">
        {STARFORCE_LEVEL_PRESETS.map((preset) => (
          <Button
            key={preset}
            type="button"
            variant="outline"
            size="sm"
            className={cn("flex-1", level == preset && "bg-muted text-foreground")}
            onClick={() => onChange(preset)}
          >
            {preset}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
