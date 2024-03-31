import { Stack, useToast } from "@chakra-ui/react";
import BoardCard from "../../components/boardCard";
import { useAppDispatch, useAppSelector } from "../../reducer/hooks";
import CharacterService from "../../service/character/character";
import { useEffect, useState } from "react";
import { setCharacterItemEquipment } from "../../reducer/characterSlice";
import { AxiosError } from "axios";
import DateUtil from "../../util/date";
import SelectPreset from "../potential/import/selectPreset";
import ImportItem from "../potential/importItem";
import SelectItem from "../potential/selectItem";

export default function Starforce() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const characterBasic = useAppSelector((state) => state.character.basic);
  const characterItemEquipment = useAppSelector(
    (state) => state.character.itemEquipment
  );

  const [preset, setPreset] = useState(1);

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
        <BoardCard order={2} title="장비 선택">
          <SelectItem />
        </BoardCard>
      </Stack>
      <Stack>
        <BoardCard order={3} title="스타포스 강화"></BoardCard>
      </Stack>
    </>
  );
}
