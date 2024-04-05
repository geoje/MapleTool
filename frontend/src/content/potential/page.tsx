import {
  Badge,
  Flex,
  Stack,
  UseToastOptions,
  useToast,
} from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import ImportItem from "./importItem";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import CharacterService from "../../service/character/character";
import { useEffect, useState } from "react";
import { setCharacterItemEquipment } from "../../reducer/characterSlice";
import { AxiosError } from "axios";
import DateUtil from "../../util/date";
import SelectPreset from "./import/selectPreset";
import SelectItem from "./selectItem";
import potentialProbability from "../../dto/character/itemEquipment/potentialProbability";
import DeleteButton from "./select/deleteButton";
import { spliceUserInventory } from "../../reducer/userSlice";
import { CharacterItemEquipmentDetail } from "../../dto/character/characterItemEquipment";
import ResetPotential from "./resetPotential";

export default function Potential() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const characterBasic = useAppSelector((state) => state.character.basic);
  const characterItemEquipment = useAppSelector(
    (state) => state.character.itemEquipment
  );
  const inventory = useAppSelector((state) => state.user.inventory);

  const [preset, setPreset] = useState(1);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [probabilities, setProbabilities] = useState<potentialProbability[]>(
    []
  );

  useEffect(() => {
    // Check character name
    if (
      characterBasic?.character_name == null ||
      characterBasic.character_name.trim() == ""
    ) {
      return;
    }

    // Request if empty
    if (characterItemEquipment == null) {
      CharacterService.requestItemEquipment(characterBasic.character_name)
        .then((itemEquipment) => {
          dispatch(setCharacterItemEquipment(itemEquipment));
          toast({
            position: "top-right",
            status: "success",
            title: "캐릭터 장비 등록됨",
            description: characterBasic.character_name,
            isClosable: true,
          });
        })
        .catch((reason: AxiosError) => {
          toast({
            position: "top-right",
            status: "error",
            title: `캐릭터 장비 등록 실패 (${reason.message})`,
            description: Object(reason.response?.data).message,
            isClosable: true,
          });
        });
      return;
    }

    // Use cached
    if (DateUtil.isYesterday(characterItemEquipment)) {
      return;
    }

    // Request new data
    CharacterService.requestItemEquipment(characterBasic.character_name)
      .then((itemEquipment) => {
        if (
          DateUtil.compare(characterItemEquipment.date, itemEquipment.date) >= 0
        )
          return;
        dispatch(setCharacterItemEquipment(itemEquipment));
        toast({
          position: "top-right",
          status: "success",
          title: "캐릭터 장비 갱신됨",
          description: characterBasic.character_name,
          isClosable: true,
        });
      })
      .catch((reason: AxiosError) => {
        toast({
          position: "top-right",
          status: "warning",
          title: `캐릭터 장비 갱신 실패 (${reason.message})`,
          description: Object(reason.response?.data).message,
          isClosable: true,
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack>
        <BoardCard
          order={1}
          title="장비 가져오기"
          right={<SelectPreset preset={preset} onChange={setPreset} />}
        >
          <ImportItem
            characterItemEquipment={characterItemEquipment}
            preset={preset}
          />
        </BoardCard>
        <BoardCard
          order={2}
          title="장비 선택"
          right={
            <DeleteButton
              modeOn={deleteMode}
              onClick={() => setDeleteMode(!deleteMode)}
            />
          }
        >
          <SelectItem
            selectedIndex={selectedIndex}
            deleteModeOn={deleteMode}
            onSelect={(index) => {
              setSelectedIndex(index);
              requestPotentialProbabilities(
                inventory[index],
                setProbabilities,
                toast
              );
            }}
            onSelectedSelect={() => setSelectedIndex(-1)}
            onDelete={(index) => {
              if (index == selectedIndex) setSelectedIndex(-1);
              else if (index < selectedIndex)
                setSelectedIndex(selectedIndex - 1);
              dispatch(spliceUserInventory(index));
            }}
          />
        </BoardCard>
      </Stack>
      <Stack>
        <BoardCard order={3} title="잠재능력 재설정">
          <ResetPotential itemIndex={selectedIndex} />
        </BoardCard>
      </Stack>
      <Stack>
        <BoardCard order={4} title="에디셔널 잠재능력 재설정"></BoardCard>
      </Stack>
    </>
  );
}

function requestPotentialProbabilities(
  item: CharacterItemEquipmentDetail,
  setPotentials: (potentials: potentialProbability[]) => void,
  onErrorToast: (options?: UseToastOptions | undefined) => void
) {
  CharacterService.requestPotential(
    item.item_equipment_part,
    item.potential_option_grade,
    item.item_base_option.base_equipment_level
  )
    .then((potentials) => setPotentials(potentials))
    .catch((reason) =>
      onErrorToast({
        position: "top-right",
        status: "warning",
        title: `잠재능력 확률 데이터 요청 실패 (${reason.message})`,
        description: Object(reason.response?.data).message,
        isClosable: true,
      })
    );
}
