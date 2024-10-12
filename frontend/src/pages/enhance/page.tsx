import { Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import FetchEquipment from "./1-fetchEquipment/fetchEquipment";
import SelectEquipment from "./2-selectEquipment/selectEquipment";
import SelectMaterial from "./3-selectMaterial/selectMaterial";
import Config from "./4-config/config";
import Changes from "./5-changes/changes";
import Execute from "./6-execute/execute";

export default function Enhance() {
  return (
    <>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard order={1} title="장비 가져오기">
          <FetchEquipment />
        </BoardCard>
        <BoardCard order={2} title="장비 선택">
          <SelectEquipment />
        </BoardCard>
        <BoardCard order={3} title="재료 선택">
          <SelectMaterial />
        </BoardCard>
        <BoardCard order={4} title="추가 설정">
          <Config />
        </BoardCard>
      </Stack>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard order={5} title="장비 변화">
          <Changes />
        </BoardCard>
        <BoardCard order={6} title="실행">
          <Execute />
        </BoardCard>
      </Stack>
    </>
  );
}
