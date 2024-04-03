import { IconButton, Tooltip } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteButton({
  modeOn,
  onClick,
}: {
  modeOn: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip label="삭제 모드">
      <IconButton
        aria-label="delete-mode"
        variant={modeOn ? undefined : "ghost"}
        size="xs"
        colorScheme="red"
        icon={<FiTrash2 size={16} />}
        onClick={onClick}
      />
    </Tooltip>
  );
}
