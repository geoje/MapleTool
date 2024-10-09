import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  Spinner,
  useEditableControls,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { useBasicQuery } from "../../../../stores/characterApi";
import { useSuccessToast } from "../../../../hooks/useToast";

export default function NameEditable({
  name,
  onNameChanged,
  onImageReceived,
}: {
  name: string;
  onNameChanged: (name: string) => void;
  onImageReceived: (image: string) => void;
}) {
  const toastSuccess = useSuccessToast();
  const { data, isFetching, isSuccess } = useBasicQuery(name, {
    skip: !name,
  });

  useEffect(() => {
    if (!isSuccess || !data) return;

    onImageReceived(data?.character_image);
    toastSuccess({
      title: "이미지 등록됨",
      description: name,
    });
  }, [isSuccess]);

  function EditableControls() {
    const { isEditing, getEditButtonProps } = useEditableControls();

    return isFetching ? (
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
      placeholder="캐릭터명"
      defaultValue={name}
      onSubmit={onNameChanged}
    >
      <EditablePreview opacity={name ? 1 : 0.4} />
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
  );
}
