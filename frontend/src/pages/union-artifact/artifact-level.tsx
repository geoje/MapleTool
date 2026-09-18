import { useEffect, useRef, useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { MAX_ARTIFACT_LEVEL, MIN_ARTIFACT_LEVEL } from "@/constants/artifact";

function clamp(value: number) {
  return Math.min(MAX_ARTIFACT_LEVEL, Math.max(MIN_ARTIFACT_LEVEL, value));
}

export function ArtifactLevel({
  artifactLevel,
  onChange,
}: {
  artifactLevel: number;
  onChange: (value: number) => void;
}) {
  const [text, setText] = useState(String(artifactLevel));
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) setText(String(artifactLevel));
  }, [artifactLevel]);

  return (
    <InputGroup className="rounded-full border-0 bg-muted has-disabled:bg-muted has-disabled:opacity-100">
      <InputGroupAddon align="inline-start">
        <InputGroupButton
          aria-label="decrease by 10"
          disabled={artifactLevel <= MIN_ARTIFACT_LEVEL}
          onClick={() => onChange(clamp(artifactLevel - 10))}
        >
          -10
        </InputGroupButton>
        <InputGroupButton
          aria-label="decrease"
          disabled={artifactLevel <= MIN_ARTIFACT_LEVEL}
          onClick={() => onChange(clamp(artifactLevel - 1))}
        >
          -1
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
          setText(String(artifactLevel));
        }}
        onChange={(event) => {
          const digits = event.target.value.replace(/[^0-9]/g, "");
          setText(digits);
          onChange(digits ? clamp(Number(digits)) : MIN_ARTIFACT_LEVEL);
        }}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="increase"
          disabled={artifactLevel >= MAX_ARTIFACT_LEVEL}
          onClick={() => onChange(clamp(artifactLevel + 1))}
        >
          +1
        </InputGroupButton>
        <InputGroupButton
          aria-label="increase by 10"
          disabled={artifactLevel >= MAX_ARTIFACT_LEVEL}
          onClick={() => onChange(clamp(artifactLevel + 10))}
        >
          +10
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
