import { Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { setNameAndAddHistory } from "../../../stores/userSlice";

export default function HistoryButton({ name }: { name: string }) {
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();

  return (
    <Button
      size="xs"
      colorScheme={userName == name ? "blue" : undefined}
      onClick={() => dispatch(setNameAndAddHistory(name))}
    >
      {name}
    </Button>
  );
}
