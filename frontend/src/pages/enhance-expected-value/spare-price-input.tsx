import { useEffect, useRef, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { formatCostExact } from "@/lib/format";

const EOK = 100_000_000;
const CHEONMAN = 10_000_000;

function clamp(value: number) {
  return Math.max(0, value);
}

export function SparePriceInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const [text, setText] = useState(String(value));
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) setText(String(value));
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">노작 가격</span>
        <span className="text-xs whitespace-nowrap tabular-nums text-muted-foreground">{formatCostExact(value)}</span>
      </div>
      <InputGroup className="rounded-full border-0 bg-muted has-disabled:bg-muted has-disabled:opacity-100">
        <InputGroupAddon align="inline-start">
          <InputGroupButton aria-label="decrease by 1억" onClick={() => onChange(clamp(value - EOK))}>
            -1억
          </InputGroupButton>
          <InputGroupButton aria-label="decrease by 1천만" onClick={() => onChange(clamp(value - CHEONMAN))}>
            -1천만
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
            setText(String(value));
          }}
          onChange={(event) => {
            const digits = event.target.value.replace(/[^0-9]/g, "");
            setText(digits);
            onChange(digits ? clamp(Number(digits)) : 0);
          }}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="increase by 1천만" onClick={() => onChange(value + CHEONMAN)}>
            +1천만
          </InputGroupButton>
          <InputGroupButton aria-label="increase by 1억" onClick={() => onChange(value + EOK)}>
            +1억
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
