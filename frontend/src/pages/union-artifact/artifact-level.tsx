import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="decrease by 10"
        disabled={artifactLevel <= MIN_ARTIFACT_LEVEL}
        onClick={() => onChange(clamp(artifactLevel - 10))}
      >
        -10
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="decrease"
        disabled={artifactLevel <= MIN_ARTIFACT_LEVEL}
        onClick={() => onChange(clamp(artifactLevel - 1))}
      >
        -1
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
          setText(String(artifactLevel));
        }}
        onChange={(event) => {
          const digits = event.target.value.replace(/[^0-9]/g, "");
          setText(digits);
          onChange(digits ? clamp(Number(digits)) : MIN_ARTIFACT_LEVEL);
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="increase"
        disabled={artifactLevel >= MAX_ARTIFACT_LEVEL}
        onClick={() => onChange(clamp(artifactLevel + 1))}
      >
        +1
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="increase by 10"
        disabled={artifactLevel >= MAX_ARTIFACT_LEVEL}
        onClick={() => onChange(clamp(artifactLevel + 10))}
      >
        +10
      </Button>
    </div>
  );
}
