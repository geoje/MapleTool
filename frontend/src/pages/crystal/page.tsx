import { Stack } from "@chakra-ui/react";
import BoardCard from "../../components/layout/boardCard";
import ResultTable from "./3-statistics/resultTable";
import { useState } from "react";
import CharacterButtons from "./1-character/characterButtons";
import Boss from "./2-boss/boss";
import PreparedButtons from "./2-boss/preparedButtons";
import NameInput from "./1-character/nameInput";

export default function Crystal() {
  const [selected, setSelected] = useState(-1);

  return (
    <>
      <Stack w={{ base: "100vw", md: "auto" }}>
        <BoardCard order={1} title="캐릭터 등록">
          <NameInput setSelected={setSelected} />
          <CharacterButtons selected={selected} setSelected={setSelected} />
        </BoardCard>
      </Stack>
      <Stack w={{ base: "100vw", md: "auto" }}>
        <BoardCard
          order={2}
          title="보스 선택"
          right={<PreparedButtons selected={selected} />}
        >
          <Boss selected={selected} />
        </BoardCard>
      </Stack>
      <Stack w={{ base: "100vw", md: "auto" }}>
        <BoardCard order={3} title="통계">
          <ResultTable />
        </BoardCard>
      </Stack>
    </>
  );
}
