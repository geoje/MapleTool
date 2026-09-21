import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { formatCostExact } from "@/lib/format";
import type { ItemPriceInfo } from "@/lib/price-service";

function clamp(value: number) {
  return Math.max(0, value);
}

// Groups digits into 4-digit chunks counted from the right (e.g. "3049 9999"),
// lining up with 만 (10,000) units for a meso amount.
function groupDigits(digits: string): string {
  if (!digits) return "";
  const reversedChunks = [...digits].reverse().join("").match(/.{1,4}/g) ?? [];
  return reversedChunks
    .map((chunk) => [...chunk].reverse().join(""))
    .reverse()
    .join(" ");
}

function digitCountBefore(grouped: string, position: number): number {
  return grouped.slice(0, position).replace(/\D/g, "").length;
}

// Finds the position in a grouped string right after its Nth digit, so the
// cursor lands next to the same digit after regrouping shifts the spaces.
function positionAfterDigitCount(grouped: string, count: number): number {
  if (count <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < grouped.length; i++) {
    if (/\d/.test(grouped[i])) {
      seen++;
      if (seen === count) return i + 1;
    }
  }
  return grouped.length;
}

export function SparePriceInput({
  value,
  onChange,
  priceInfo,
  isLoadingPriceInfo,
}: {
  value: number;
  onChange: (value: number) => void;
  priceInfo?: ItemPriceInfo | null;
  isLoadingPriceInfo?: boolean;
}) {
  const [text, setText] = useState(String(value));
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isFocused) setText(String(value));
  }, [value, isFocused]);

  // Applies a new raw digit string and repositions the cursor after its Nth
  // digit. The DOM value is written first so React's reconciliation sees no
  // change and leaves our manual selection alone.
  const applyDigits = (input: HTMLInputElement, newDigits: string, cursorDigitCount: number) => {
    const grouped = groupDigits(newDigits);
    const pos = positionAfterDigitCount(grouped, cursorDigitCount);
    input.value = grouped;
    input.setSelectionRange(pos, pos);
    setText(newDigits);
    onChange(newDigits ? clamp(Number(newDigits)) : 0);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">노작 가격</span>
        {priceInfo ? (
          <Badge variant="secondary">{priceInfo.itemName}</Badge>
        ) : (
          isLoadingPriceInfo && <Loader2 className="size-3 shrink-0 animate-spin text-muted-foreground" />
        )}
      </div>
      <InputGroup className="w-auto flex-none rounded-full">
        <InputGroupInput
          ref={inputRef}
          inputMode="numeric"
          className="w-auto flex-none field-sizing-content text-center"
          value={isFocused ? groupDigits(text) : formatCostExact(value)}
          onFocus={() => {
            setIsFocused(true);
            setText(String(value));
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(event) => {
            if (event.key != "Backspace" && event.key != "Delete") return;

            const input = event.currentTarget;
            if (input.selectionStart == null || input.selectionStart != input.selectionEnd) return;

            event.preventDefault();
            const digitsBefore = digitCountBefore(groupDigits(text), input.selectionStart);

            if (event.key == "Backspace") {
              if (digitsBefore == 0) return;
              applyDigits(input, text.slice(0, digitsBefore - 1) + text.slice(digitsBefore), digitsBefore - 1);
            } else {
              if (digitsBefore >= text.length) return;
              applyDigits(input, text.slice(0, digitsBefore) + text.slice(digitsBefore + 1), digitsBefore);
            }
          }}
          onChange={(event) => {
            const digits = event.target.value.replace(/[^0-9]/g, "");
            const cursor = event.target.selectionStart ?? event.target.value.length;
            const digitsBefore = digitCountBefore(event.target.value, cursor);
            applyDigits(event.target, digits, digitsBefore);
          }}
        />
      </InputGroup>
    </div>
  );
}
