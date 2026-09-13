import { Loader2, Search } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="relative min-w-40 flex-1">
      <Input
        placeholder="캐릭터명을 입력하세요."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onCompositionStart={() => (isComposing.current = true)}
        onCompositionEnd={() => (isComposing.current = false)}
        onKeyDown={(event) => {
          if (event.key != "Enter") return;
          if (isComposing.current || event.nativeEvent.isComposing) return;
          handleSubmit();
        }}
        className="pr-9"
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label="search"
        disabled={isFetching}
        className="absolute top-0.5 right-0.5 size-7 rounded-full text-muted-foreground hover:bg-transparent hover:text-foreground"
        onClick={handleSubmit}
      >
        {isFetching ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
      </Button>
    </div>
  );
}
