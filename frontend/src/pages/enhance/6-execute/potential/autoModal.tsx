import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import PotentialResponse from "../../../../types/character/itemEquipment/potential/potentialResponse";
import {
  MAX_POTENTIALS,
  POTENTIAL_GRADE,
} from "../../../../constants/enhance/potential";
import {
  Select,
  chakraComponents,
  GroupBase,
  SelectComponentsConfig,
} from "chakra-react-select";
import ConditionInfos from "../../../../types/character/itemEquipment/potential/conditionInfos";
import { useMemo } from "react";
import {
  calcConditionInfos,
  calcExpectedCountByConditions,
} from "../../../../services/enhance/potentialCondition";
import { getPotentialIcon } from "../../../../services/enhance/potential";
import PotentialCondition from "../../../../types/character/itemEquipment/potential/potentialCondition";

interface Option {
  label: string;
  value: string;
  grades: Set<string>;
}

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
  const conditionInfos = useMemo(
    () => calcConditionInfos(potentialInfos),
    [potentialInfos]
  );
  const selectOptions = useMemo(
    () => convertConditionInfosToSelectOptions(conditionInfos),
    [conditionInfos]
  );

  const components: SelectComponentsConfig<Option, false, GroupBase<Option>> = {
    Option: ({ children, ...props }) => (
      <chakraComponents.Option {...props}>
        {children}
        <Spacer />
        {[...props.data.grades].map((grade) => (
          <Image key={grade} src={getPotentialIcon(grade)} />
        ))}
      </chakraComponents.Option>
    ),
  };

  const onChange = (
    newCondition?: PotentialCondition,
    setIndex?: number,
    optionIndex?: number
  ) => {
    const temp = [...conditionGrid];

    if (!newCondition) {
      if (setIndex != undefined && optionIndex != undefined) {
        temp[setIndex].splice(optionIndex, 1);
        setConditionGrid(temp);
      }
      return;
    }

    if (setIndex == undefined) temp.push([newCondition]);
    else if (optionIndex == undefined) temp[setIndex].push(newCondition);
    else temp[setIndex][optionIndex] = newCondition;

    setConditionGrid(temp);
  };

  const Row = ({
    title,
    conditions,
    onCreate,
    onUpdate,
  }: {
    title: string;
    conditions?: PotentialCondition[];
    onCreate?: (value: PotentialCondition) => void;
    onUpdate?: (value: PotentialCondition | undefined, index: number) => void;
  }) => (
    <Stack pb={4}>
      <Flex justify="space-between" align="center">
        <Badge>{title}</Badge>
        {(() => {
          calcExpectedCountByConditions(conditionInfos, conditions ?? []);
          return <Text>test</Text>;
        })()}
        {title.endsWith("추가") || (
          <Button size="xs" variant="ghost">
            삭제
          </Button>
        )}
      </Flex>
      {conditions?.map((condition, i) => (
        <Flex key={"condition-" + i} gap={2}>
          <Box flex={1}>
            <Select
              size="sm"
              components={components}
              value={{
                label: condition.name,
                value: condition.name,
                grades: condition.grades,
              }}
              options={selectOptions}
              onChange={(option) => {
                if (!onUpdate) return;
                if (!option) {
                  onUpdate(undefined, i);
                  return;
                }

                const infosByName = conditionInfos[option.label];
                const value = Number(Object.keys(infosByName)[0]);
                const grades = new Set(Object.keys(infosByName[value]));

                onUpdate({ name: option.label, value, grades }, i);
              }}
              isClearable
            />
          </Box>
          <Box w={24}>
            <Select
              size="sm"
              placeholder=""
              components={components}
              value={{
                label: condition.value.toString(),
                value: condition.value.toString(),
                grades: new Set(
                  Object.keys(conditionInfos[condition.name][condition.value])
                ),
              }}
              options={Object.entries(conditionInfos[condition.name]).map(
                ([value, infosByValue]) => ({
                  label: value,
                  value,
                  grades: new Set(Object.keys(infosByValue)),
                })
              )}
              onChange={(option) => {
                if (!onUpdate || !option) return;
                const infosByName = conditionInfos[condition.name];
                const value = Number(option.value);
                const grades = new Set(Object.keys(infosByName[value]));

                onUpdate({ name: condition.name, value, grades }, i);
              }}
            />
          </Box>
        </Flex>
      ))}
      {(conditions?.length ?? 0) < MAX_POTENTIALS && (
        <Flex gap={2}>
          <Box flex={1}>
            <Select
              size="sm"
              components={components}
              options={selectOptions}
              onChange={(option) => {
                if (!onCreate || !option) return;
                const infosByName = conditionInfos[option.label];
                const value = Number(Object.keys(infosByName)[0]);
                const grades = new Set(Object.keys(infosByName[value]));

                onCreate({ name: option.label, value, grades });
              }}
            />
          </Box>
          <Box w={24}>
            <Select size="sm" placeholder="" components={components} />
          </Box>
        </Flex>
      )}
    </Stack>
  );

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
            <Row
              key={"conditions-" + i}
              title={"옵션세트 " + i}
              conditions={conditions}
              onUpdate={(newCondition, index) =>
                onChange(newCondition, i, index)
              }
              onCreate={(newCondition) => onChange(newCondition, i)}
            />
          ))}
          {
            <Row
              title={"옵션세트 추가"}
              onCreate={(newCondition) => onChange(newCondition)}
            />
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function convertConditionInfosToSelectOptions(
  conditionInfos: ConditionInfos
): Option[] {
  return Object.entries(conditionInfos).map(([name, infosByName]) => ({
    label: name,
    value: name,
    grades: Object.values(infosByName).reduce<Set<string>>(
      (acc, infosByValue) => {
        Object.keys(infosByValue).forEach((grade) => acc.add(grade));
        return acc;
      },
      new Set<string>()
    ),
  }));
}
