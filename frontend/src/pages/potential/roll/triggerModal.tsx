import {
  Alert,
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
} from "@chakra-ui/react";
import PotentialService from "../../../service/character/itemEquipment/potential";
import { useEffect, useState } from "react";
import PotentialSummantion from "../../../types/character/itemEquipment/potentialSummation";
import { MAX_POTENTIAL_COUNT } from "../../../service/character/itemEquipment/potentialConst";
import { MdInfo } from "react-icons/md";

export default function TriggerModal({
  isOpen,
  onClose,
  title,
  getSummantions,
  setConditions,
  part,
  grade,
  level,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  getSummantions: (
    part: string,
    grade: string,
    level: number
  ) => Promise<PotentialSummantion[]>;
  setConditions: (conditions: PotentialSummantion[][]) => void;
  part: string;
  grade: string;
  level: number;
}) {
  const [summantions, setSummantions] = useState<PotentialSummantion[]>([]);
  const [potentialGrid, setPotentialGrid] = useState<
    { name: string; value: number }[][]
  >([]);

  useEffect(() => {
    setPotentialGrid([]);

    if (!part || !grade || !level) {
      setSummantions([]);
      return;
    }

    getSummantions(part, grade, level).then(setSummantions);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [part, grade, level]);

  useEffect(() => {
    setConditions(
      potentialGrid.map((potentials) =>
        convertPotentialsToSummantions(summantions, potentials)
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [potentialGrid]);

  const uniquePotentialNames = [
    ...new Set(summantions.map((summantion) => summantion.name)),
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title} 트리거</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert variant="left-accent" mb={4} gap={2}>
            <MdInfo />
            지정한 옵션세트 중 하나가 나올 때까지 자동으로 재설정합니다.
          </Alert>
          {[...potentialGrid, []].map((potentials, i) => (
            <Stack key={"potentials-" + title + i} pb={4}>
              <Flex align="center">
                <Badge
                  mr="auto"
                  colorScheme={
                    summantions.length && potentials.length
                      ? PotentialService.isCompatibleSummantions(
                          convertPotentialsToSummantions(
                            summantions,
                            potentials
                          )
                        )
                        ? "green"
                        : "red"
                      : undefined
                  }
                >
                  옵션세트 {i + 1}
                </Badge>
                {potentials.length ? (
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => {
                      const temp = [...potentialGrid];
                      temp.splice(i, 1);
                      setPotentialGrid(temp);
                    }}
                  >
                    삭제
                  </Button>
                ) : undefined}
              </Flex>
              {potentials.map((p, j) => (
                <Flex key={"potential-" + i + j} gap={2}>
                  <Select
                    size="sm"
                    value={p.name}
                    onChange={(event) => {
                      const temp = [...potentialGrid];
                      if (event.target.value) {
                        const defaultValue = summantions
                          .filter((s) => s.name == p.name)
                          .map((s) => s.value)
                          .sort((a, b) => a - b)[0];
                        temp[i][j] = {
                          name: event.target.value,
                          value: defaultValue,
                        };
                      } else {
                        temp[i].splice(j, 1);
                      }
                      setPotentialGrid(temp);
                    }}
                  >
                    <option></option>
                    {uniquePotentialNames.map((name, k) => (
                      <option
                        key={"option-" + k}
                        value={name}
                        disabled={potentials.some((p2) => p2.name == name)}
                      >
                        {name}
                      </option>
                    ))}
                  </Select>
                  <Select
                    width={32}
                    size="sm"
                    value={potentialGrid[i][j].value}
                    onChange={(event) => {
                      const value = parseInt(event.target.value);
                      const temp = [...potentialGrid];
                      temp[i][j].value = value;

                      setPotentialGrid(temp);
                    }}
                  >
                    {summantions
                      .filter((s) => s.name == p.name)
                      .map((s) => s.value)
                      .sort((a, b) => a - b)
                      .map((value, k) => (
                        <option key={"option-" + k} value={value}>
                          {value}
                        </option>
                      ))}
                  </Select>
                </Flex>
              ))}
              {new Array(MAX_POTENTIAL_COUNT - potentials.length)
                .fill(1)
                .map((_, j) => (
                  <Flex key={"new-potential-" + i + j} gap={2}>
                    <Select
                      size="sm"
                      disabled={j > 0}
                      value=""
                      onChange={(event) => {
                        const name = event.target.value;
                        if (!name) return;

                        const temp = [...potentialGrid];
                        const defaultValue = summantions
                          .filter((s) => s.name == name)
                          .map((s) => s.value)
                          .sort((a, b) => a - b)[0];
                        const potential = { name, value: defaultValue };
                        if (potentials.length == 0) {
                          temp.push([potential]);
                        } else {
                          temp[i].push(potential);
                        }
                        setPotentialGrid(temp);
                      }}
                    >
                      <option></option>
                      {uniquePotentialNames.map((name, k) => (
                        <option
                          key={"option-" + k}
                          value={name}
                          disabled={potentials.some((p2) => p2.name == name)}
                        >
                          {name}
                        </option>
                      ))}
                    </Select>
                    <Select width={32} size="sm" disabled={j > 0}></Select>
                  </Flex>
                ))}
            </Stack>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function convertPotentialsToSummantions(
  summantions: PotentialSummantion[],
  potentials: { name: string; value: number }[]
): PotentialSummantion[] {
  return potentials
    .map((p) => summantions.find((s) => s.name == p.name && s.value == p.value))
    .filter((p): p is PotentialSummantion => p !== undefined);
}
