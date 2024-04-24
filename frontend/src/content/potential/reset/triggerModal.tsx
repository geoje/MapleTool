import {
  Badge,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
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
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title} 트리거</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(4, 1fr)">
            {potentialGrid.map((potentials, i) => {
              return (
                <>
                  <GridItem>
                    <Badge size="lg">{i}</Badge>
                  </GridItem>
                  {potentials.map((p, j) => (
                    <GridItem>
                      <Flex gap={2}>
                        <Select onChange={console.log}>
                          {summantions.map((summantion) => (
                            <option value={summantion.name}>
                              {summantion.name}
                            </option>
                          ))}
                        </Select>
                        <Select>
                          {summantions
                            .filter((summantion) => summantion.name == p.name)
                            .map((summantion) => (
                              <option value={summantion.value}>
                                {summantion.value}
                              </option>
                            ))}
                        </Select>
                      </Flex>
                    </GridItem>
                  ))}
                  {new Array(MAX_POTENTIAL_COUNT - potentials.length)
                    .fill(0)
                    .map((_, j) => (
                      <GridItem></GridItem>
                    ))}
                </>
              );
            })}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
