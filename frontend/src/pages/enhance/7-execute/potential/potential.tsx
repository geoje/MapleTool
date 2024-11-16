import {
  Badge,
  Button,
  Flex,
  Image,
  Stack,
  Tag,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MATERIAL_INFOS,
  MATERIAL_TYPE,
} from "../../../../constants/enhance/material";
import { useAppDispatch, useAppSelector } from "../../../../stores/hooks";
import OptionsButton from "../common/optionButton";
import { useEffect, useRef, useState } from "react";
import {
  MAX_POTENTIALS,
  POTENTIAL_CRITERIA,
  POTENTIAL_GRADE,
  POTENTIAL_INFOS,
} from "../../../../constants/enhance/potential";
import {
  calcRollingMaterials,
  formatOptions,
  getOptions,
  isAddi,
  isSelectable,
  nextPotential,
  parseGrade,
} from "../../../../services/enhance/potential";
import {
  addMaterials,
  setGuarantee,
  setInventoryPotential,
} from "../../../../stores/userSlice";
import { formatNumber } from "../../../../utils/formatter";
import MESO from "../../../../assets/item/meso/coin.png";
import { usePotentialQuery } from "../../../../stores/characterApi";
import {
  useInfoToast,
  useSuccessToast,
  useWarningToast,
} from "../../../../hooks/useToast";
import PotentialResponse from "../../../../types/character/itemEquipment/potential/potentialResponse";
import AutoModal from "./autoModal";
import PotentialCondition from "../../../../types/character/itemEquipment/potential/potentialCondition";
import { FaPlay, FaStop } from "react-icons/fa6";
import { isFitConditions } from "../../../../services/enhance/potentialCondition";
import ItemSlot from "../common/itemSlot";

const AUTO_DELAY = 100;

