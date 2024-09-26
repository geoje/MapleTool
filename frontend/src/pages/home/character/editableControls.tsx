import {
  ButtonGroup,
  IconButton,
  Spinner,
  Tooltip,
  useEditableControls,
} from "@chakra-ui/react";
import { CgCheckO, CgCloseR, CgRename, CgTrash } from "react-icons/cg";
import { useAppSelector } from "../../../stores/hooks";

export default function EditableControls({
  requesting,
  onCharacterDelete,
}: {
  requesting: boolean;
  onCharacterDelete: () => void;
}) {
  const characterBasic = useAppSelector((state) => state.character.basic);

  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return requesting ? (
    <Spinner mt={2} size="lg" />
  ) : isEditing ? (
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
  ) : (
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
      {characterBasic?.character_name && (
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
