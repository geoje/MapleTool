import { Divider, IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import { FaPlusCircle } from "react-icons/fa";
import CharacterButton from "./character/characterButton";
import PlanModal from "./character/modal/planModal";
import { useAppSelector } from "../../stores/hooks";
import ResultTable from "./statistics/resultTable";
import NameInput from "./register/nameInput";

export default function Crystal() {
  const bossPlan = useAppSelector((state) => state.user.bossPlan);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack>
        <BoardCard order={1} title="캐릭터 등록">
          <NameInput />
        </BoardCard>
        <BoardCard order={2} title="캐릭터 선택">
          <Stack divider={<Divider />}>
            {bossPlan.map((plan, i) => (
              <CharacterButton
                key={"character-" + i}
                bossPlan={plan}
                bossPlanIndex={i}
              />
            ))}
            <IconButton
              aria-label="add"
              icon={<FaPlusCircle opacity={0.8} />}
              onClick={() => {
                onOpen();
              }}
            />
          </Stack>
        </BoardCard>
        <BoardCard order={3} title="보스 선택"></BoardCard>
      </Stack>
      <Stack>
        <BoardCard order={4} title="통계">
          <ResultTable />
        </BoardCard>
      </Stack>
      <PlanModal isOpen={isOpen} onClose={onClose} bossPlanIndex={-1} />
    </>
  );
}
