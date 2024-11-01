import {
  Alert,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { MdInfo } from "react-icons/md";
import PotentialResponse from "../../../../types/character/itemEquipment/potential/potentialResponse";
import { POTENTIAL_GRADE } from "../../../../constants/enhance/potential";

export default function AutoModal({
  isOpen,
  onClose,
  grade,
  probabilities,
  conditionGrid,
  setConditionGrid,
}: {
  isOpen: boolean;
  onClose: () => void;
  grade: POTENTIAL_GRADE;
  probabilities: PotentialResponse[];
  conditionGrid: { name: string; value: number }[][];
  setConditionGrid: (
    conditionGrid: { name: string; value: number }[][]
  ) => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>자동설정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert variant="left-accent" mb={4} gap={2}>
            <MdInfo />
            지정한 옵션세트 중 하나라도 충족 할 때까지 자동으로 재설정합니다.
          </Alert>
          {conditionGrid.map((conditions, i) => (
            <Stack key={"conditions-" + i} pb={4}></Stack>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
