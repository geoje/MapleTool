import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  Spinner,
  useEditableControls,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import CharacterService from "../../../../service/character/character";
import { AxiosError } from "axios";

export default function NameEditable({
  name,
  onNameChanged,
  onImageReceived,
}: {
  name: string;
  onNameChanged: (name: string) => void;
  onImageReceived: (image: string) => void;
}) {
  const toast = useToast();
  const [currentName, setCurrentName] = useState(name);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    setCurrentName(name);
  }, [name]);

  // Copied from src/content/home/page.tsx:80
  function onCharacterNameSubmit() {
    onNameChanged(currentName.trim());
    if (currentName.trim() == "") {
      onImageReceived("");
      return;
    }
    setRequesting(true);

    CharacterService.requestBasic(currentName)
      .then((basic) => {
        onImageReceived(basic.character_image);
        toast({
          position: "top-right",
          status: "success",
          title: "캐릭터 이미지 등록됨",
          description: basic.character_name,
          isClosable: true,
        });
      })
      .catch((reason: AxiosError) => {
        toast({
          position: "top-right",
          status: "error",
          title: `캐릭터 이미지 등록 실패 (${reason.message})`,
          description: Object(reason.response?.data).message,
          isClosable: true,
        });
      })
      .finally(() => setRequesting(false));
  }

  function EditableControls() {
    const { isEditing, getEditButtonProps } = useEditableControls();

    return requesting ? (
      <Spinner mt={2} size="xs" />
    ) : isEditing ? (
      <></>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="edit"
          size="sm"
          icon={<FiEdit />}
          variant="ghost"
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Editable
      as={Flex}
      gap={2}
      align="center"
      textAlign="center"
      placeholder="캐릭터 이름"
      value={currentName}
      onChange={setCurrentName}
      onSubmit={onCharacterNameSubmit}
    >
      <EditablePreview opacity={name ? 1 : 0.4} />
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
  );
}
