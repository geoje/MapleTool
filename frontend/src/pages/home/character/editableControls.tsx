import {
  ButtonGroup,
  IconButton,
  Spinner,
  Tooltip,
  useEditableControls,
} from "@chakra-ui/react";
import { CgCheckO, CgCloseR, CgRedo, CgRename, CgTrash } from "react-icons/cg";

export default function EditableControls({
  isLoading,
  existName,
  onRefetchClick,
  onDeleteClick,
}: {
  isLoading?: boolean;
  existName?: boolean;
  onRefetchClick?: () => void;
  onDeleteClick?: () => void;
}) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  if (isLoading) {
    return <Spinner mt={2} />;
  }

  if (isEditing) {
    return (
      <ButtonGroup justifyContent="center">
        <IconButton
          aria-label="submit"
          icon={<CgCheckO />}
          variant="ghost"
          colorScheme="green"
          {...getSubmitButtonProps()}
        />

        <IconButton
          aria-label="cancel"
          icon={<CgCloseR />}
          variant="ghost"
          colorScheme="red"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup justifyContent="center">
      <Tooltip label="변경" placement="top">
        <IconButton
          aria-label="edit"
          icon={<CgRename />}
          variant="ghost"
          {...getEditButtonProps()}
        />
      </Tooltip>
      {existName && (
        <>
          <Tooltip label="갱신" placement="top">
            <IconButton
              aria-label="refetch"
              icon={<CgRedo />}
              variant="ghost"
              onClick={onRefetchClick}
            />
          </Tooltip>
          <Tooltip label="삭제" placement="top">
            <IconButton
              aria-label="delete"
              icon={<CgTrash />}
              variant="ghost"
              colorScheme="red"
              onClick={onDeleteClick}
            />
          </Tooltip>
        </>
      )}
    </ButtonGroup>
  );
}
