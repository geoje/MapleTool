import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../reducer/hooks";
import { spliceUserBossPlan } from "../../../reducer/userSlice";
import { BOSS } from "../../../service/user/crystal/bossConstants";

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
        <ModalBody>
          <SimpleGrid columns={2} gap={2}>
            {Object.entries(BOSS).map(([_, boss]) => (
              <>
                <Flex gap={2}>
                  <Image src={boss.icon} />
                  <Text>{boss.name}</Text>
                </Flex>
                <Flex></Flex>
              </>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function ModalDeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <Tooltip label="캐릭터 삭제">
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
    </Tooltip>
  );
}
