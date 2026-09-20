import { useEffect, useRef, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { MAX_STARFORCE_LEVEL, MIN_STARFORCE_LEVEL } from "@/constants/starforce";

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
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">장비 레벨</span>
      <InputGroup className="w-auto rounded-full border-0 bg-muted has-disabled:bg-muted has-disabled:opacity-100">
        <InputGroupAddon align="inline-start">
          <InputGroupButton
            aria-label="decrease by 5"
            disabled={level <= MIN_STARFORCE_LEVEL}
            onClick={() => onChange(clamp(level - 5))}
          >
            -5
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput
          inputMode="numeric"
          className="w-10 flex-none px-1 text-center"
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
            aria-label="increase by 5"
            disabled={level >= MAX_STARFORCE_LEVEL}
            onClick={() => onChange(clamp(level + 5))}
          >
            +5
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
