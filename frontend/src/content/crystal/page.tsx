import { IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import { FaPlusCircle } from "react-icons/fa";
import CharacterButton from "./character/characterButton";
import PlanModal from "./character/modal/planModal";
import { useState } from "react";
import { useAppSelector } from "../../reducer/hooks";

export default function Crystal() {
  const bossPlan = useAppSelector((state) => state.user.bossPlan);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [planIndex, setPlanIndex] = useState(-1);

  return (
    <>
      <Stack>
        <BoardCard order={1} title="캐릭터 등록">
          <Stack>
            {bossPlan.map((plan, i) => (
              <CharacterButton
                key={"character-" + i}
                bossPlan={plan}
                onClick={() => {
                  setPlanIndex(i);
                  onOpen();
                }}
              />
            ))}
            <IconButton
              aria-label="add"
              icon={<FaPlusCircle opacity={0.8} />}
              onClick={() => {
                setPlanIndex(-1);
                onOpen();
              }}
            />
          </Stack>
        </BoardCard>
      </Stack>
      <Stack>
        <BoardCard order={2} title="통계"></BoardCard>
      </Stack>
      <PlanModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={() => setPlanIndex(-1)}
        bossPlanIndex={planIndex}
      />
    </>
  );
}

function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
