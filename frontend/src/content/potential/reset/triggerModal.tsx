import {
  Badge,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import PotentialService from "../../../service/character/itemEquipment/potential";
import { useEffect, useState } from "react";
import PotentialSummantion from "../../../dto/character/itemEquipment/potentialSummation";
import { MAX_POTENTIAL_COUNT } from "../../../service/character/itemEquipment/potentialConst";

export default function TriggerModal({
  isOpen,
  onClose,
  title,
  part,
  grade,
  level,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  part: string;
  grade: string;
  level: number;
}) {
  const [summantions, setSummantions] = useState<PotentialSummantion[]>([]);
  const [potentialGrid, setPotentialGrid] = useState<
    { name: string; value: number }[][]
  >([]);

  useEffect(() => {
    PotentialService.getSummantions(part, grade, level).then(setSummantions);
  }, [part, grade, level]);

  const uniquePotentialNames = [
    ...new Set(summantions.map((summantion) => summantion.name)),
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title} 트리거</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text></Text>
          {[...potentialGrid, []].map((potentials, i) => {
            return (
              <Stack>
                <Flex justify="space-between" align="center">
                  <Badge size="lg">옵션세트 {i + 1}</Badge>
                  <Button size="xs" variant="ghost">
                    삭제
                  </Button>
                </Flex>
                {potentials.map((p, j) => (
                  <Flex>
                    <Select size="sm">
                      <option></option>
                      {summantions.map((summantion) => (
                        <option value={summantion.name}>
                          {summantion.name}
                        </option>
                      ))}
                    </Select>
                    <Select width={20} size="sm">
                      <option></option>
                      {summantions
                        .filter((summantion) => summantion.name == p.name)
                        .map((summantion) => (
                          <option value={summantion.value}>
                            {summantion.value}
                          </option>
                        ))}
                    </Select>
                  </Flex>
                ))}
                {new Array(MAX_POTENTIAL_COUNT - potentials.length)
                  .fill(1)
                  .map((_, j) => (
                    <Flex gap={2}>
                      <Select size="sm" disabled={j > 0} onChange={console.log}>
                        <option></option>
                        {uniquePotentialNames.map((name) => (
                          <option value={name}>{name}</option>
                        ))}
                      </Select>
                      <Select width={20} size="sm" disabled={j > 0}>
                        <option></option>
                      </Select>
                    </Flex>
                  ))}
              </Stack>
            );
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
