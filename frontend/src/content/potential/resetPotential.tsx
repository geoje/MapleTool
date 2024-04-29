import {
  Badge,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAppSelector } from "../../reducer/hooks";
import { useDispatch } from "react-redux";
import {
  addUserSpent,
  setUserGuarantee,
  setUserInventoryAdditionalPotentials,
  setUserInventoryPotentials,
} from "../../reducer/userSlice";
import { useEffect, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import {
  ADDITIONAL_GUARANTEE_BOUND,
  GUARANTEE_BOUND,
  KOR_NAME,
} from "../../service/character/itemEquipment/potentialConst";
import PotentialService from "../../service/character/itemEquipment/potential";
import OptionsButton from "./reset/optionsButton";
import TriggerModal from "./reset/triggerModal";
import PotentialSummantion from "../../dto/character/itemEquipment/potentialSummation";

const DEFAULT_OPTIONS = ["", "", ""];
const RESET_DELAY = 100;

export default function ResetPotential({
  type,
  itemIndex,
}: {
  type: "normal" | "additional";
  itemIndex: number;
}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const inventory = useAppSelector((state) => state.user.inventory);
  const guarantee = useAppSelector((state) => state.user.guarantee);
  const guaranteeCopy: number[][] = JSON.parse(JSON.stringify(guarantee));

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const item = itemIndex == -1 ? null : inventory[itemIndex];
  const potentialTitle = type == "normal" ? "잠재능력" : "에디셔널 잠재능력";
  const part = item?.item_equipment_part ?? "";
  const grade =
    type == "normal"
      ? item?.potential_option_grade ?? ""
      : item?.additional_potential_option_grade ?? "";
  const level = item?.item_base_option.base_equipment_level ?? 0;
  const gradeIndex = KOR_NAME.indexOf(grade);
  const guaranteeIndex = type == "normal" ? 0 : 1;
  const guaranteeBound =
    type == "normal"
      ? GUARANTEE_BOUND[gradeIndex]
      : ADDITIONAL_GUARANTEE_BOUND[gradeIndex];
  const options =
    type == "normal"
      ? [
          item?.potential_option_1 ?? "",
          item?.potential_option_2 ?? "",
          item?.potential_option_3 ?? "",
        ]
      : [
          item?.additional_potential_option_1 ?? "",
          item?.additional_potential_option_2 ?? "",
          item?.additional_potential_option_3 ?? "",
        ];
  const cost =
    type == "normal"
      ? PotentialService.getResetCost(
          item?.item_base_option.base_equipment_level,
          gradeIndex
        )
      : PotentialService.getAdditionalResetCost(
          item?.item_base_option.base_equipment_level,
          gradeIndex
        );
  const pickNextGrade = () =>
    (type == "normal"
      ? PotentialService.pickNextGrade
      : PotentialService.pickNextAdditionalGrade)(
      grade,
      guaranteeCopy[guaranteeIndex][gradeIndex]
    );
  const pickRandomPotentials = (grade: string) =>
    (type == "normal"
      ? PotentialService.pickRandomPotentials
      : PotentialService.pickRandomAdditionalPotentials)(
      item?.item_equipment_part ?? "",
      grade,
      item?.item_base_option.base_equipment_level ?? -1
    );
  const getSummantions = (part: string, grade: string, level: number) =>
    (type == "normal"
      ? PotentialService.getSummantions
      : PotentialService.getAdditionalSummantions)(part, grade, level);
  const onOptionsButtonClick = (grade: string, options: string[]) => {
    dispatch(
      (type == "normal"
        ? setUserInventoryPotentials
        : setUserInventoryAdditionalPotentials)({
        index: itemIndex,
        grade,
        values: options,
      })
    );
    setNewGrade("");
    setNewOptions(DEFAULT_OPTIONS);
  };
  const resetNormally = (intervalId?: NodeJS.Timeout) => {
    if (!item) return;

    // Add spent
    dispatch(addUserSpent(cost));

    // Next grade
    const nextGrade = pickNextGrade();

    // Set guarantee
    const currentGuarantee = guaranteeCopy[guaranteeIndex][gradeIndex];
    if (grade == nextGrade) {
      guaranteeCopy[guaranteeIndex][gradeIndex] += 1;
      dispatch(
        setUserGuarantee({
          value: currentGuarantee + 1,
          i: guaranteeIndex,
          j: gradeIndex,
        })
      );
    } else {
      guaranteeCopy[guaranteeIndex][gradeIndex] = 0;
      dispatch(
        setUserGuarantee({ value: 0, i: guaranteeIndex, j: gradeIndex })
      );
    }

    // Next potentials
    pickRandomPotentials(nextGrade)
      .then((potentials) => {
        setNewGrade(nextGrade);
        setNewOptions(
          potentials.map((p) => p.name.replace("n", p.value.toString()))
        );
        if (grade != nextGrade) {
          const rate = Math.round((currentGuarantee / guaranteeBound) * 100);
          toast({
            colorScheme: "blue",
            title: `${potentialTitle} 등급업 - ${nextGrade}`,
            description:
              gradeIndex == -1
                ? `노멀 아이템에 ${potentialTitle}을 부여합니다.`
                : `상승 보장: ${currentGuarantee} / ${guaranteeBound} (${rate}%)`,
            isClosable: true,
          });

          // Stop trigger if upgraded
          if (intervalId) {
            clearInterval(intervalId);
            setPlayIntervalId(undefined);
          }
          return;
        }

        // Stop if trigged
        // TODO: 올스텟 +n% 도 각 스텟 +n% 에 포함 시키기
        const newSummantions =
          PotentialService.convertProbabilitiesToSummantions(potentials);
        if (
          conditionGrid.some((conditions) =>
            conditions.every((c) =>
              newSummantions.some((s) => s.name == c.name && s.value >= c.value)
            )
          )
        ) {
          toast({
            colorScheme: "green",
            title: `${potentialTitle} 재설정 완료`,
            description: "트리거로 지정한 옵션 중 하나가 등장하였습니다.",
            isClosable: true,
          });

          if (intervalId) {
            clearInterval(intervalId);
            setPlayIntervalId(undefined);
          }
        }
      })
      .catch((reason) => {
        toast({
          position: "top-right",
          status: "warning",
          title: `${potentialTitle} 데이터 요청 실패 (${reason.message})`,
          description: Object(reason.response?.data).message,
          isClosable: true,
        });
      });
  };

  const resetUntilTrigged = () => {
    if (playIntervalId) {
      toast({
        colorScheme: "blue",
        title: `${potentialTitle} 재설정 중지`,
        isClosable: true,
      });

      if (playIntervalId) {
        clearInterval(playIntervalId);
      }
      setPlayIntervalId(undefined);
      return;
    }

    toast({
      colorScheme: "blue",
      title: `${potentialTitle} 재설정 시작`,
      description:
        "트리거로 지정한 옵션 중 하나가 나올 때 까지 자동으로 재설정을 합니다.",
      isClosable: true,
    });

    const intervalId = setInterval(() => {
      resetNormally(intervalId);
    }, RESET_DELAY);
    setPlayIntervalId(intervalId);
  };

  const [newGrade, setNewGrade] = useState("");
  const [newOptions, setNewOptions] = useState<string[]>(DEFAULT_OPTIONS);
  const [conditionGrid, setConditionGrid] = useState<PotentialSummantion[][]>(
    []
  );
  const [playIntervalId, setPlayIntervalId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    setNewGrade("");
    setNewOptions(DEFAULT_OPTIONS);
    setConditionGrid([]);
  }, [item]);

  useEffect(() => {
    if (!conditionGrid.length) {
      if (playIntervalId) {
        clearInterval(playIntervalId);
      }
      setPlayIntervalId(undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionGrid]);

  return (
    <Stack width={["100%", "100%", 60]}>
      <Flex
        p={4}
        bgColor={dark ? "gray.800" : "gray.50"}
        borderRadius={8}
        justify="center"
        align="center"
      >
        <Flex
          w={12}
          h={12}
          justify="center"
          align="center"
          backgroundColor={dark ? "gray.700" : "gray.200"}
          borderWidth={1}
          borderColor={dark ? "gray.400" : "gray.600"}
          borderStyle="dashed"
        >
          <Image
            src={item?.item_icon}
            style={{ imageRendering: "pixelated" }}
          />
        </Flex>
      </Flex>
      <OptionsButton
        title="BEFORE"
        grade={grade}
        options={options}
        isDisabled={!options[0]}
        onClick={() => onOptionsButtonClick(grade, options)}
      />
      <OptionsButton
        title="AFTER"
        grade={newGrade}
        options={newOptions}
        isDisabled={!newOptions[0]}
        onClick={() => onOptionsButtonClick(newGrade, newOptions)}
      />
      <Flex
        justifyContent="space-between"
        align="center"
        bgColor={dark ? "gray.800" : "gray.50"}
        px={1}
        borderRadius={8}
      >
        <Image
          src="/item-equipment/meso.png"
          style={{ imageRendering: "pixelated" }}
        />
        <Text fontSize={12}>
          {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 메소
        </Text>
      </Flex>
      <Flex gap={2}>
        <Button
          size="xs"
          colorScheme={conditionGrid.length > 0 ? "blue" : undefined}
          onClick={onOpen}
        >
          트리거
        </Button>
        <Button
          flex={1}
          size="xs"
          leftIcon={
            conditionGrid.length > 0 ? (
              playIntervalId ? (
                <FaStop />
              ) : (
                <FaPlay />
              )
            ) : undefined
          }
          colorScheme={
            conditionGrid.length > 0 && playIntervalId ? "red" : undefined
          }
          isDisabled={!item || (newGrade != "" && grade != newGrade)}
          onClick={
            conditionGrid.length > 0
              ? resetUntilTrigged
              : () => {
                  resetNormally();
                }
          }
        >
          {conditionGrid.length > 0
            ? playIntervalId
              ? "재설정 중지"
              : "재설정 시작"
            : "재설정하기"}
        </Button>
      </Flex>
      {conditionGrid.map((conditions, i) => (
        <Flex key={"conditions-" + i} gap={2}>
          <Badge colorScheme="blue">{i + 1}</Badge>
          <Flex gap={2} wrap="wrap">
            {conditions.map((condition, j) => (
              <Badge key={"condition-" + j}>
                {condition.name.replace("n", condition.value.toString())}
              </Badge>
            ))}
          </Flex>
        </Flex>
      ))}
      <TriggerModal
        isOpen={isOpen}
        onClose={onClose}
        title={potentialTitle}
        getSummantions={getSummantions}
        setConditions={setConditionGrid}
        part={part}
        grade={grade}
        level={level}
      />
    </Stack>
  );
}
