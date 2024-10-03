import { Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../../stores/hooks";
import CharacterButton from "./characterButton";

export default function CharacterButtons() {
  const history = useAppSelector((state) => state.user.history);

  return (
    <Flex gap={2}>
      {!history.length && <CharacterButton name="" />}
      {history.map((name, i) => (
        <CharacterButton key={"name-" + i} name={name} />
      ))}
    </Flex>
  );
}
