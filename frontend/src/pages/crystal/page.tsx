import { IconButton, Stack } from "@chakra-ui/react";
import BoardCard from "../../components/layout/boardCard";
import ResultTable from "./3-statistics/resultTable";
import { useState } from "react";
import CharacterButtons from "./1-character/characterButtons";
import Boss from "./2-boss/boss";
import PreparedButtons from "./2-boss/preparedButtons";
import NameInput from "./1-character/nameInput";
import { LuShare2 } from "react-icons/lu";
import { convertPlansToParams } from "../../services/boss";
import { useAppSelector } from "../../stores/hooks";

export default function Crystal() {
  const bossPlans = useAppSelector((state) => state.user.bossPlans);
  const [selected, setSelected] = useState(-1);

  return (
    <>
      <Stack w={{ base: "100vw", md: "auto" }}>
        <BoardCard
          order={1}
          title="캐릭터 등록"
          right={
            <IconButton
              aria-label="share"
              size="xs"
              icon={<LuShare2 size={16} />}
              variant="ghost"
              onClick={() =>
                console.log(convertPlansToParams(bossPlans).toString())
              }
            />
          }
        >
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
