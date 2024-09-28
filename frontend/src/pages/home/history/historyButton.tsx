import { Button } from "@chakra-ui/react";

export default function HistoryButton({ name }: { name: string }) {
  return (
    <Button size="xs" rightIcon={<p>x</p>}>
      {name}
    </Button>
  );
}
