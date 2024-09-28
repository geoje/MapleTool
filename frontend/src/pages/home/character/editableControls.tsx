import {
  ButtonGroup,
  IconButton,
  Spinner,
  Tooltip,
  useEditableControls,
} from "@chakra-ui/react";
import { CgCheckO, CgCloseR, CgRename, CgTrash } from "react-icons/cg";

export default function EditableControls({
  isLoading,
  existName,
  onCharacterDelete,
}: {
  isLoading?: boolean;
  existName?: boolean;
  onCharacterDelete?: () => void;
}) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  if (isLoading) {
    return <Spinner mt={2} size="lg" />;
  }

  if (isEditing) {
    return (
      <ButtonGroup justifyContent="center">
        <IconButton
          aria-label="submit"
          icon={<CgCheckO />}
          variant="ghost"
          colorScheme="green"
          size="lg"
          {...getSubmitButtonProps()}
        />

        <IconButton
          aria-label="cancel"
          icon={<CgCloseR />}
          variant="ghost"
          colorScheme="red"
          size="lg"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup justifyContent="center">
      <Tooltip label="변경">
        <IconButton
          aria-label="edit"
          icon={<CgRename />}
          variant="ghost"
          colorScheme="gray"
          size="lg"
          {...getEditButtonProps()}
        />
      </Tooltip>
      {existName && (
        <Tooltip label="삭제">
          <IconButton
            aria-label="delete"
            icon={<CgTrash />}
            variant="ghost"
            colorScheme="red"
            size="lg"
            onClick={onCharacterDelete}
          />
        </Tooltip>
      )}
    </ButtonGroup>
  );
}
