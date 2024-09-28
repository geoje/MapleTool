import { Flex, Hide, Show, Stack } from "@chakra-ui/react";
import { useAppSelector } from "../../../stores/hooks";
import HistoryButton from "./historyButton";

export default function HistoryButtons() {
  return (
    <>
      <Show above="md">
        <Desktop />
      </Show>
      <Hide above="md">
        <Mobile />
      </Hide>
    </>
  );
}

function Desktop() {
  const history = useAppSelector((state) => state.user.history);

  return (
    <Flex gap={2}>
      {history.map((name, i) => (
        <HistoryButton key={"name-" + i} name={name} />
      ))}
    </Flex>
  );
}

function Mobile() {
  return <></>;
}