export default function Potential({
  inventoryIndex,
  materialType,
}: {
  inventoryIndex: number;
  materialType: MATERIAL_TYPE;
}) {
  const dispatch = useAppDispatch();
  const dark = useColorMode().colorMode == "dark";
  const toastWarning = useWarningToast();
  const toastSuccess = useSuccessToast();
  const toastInfo = useInfoToast();
  const inventory = useAppSelector((state) => state.user.inventory);
  const guarantees = useAppSelector((state) => state.user.guarantees);
  const guaranteesRef = useRef(guarantees);

  const [newGrade, setNewGrade] = useState<POTENTIAL_GRADE>();
  const [newOptions, setNewOptions] = useState<PotentialResponse[]>([]);
  const newOptionsRef = useRef(newOptions);
  const [conditionGrid, setConditionGrid] = useState<PotentialCondition[][]>(
    []
  );
  const [intervalId, setIntervalId] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const item = inventory[inventoryIndex].after;
  const addi = isAddi(materialType);
  const selectable = isSelectable(materialType);
  const options = getOptions(item, addi);
  const optionsRef = useRef(options);

  const level = item.item_base_option.base_equipment_level;
  const grade = parseGrade(
    addi ? item.additional_potential_option_grade : item.potential_option_grade
  );
  const gradeRef = useRef(grade);
  const costMaterials = calcRollingMaterials(materialType, level, addi, grade);
  const costMaterialsRef = useRef(costMaterials);

  const { data, isFetching } = usePotentialQuery({
    type: MATERIAL_INFOS[materialType].type,
    part: item.item_equipment_part,
    level,
  });

  useEffect(
    () => () => clearInterval(intervalId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);
  useEffect(() => {
    newOptionsRef.current = newOptions;
  }, [newOptions]);
  useEffect(() => {
    gradeRef.current = grade;
  }, [grade]);
  useEffect(() => {
    guaranteesRef.current = guarantees;
  }, [guarantees]);
  useEffect(() => {
    costMaterialsRef.current = costMaterials;
  }, [costMaterials]);

  useEffect(() => {
    clearNewOptions();
    setConditionGrid([]);
    if (intervalId) {
      setIntervalId(undefined);
      clearInterval(intervalId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryIndex, materialType]);

  const clearNewOptions = () => {
    setNewGrade(undefined);
    setNewOptions([]);
  };
  const applyOptions = (
    options: PotentialResponse[],
    grade?: POTENTIAL_GRADE
  ) => {
    dispatch(
      setInventoryPotential({
        index: inventoryIndex,
        addi,
        grade: grade ? POTENTIAL_INFOS[grade].name : "",
        options: formatOptions(options),
      })
    );
    clearNewOptions();
  };
  const rollPotential = () => {
    if (!data) {
      toastWarning({
        title: "해당 아이템에 대한 잠재능력 정보가 없습니다.",
      });
      return;
    }

    const grade = gradeRef.current;
    const costMaterials = costMaterialsRef.current;
    const options = selectable
      ? newOptionsRef.current.map((option) =>
          option.name.replace("n", option.value.toString())
        )
      : optionsRef.current;
    const guarantee =
      grade && guaranteesRef.current[materialType]
        ? guaranteesRef.current[materialType][grade] ?? 0
        : 0;
    const newPotential = nextPotential(
      data,
      options,
      materialType,
      grade,
      guarantee
    );

    if (grade && POTENTIAL_CRITERIA[materialType]) {
      const bound = POTENTIAL_CRITERIA[materialType][grade].bound;
      if (bound > 0) {
        dispatch(
          setGuarantee({
            type: materialType,
            grade,
            value: newPotential.grade == grade ? guarantee + 1 : 0,
          })
        );
      }
    }
    dispatch(addMaterials({ index: inventoryIndex, materials: costMaterials }));

    return newPotential;
  };
  const rollAndApplyPotential = () => {
    const newPotential = rollPotential();
    if (!newPotential) return;

    if (selectable) {
      setNewGrade(newPotential.grade);
      setNewOptions(newPotential.options);
      return newPotential;
    }

    applyOptions(newPotential.options, newPotential.grade);
    return newPotential;
  };
  const onExecuteButtonClick = () => {
    if (conditionGrid.length) {
      if (!data) {
        toastWarning({
          title: "해당 아이템에 대한 잠재능력 정보가 없습니다.",
        });
        return;
      }

      if (intervalId) {
        toastInfo({ title: "자동 재설정 중지" });
        setIntervalId(undefined);
        clearInterval(intervalId);
        return;
      }

      const startIntervalId = setInterval(() => {
        const newPotential = rollAndApplyPotential();
        if (!newPotential) return;

        if (isFitConditions(conditionGrid, newPotential.options)) {
          toastSuccess({ title: "자동 재설정 성공" });
          setIntervalId(undefined);
          clearInterval(startIntervalId);
          return;
        }

        if (gradeRef.current != newPotential.grade)
          applyOptions(newPotential.options, newPotential.grade);
      }, AUTO_DELAY);
      setIntervalId(startIntervalId);
      toastInfo({ title: "자동 재설정 시작" });
      return;
    }

    rollAndApplyPotential();
  };

  return (
    <Stack width={{ base: "100%", md: 60 }}>
      <Tag as={Flex} px={2} py={1} gap={2}>
        <Image src={MATERIAL_INFOS[materialType].icon} />
        <Text size="xs">
          아이템의 <b>잠재능력을</b> 재설정합니다.
        </Text>
      </Tag>
      <ItemSlot image={item?.item_icon} />

      <OptionsButton
        title={selectable ? "BEFORE" : "RESULT"}
        grade={grade}
        options={options}
        borderColor={grade ? POTENTIAL_INFOS[grade].borderColor : ""}
        maxOptionCount={MAX_POTENTIALS}
        isDisabled={!options[0]}
        onClick={selectable ? clearNewOptions : undefined}
      />
      {selectable && (
        <OptionsButton
          title="AFTER"
          grade={newGrade}
          options={formatOptions(newOptions)}
          isDisabled={!newOptions[0]}
          borderColor={grade ? POTENTIAL_INFOS[grade].borderColor : ""}
          maxOptionCount={MAX_POTENTIALS}
          onClick={
            selectable ? () => applyOptions(newOptions, newGrade) : undefined
          }
        />
      )}
      <Flex
        justifyContent="space-between"
        align="center"
        bgColor={dark ? "gray.900" : "gray.50"}
        px={2}
        borderRadius={8}
      >
        <Image src={MESO} />
        <Text fontSize={12}>
          {formatNumber(
            costMaterials.find(({ name }) => name.startsWith("메소"))?.value ??
              0
          )}
          &nbsp;메소
        </Text>
      </Flex>
      <Flex gap={2}>
        <Button
          size="xs"
          colorScheme={conditionGrid.length ? "blue" : undefined}
          onClick={onOpen}
        >
          자동설정
        </Button>
        <Button
          flex={1}
          size="xs"
          isDisabled={!item || (selectable && newGrade && grade != newGrade)}
          isLoading={isFetching}
          loadingText="데이터 요청중"
          colorScheme={intervalId ? "red" : undefined}
          leftIcon={
            !conditionGrid.length ? undefined : intervalId ? (
              <FaStop />
            ) : (
              <FaPlay />
            )
          }
          onClick={onExecuteButtonClick}
        >
          {!conditionGrid.length
            ? "재설정하기"
            : intervalId
            ? "재설정 중지"
            : "재설정 시작"}
        </Button>
      </Flex>
      {conditionGrid.map((conditions, i) => (
        <Flex key={"conditions-" + i} gap={2}>
          <Badge size="xs" colorScheme="blue">
            {i + 1}
          </Badge>
          <Flex gap={2} wrap="wrap">
            {conditions.map((condition, j) => (
              <Tag
                key={"condition-" + j}
                size="xs"
                px={1}
                py={0.5}
                fontSize="var(--chakra-fontSizes-xs)"
              >
                {condition.name.replace("n", condition.value.toString())}
              </Tag>
            ))}
          </Flex>
        </Flex>
      ))}
      <AutoModal
        isOpen={isOpen}
        onClose={onClose}
        grade={grade ?? POTENTIAL_GRADE.RARE}
        potentialInfos={data ?? []}
        conditionGrid={conditionGrid}
        setConditionGrid={setConditionGrid}
      />
    </Stack>
  );
}
