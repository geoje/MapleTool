import {
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../reducer/hooks";
import { spliceUserBossPlan } from "../../../reducer/userSlice";

export default function PlanModal({
  isOpen,
  onClose,
  bossPlanIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  bossPlanIndex: number;
}) {
  const dispatch = useAppDispatch();
  const bossPlan = useAppSelector((state) => state.user.bossPlan);

  const [name, setName] = useState(
    bossPlanIndex > 0 && bossPlanIndex < bossPlan.length
      ? bossPlan[bossPlanIndex].name
      : ""
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pr={24}>
          <Editable
            placeholder="캐릭터 이름"
            opacity={name.length ? 1 : 0.4}
            onChange={setName}
            value={name}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </ModalHeader>
        <ModalDeleteButton
          onClick={() => {
            dispatch(spliceUserBossPlan(bossPlanIndex));
          }}
        />
        <ModalCloseButton />
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
}

function ModalDeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      aria-label="delete"
      variant="ghost"
      icon={<FiTrash2 />}
      size="sm"
      position="absolute"
      colorScheme="red"
      top={2}
      right={12}
      onClick={onClick}
    />
  );
}
