import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import PotentialResponse from "../../../../types/character/itemEquipment/potential/potentialResponse";
import { POTENTIAL_GRADE } from "../../../../constants/enhance/potential";
import PotentialCondition from "../../../../types/character/itemEquipment/potential/potentialCondition";

export default function AutoModal({
  isOpen,
  onClose,
  grade,
  potentialInfos,
  conditionGrid,
  setConditionGrid,
}: {
  isOpen: boolean;
  onClose: () => void;
  grade: POTENTIAL_GRADE;
  potentialInfos: PotentialResponse[];
  conditionGrid: PotentialCondition[][];
  setConditionGrid: (value: PotentialCondition[][]) => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>자동설정</Text>
          <Text pt={2} fontSize="sm" fontWeight="normal">
            지정한 옵션세트 중 하나라도 충족 할 때까지 자동으로 재설정합니다.
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {conditionGrid.map((conditions, i) => (
            <Stack key={"conditions-" + i} pb={4}></Stack>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
