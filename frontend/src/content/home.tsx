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
import {
  MdEdit,
  MdDelete,
  MdClose,
  MdCheck,
  MdInfo,
  MdCheckCircle,
} from "react-icons/md";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../reducer/hooks";
import CharacterService from "../service/character";
import { setCharacterBasic } from "../reducer/characterSlice";

export default function Home() {
  const toast = useToast();
  const characterBasic = useAppSelector((state) => state.character.basic);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if is empty
    if (
      characterBasic.character_name == null ||
      characterBasic.character_name.trim() == ""
    ) {
      return;
    }

    // Use cached character`
    if (CharacterService.isYesterday(characterBasic)) {
      return;
    }

    // Request new character data
    CharacterService.getByName(characterBasic.character_name)
      .then((basic) => {
        dispatch(setCharacterBasic(basic));
        toast({
          position: "top-right",
          status: "success",
          title: "캐릭터 갱신됨",
          description: basic.character_name,
          isClosable: true,
        });
      })
      .catch((reason: AxiosError) => {
        toast({
          position: "top-right",
          status: "error",
          title: `캐릭터 갱신 실패 (${reason.message})`,
          description: Object(reason.response?.data).message,
          isClosable: true,
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <ButtonGroup justifyContent="center" pt={1}>
        <IconButton
          aria-label="edit"
          icon={<MdEdit />}
          variant="ghost"
          {...getEditButtonProps()}
        />
        {characterBasic.character_name && (
          <IconButton
            aria-label="delete"
            icon={<MdDelete />}
            variant="ghost"
            colorScheme="red"
            onClick={onCharacterDelete}
          />
        )}
      </ButtonGroup>
    );
  }
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

    CharacterService.getByName(name)
      .then((basic) => {
        dispatch(setCharacterBasic(basic));
        toast({
          position: "top-right",
          status: "success",
          title: "캐릭터 등록됨",
          description: basic.character_name,
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
      });
  }
  function onCharacterDelete() {
    dispatch(setCharacterBasic({}));
  }

  return (
    <Stack justify="start" align="center" p={4}>
      {characterBasic.character_name ? <AlertUsage /> : <AlertHello />}
      <Card mt={8} w={336}>
        <CardBody>
          <Flex justify="center">
            <Image
              width={2 * 96}
              src={
                characterBasic.character_image ??
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
            defaultValue={characterBasic.character_name}
            onSubmit={onCharacterNameSubmit}
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

function AlertHello() {
  return (
    <Alert status="info" variant="left-accent" gap={2}>
      <MdInfo />
      캐릭터를 등록하고 다양한 서비스를 이용해보세요
    </Alert>
  );
}

function AlertUsage() {
  return (
    <Alert status="success" variant="left-accent" gap={2}>
      <MdCheckCircle />
      좌측 또는 모바일일 경우 상단 메뉴 버튼을 누른 후 서비스를 선택하여
      이용하실 수 있습니다
    </Alert>
  );
}
