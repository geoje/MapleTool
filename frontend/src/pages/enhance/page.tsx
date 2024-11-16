import {
  IconButton,
  Spinner,
  Stack,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import BoardCard from "../../components/layout/boardCard";
import GetEquipment from "./1-getEquipment/getEquipment";
import SelectEquipment from "./2-selectEquipment/selectEquipment";
import SelectMaterial from "./3-selectMaterial/selectMaterial";
import Config from "./4-config/config";
import Changes from "./5-changes/changes";
import Execute from "./7-execute/execute";
import PresetButtons from "./1-getEquipment/presetButtons";
import { LuTrash2, LuChevronUp, LuChevronDown } from "react-icons/lu";
import { useState } from "react";
import { SET_TYPE } from "../../constants/enhance/set";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { useItemEquipmentQuery } from "../../stores/characterApi";
import { MATERIAL_TYPE } from "../../constants/enhance/material";
import UsedMaterial from "./6-usedMaterial/usedMaterial";
import { clearInventory, clearMaterials } from "../../stores/userSlice";

export default function Enhance() {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.name);
  const inventory = useAppSelector((state) => state.user.inventory);
  const { isFetching } = useItemEquipmentQuery(name, {
    skip: !name,
    refetchOnMountOrArgChange: true,
  });

  const [preset, setPreset] = useState<number | SET_TYPE>(1);
  const [inventoryIndex, setEquipmentIndex] = useState(-1);
  const [materialType, setMaterialType] = useState<MATERIAL_TYPE>();
  const { isOpen: showChanges, onToggle: onToggleShowChanges } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <>
      <Stack w={{ base: "100vw", md: "auto" }}>
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
          <GetEquipment
            preset={preset}
            setPreset={setPreset}
            onItemClick={() => setEquipmentIndex(inventory.length)}
          />
        </BoardCard>
        <BoardCard
          order={2}
          title="장비 선택"
          right={
            <Tooltip label="전체 삭제" placement="top">
              <IconButton
                size="xs"
                aria-label="clearInventory"
                variant="ghost"
                colorScheme="red"
                icon={<LuTrash2 size={16} />}
                onClick={() => {
                  setEquipmentIndex(-1);
                  dispatch(clearInventory());
                }}
              />
            </Tooltip>
          }
        >
          <SelectEquipment
            equipmentIndex={inventoryIndex}
            setEquipmentIndex={setEquipmentIndex}
          />
        </BoardCard>
        <BoardCard order={3} title="재료 선택">
          <SelectMaterial
            materialType={materialType}
            setMaterialType={setMaterialType}
          />
        </BoardCard>
        <BoardCard order={4} title="추가 설정">
          <Config materialType={materialType} />
        </BoardCard>
      </Stack>
      <Stack
        w={{
          base: "100vw",
          md: "min-content",
        }}
      >
        <BoardCard
          order={5}
          title="장비 변화"
          right={
            <IconButton
              size="xs"
              aria-label="changes"
              variant="ghost"
              icon={
                showChanges ? (
                  <LuChevronUp size={20} />
                ) : (
                  <LuChevronDown size={20} />
                )
              }
              onClick={onToggleShowChanges}
            />
          }
        >
          <Changes inventoryIndex={inventoryIndex} showChanges={showChanges} />
        </BoardCard>
        <BoardCard
          order={6}
          title="사용 재료"
          right={
            <Tooltip label="전체 삭제" placement="top">
              <IconButton
                size="xs"
                aria-label="clearInventory"
                variant="ghost"
                colorScheme="red"
                icon={<LuTrash2 size={16} />}
                onClick={() => dispatch(clearMaterials(inventoryIndex))}
              />
            </Tooltip>
          }
        >
          <UsedMaterial inventoryIndex={inventoryIndex} />
        </BoardCard>
      </Stack>
      <Stack w={{ base: "100vw", md: "auto" }}>
        <BoardCard order={7} title="실행">
          <Execute
            inventoryIndex={inventoryIndex}
            materialType={materialType}
          />
        </BoardCard>
      </Stack>
    </>
  );
}
