import { Button } from "@chakra-ui/react";

export default function SelectPreset({
  preset,
  onChange,
}: {
  preset: number;
  onChange: (preset: number) => void;
}) {
  return (
    <>
      {[1, 2, 3].map((v) => (
        <Button
          key={"preset-" + v}
          size="xs"
          colorScheme="blue"
          variant={v == preset ? undefined : "ghost"}
          onClick={() => onChange(v)}
        >
          {v}
        </Button>
      ))}
    </>
  );
}
