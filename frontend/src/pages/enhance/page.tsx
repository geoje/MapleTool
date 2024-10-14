import { Spinner, Stack } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import GetEquipment from "./1-getEquipment/getEquipment";
import SelectEquipment from "./2-selectEquipment/selectEquipment";
import SelectMaterial from "./3-selectMaterial/selectMaterial";
import Config from "./4-config/config";
import Changes from "./5-changes/changes";
import Execute from "./6-execute/execute";
import PresetButtons from "./1-getEquipment/presetButtons";
import { useState } from "react";
import { SET_TYPE } from "../../constants/enhance/set";
import { useAppSelector } from "../../stores/hooks";
import { useItemEquipmentQuery } from "../../stores/characterApi";

export default function Enhance() {
  const name = useAppSelector((state) => state.user.name);
  const { isFetching } = useItemEquipmentQuery(name, {
    skip: !name,
    refetchOnMountOrArgChange: true,
  });

  const [preset, setPreset] = useState<number | SET_TYPE>(1);

  return (
    <>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard
          order={1}
          title="장비 가져오기"
          right={
            isFetching ? (
              <Spinner />
            ) : (
              <PresetButtons preset={preset} setPreset={setPreset} />
            )
          }
        >
          <GetEquipment preset={preset} setPreset={setPreset} />
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