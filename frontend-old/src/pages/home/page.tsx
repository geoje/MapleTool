import { Stack } from "@chakra-ui/react";
import NameInput from "./1-register/nameInput";
import CharacterButtons from "./2-character/characterButtons";
import BoardCard from "../../components/layout/boardCard";
import Notice from "./3-notice/notice";

export default function Home() {
  return (
    <Stack width="100%" align="center">
      <BoardCard>
        <NameInput />
      </BoardCard>
      <BoardCard>
        <CharacterButtons />
      </BoardCard>
      <Notice/>
    </Stack>
  );
}
