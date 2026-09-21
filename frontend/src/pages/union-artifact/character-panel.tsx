import { Loader2, Search } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { useArtifactStore } from "@/stores/artifact-store";

export function NameInput({ isFetching }: { isFetching?: boolean }) {
  const name = useArtifactStore((state) => state.name);
  const setName = useArtifactStore((state) => state.setName);
  const [value, setValue] = useState(name);
  const isComposing = useRef(false);

  const handleSubmit = () => {
    setName(value);
  };

  return (
    <ButtonGroup className="w-full">
      <Input
        variant="outline"
        placeholder="캐릭터명을 입력하세요."
        enterKeyHint="go"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onCompositionStart={() => (isComposing.current = true)}
        onCompositionEnd={() => (isComposing.current = false)}
        onKeyDown={(event) => {
          if (event.key != "Enter") return;
          if (isComposing.current || event.nativeEvent.isComposing) return;
          handleSubmit();
        }}
      />
      <Button
        type="button"
        variant="outline"
        aria-label="search"
        disabled={isFetching}
        className="text-muted-foreground hover:text-foreground"
        onClick={handleSubmit}
      >
        {isFetching ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
      </Button>
    </ButtonGroup>
  );
}
