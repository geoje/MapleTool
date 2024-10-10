import { Stack } from "@chakra-ui/react";
import NameInput from "./register/nameInput";
import CharacterButtons from "./character/characterButtons";
import BoardCard from "../../components/boardCard";

export default function Home() {
  return (
    <Stack width="100%" align="center">
      <BoardCard>
        <NameInput />
      </BoardCard>
      <BoardCard>
        <CharacterButtons />
      </BoardCard>
    </Stack>
  );
}
