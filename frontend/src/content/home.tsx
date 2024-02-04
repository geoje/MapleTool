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
import Character from "../service/character";
import { KEY_CHARACTER } from "../constant";
import { useEffect, useState } from "react";

export default function Home() {
  const [character, setCharacter] = useState<Character>(new Character());

  useEffect(() => {
    const json = JSON.parse(localStorage.getItem(KEY_CHARACTER) ?? "{}");
    const tempCharacter: Character = Object.assign(new Character(), json);

    // Check if is empty
    if (character.character_name == null || character.character_name == "") {
      return;
    }

    const characterDate = tempCharacter.parsedDate();
    const todayDate = new Date();

    // Use cache as character
    if (characterDate.setHours(0, 0, 0, 0) == todayDate.setHours(0, 0, 0, 0)) {
      setCharacter(tempCharacter);
      return;
    }

    // Request new character data
    Character.getByName(character.character_name).then(setCharacter);
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
      <Alert status="info" variant="left-accent" gap={2}>
        <MdInfo />
        캐릭터를 등록하고 다양한 서비스를 이용해보세요
      </Alert>
      <Card mt={8} w={336}>
        <CardBody>
          <Flex justify="center">
            <Image
              width={2 * 96}
              src={
                character.character_image || "/union-raid/character-blank.png"
              }
              filter={
                character.character_image
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
            onSubmit={async (name) => {
              const character = await Character.getByName(name);
              localStorage.setItem(KEY_CHARACTER, JSON.stringify(character));
              setCharacter(character);
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
