import { Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import ResultTable from "./statistics/resultTable";
import { useState } from "react";
import CharacterButtons from "./character/characterButtons";
import Boss from "./boss/boss";
import PreparedButtons from "./boss/preparedButtons";
import NameInput from "./character/nameInput";

export default function Crystal() {
  const [selected, setSelected] = useState(-1);

  return (
    <>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard order={1} title="캐릭터 등록">
          <NameInput setSelected={setSelected} />
          <CharacterButtons selected={selected} setSelected={setSelected} />
        </BoardCard>
      </Stack>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard
          order={2}
          title="보스 선택"
          right={<PreparedButtons selected={selected} />}
        >
          <Boss selected={selected} />
        </BoardCard>
      </Stack>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard order={3} title="통계">
          <ResultTable />
        </BoardCard>
      </Stack>
    </>
  );
}
