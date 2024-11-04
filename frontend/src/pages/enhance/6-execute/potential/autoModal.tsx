import {
  Badge,
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
  SingleValue,
} from "chakra-react-select";
import ConditionInfos from "../../../../types/character/itemEquipment/potential/conditionInfos";
import { useMemo } from "react";
import { calcConditionInfos } from "../../../../services/enhance/potentialCondition";
import { getPotentialIcon } from "../../../../services/enhance/potential";
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
  const conditionInfos = useMemo(
    () => calcConditionInfos(potentialInfos),
    [potentialInfos]
  );
  const selectOptions = useMemo(
    () => convertConditionInfosToSelectOptions(conditionInfos),
    [conditionInfos]
  );

  const components: SelectComponentsConfig<
    PotentialCondition,
    false,
    GroupBase<PotentialCondition>
  > = {
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

  const Row = ({
    title,
    conditions,
    onCreate,
    onUpdate,
  }: {
    title: string;
    conditions?: PotentialCondition[];
    onCreate?: (value: SingleValue<PotentialCondition>) => void;
    onUpdate?: (value: SingleValue<PotentialCondition>, index: number) => void;
  }) => (
    <Stack pb={4}>
      <Flex justify="space-between" align="center">
        <Badge>{title}</Badge>
        {title.endsWith("추가") || (
          <Button size="xs" variant="ghost">
            삭제
          </Button>
        )}
      </Flex>
      {conditions?.map((condition, i) => (
        <Select
          size="sm"
          components={components}
          options={selectOptions}
          value={condition}
          onChange={onUpdate ? (value) => onUpdate(value, i) : undefined}
        />
      ))}
      {(conditions?.length ?? 0 < MAX_POTENTIALS) && (
        <Select
          size="sm"
          components={components}
          options={selectOptions}
          onChange={onCreate}
        />
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
              title={"옵센세트 " + i}
              conditions={conditions}
              onUpdate={(newCondition, index) => {
                if (!newCondition) return;
                const temp = [...conditionGrid];
                temp[i][index] = newCondition;
                setConditionGrid(temp);
              }}
            />
          ))}
          {
            <Row
              title={"옵션세트 추가"}
              onCreate={(newCondition) => {
                if (!newCondition) return;
                const temp = [...conditionGrid];
                temp.push([newCondition]);
                setConditionGrid(temp);
              }}
            />
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function convertConditionInfosToSelectOptions(conditionInfos: ConditionInfos) {
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
