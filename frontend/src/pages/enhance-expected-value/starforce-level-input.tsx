import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { MAX_STARFORCE_LEVEL, MIN_STARFORCE_LEVEL, STARFORCE_LEVEL_PRESETS } from "@/constants/starforce";

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
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">장비 레벨</span>
        <ButtonGroup>
          {STARFORCE_LEVEL_PRESETS.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant={level == preset ? "default" : "outline"}
              size="sm"
              onClick={() => onChange(preset)}
            >
              {preset}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <InputGroup className="rounded-full border-0 bg-muted has-disabled:bg-muted has-disabled:opacity-100">
        <InputGroupAddon align="inline-start">
          <InputGroupButton
            aria-label="decrease by 10"
            disabled={level <= MIN_STARFORCE_LEVEL}
            onClick={() => onChange(clamp(level - 10))}
          >
            -10
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput
          inputMode="numeric"
          className="text-center"
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
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="increase by 10"
            disabled={level >= MAX_STARFORCE_LEVEL}
            onClick={() => onChange(clamp(level + 10))}
          >
            +10
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
