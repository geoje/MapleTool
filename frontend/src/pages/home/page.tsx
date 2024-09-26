import {
  Card,
  CardBody,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Image,
  Input,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import CharacterService from "../../service/character/character";
import {
  setCharacterBasic,
  setCharacterItemEquipment,
} from "../../stores/characterSlice";
import { AlertHello, AlertUsage } from "./alert/alert";
import EditableControls from "./character/editableControls";
import {
  setUnionArtifact,
  setUnionBasic,
  setUnionRaider,
} from "../../stores/unionSlice";

export default function Home() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const characterBasic = useAppSelector((state) => state.character.basic);

  const [requesting, setRequesting] = useState(false);

  const clearData = () => {
    dispatch(setCharacterItemEquipment());
    dispatch(setUnionBasic());
    dispatch(setUnionArtifact());
    dispatch(setUnionRaider());
  };

  useEffect(() => {
    // Check if empty
    if (
      characterBasic?.character_name == null ||
      characterBasic.character_name.trim() == ""
    ) {
      return;
    }

    // Request new data
    CharacterService.requestBasic(characterBasic.character_name)
      .then((basic) => {
        dispatch(setCharacterBasic(basic));
        clearData();

        toast({
          position: "top-right",
          status: "success",
          title: "캐릭터 기본 정보 갱신됨",
          description: basic.character_name,
          isClosable: true,
        });
      })
      .catch((reason: AxiosError) => {
        toast({
          position: "top-right",
          status: "warning",
          title: `캐릭터 기본 정보 갱신 실패 (${reason.message})`,
          description: Object(reason.response?.data).message,
          isClosable: true,
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onCharacterNameSubmit(name: string) {
    if (name.trim() == "") {
      toast({
        position: "top-right",
        status: "warning",
        description: "캐릭터 이름은 공백일 수 없습니다.",
        isClosable: true,
      });
      return;
    }
    setRequesting(true);

    CharacterService.requestBasic(name)
      .then((basic) => {
        dispatch(setCharacterBasic(basic));
        toast({
          position: "top-right",
          status: "success",
          title: "캐릭터 기본 정보 등록됨",
          description: basic.character_name,
          isClosable: true,
        });
      })
      .catch((reason: AxiosError) => {
        toast({
          position: "top-right",
          status: "error",
          title: `캐릭터 기본 정보 등록 실패 (${reason.message})`,
          description: Object(reason.response?.data).message,
          isClosable: true,
        });
      })
      .finally(() => setRequesting(false));
  }

  return (
    <Stack width="100%" justify="start" align="center">
      {characterBasic?.character_name ? <AlertUsage /> : <AlertHello />}
      <Card mt={8} w={336}>
        <CardBody>
          <Flex justify="center">
            <Image
              width={2 * 96}
              src={
                characterBasic?.character_image ??
                "/union-raid/character-blank.png"
              }
              filter={
                characterBasic?.character_image
                  ? undefined
                  : "opacity(0.2) drop-shadow(0 0 0 #000000);"
              }
              style={{ imageRendering: "pixelated" }}
            />
          </Flex>
          <Editable
            textAlign="center"
            fontSize="2xl"
            pt={2}
            placeholder="캐릭터 이름"
            defaultValue={characterBasic?.character_name}
            onSubmit={onCharacterNameSubmit}
          >
            <EditablePreview
              opacity={characterBasic?.character_name ? 1 : 0.4}
              pt="3px"
              pb="1px"
            />
            <Input as={EditableInput} fontSize="2xl" maxLength={12} />
            <Spacer h={2} />
            <EditableControls
              requesting={requesting}
              onCharacterDelete={() => {
                dispatch(setCharacterBasic());
                clearData();
              }}
            />
          </Editable>
        </CardBody>
      </Card>
    </Stack>
  );
}
