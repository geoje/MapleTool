import {
  Alert,
  ButtonGroup,
  Card,
  CardBody,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Image,
  Input,
  Stack,
  useEditableControls,
} from "@chakra-ui/react";
import { MdEdit, MdClose, MdCheck, MdInfo } from "react-icons/md";
import Character from "../model/character";
import { KEY_CHARACTER } from "../constant";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../reducer/hooks";
import { setCharacter } from "../reducer/characterSlice";

export default function Home() {
  const toast = useToast();
  const characterBasic = useAppSelector((state) => state.character.basic);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const json = JSON.parse(localStorage.getItem(KEY_CHARACTER) ?? "{}");
    const tempCharacter: Character = Object.assign(new Character(), json);

    // Check if is empty
    if (
      characterBasic.character_name == null ||
      characterBasic.character_name == ""
    ) {
      return;
    }

    const characterDate = tempCharacter.parsedDate();
    const todayDate = new Date();

    // Use cache as character
    if (characterDate.setHours(0, 0, 0, 0) == todayDate.setHours(0, 0, 0, 0)) {
      dispatch(setCharacter(tempCharacter));
      return;
    }

    // Request new character data
    Character.getByName(characterBasic.character_name).then((cha) =>
      dispatch(setCharacter(cha))
    );
  }, []);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" pt={2}>
        <IconButton
          aria-label="submit"
          icon={<MdCheck />}
          variant="ghost"
          colorScheme="green"
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="cancel"
          icon={<MdClose />}
          variant="ghost"
          colorScheme="red"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center" pt={1}>
        <IconButton
          aria-label="edit"
          icon={<MdEdit />}
          variant="ghost"
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Stack justify="start" align="center" p={4}>
      {characterBasic.character_name?.trim() == null && (
        <Alert status="info" variant="left-accent" gap={2}>
          <MdInfo />
          캐릭터를 등록하고 다양한 서비스를 이용해보세요
        </Alert>
      )}
      <Card mt={8} w={336}>
        <CardBody>
          <Flex justify="center">
            <Image
              width={2 * 96}
              src={
                characterBasic.character_image ||
                "/union-raid/character-blank.png"
              }
              filter={
                characterBasic.character_image
                  ? undefined
                  : "opacity(0.2) drop-shadow(0 0 0 #000000);"
              }
              style={{ imageRendering: "pixelated" }}
            />
          </Flex>
          <Editable
            textAlign="center"
            fontSize="2xl"
            placeholder="캐릭터 이름"
            onSubmit={(name) => {
              if (name.trim() == "") {
                toast({
                  position: "top-right",
                  status: "warning",
                  description: "캐릭터 이름은 공백일 수 없습니다.",
                  isClosable: true,
                });
                return;
              }

              Character.getByName(name)
                .then((character) => {
                  localStorage.setItem(
                    KEY_CHARACTER,
                    JSON.stringify(character)
                  );
                  dispatch(setCharacter(character));
                  toast({
                    position: "top-right",
                    status: "success",
                    title: "캐릭터 등록됨",
                    description: character.character_name,
                    isClosable: true,
                  });
                })
                .catch((reason: AxiosError) => {
                  toast({
                    position: "top-right",
                    status: "error",
                    title: `캐릭터 등록 실패 (${reason.message})`,
                    description: Object(reason.response?.data).message,
                    isClosable: true,
                  });
                  dispatch(setCharacter(new Character()));
                });
            }}
          >
            <EditablePreview />
            <Input as={EditableInput} fontSize="2xl" maxLength={12} />
            <br />
            <EditableControls />
          </Editable>
        </CardBody>
      </Card>
    </Stack>
  );
}
