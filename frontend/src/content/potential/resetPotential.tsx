import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
  useColorMode,
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
import {
  ADDITIONAL_GUARANTEE_BOUND,
  BORDER_COLOR,
  GUARANTEE_BOUND,
  KOR_NAME,
} from "../../service/character/itemEquipment/potentialConst";
import PotentialService from "../../service/character/itemEquipment/potential";

const DEFAULT_OPTIONS = ["", "", ""];

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
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const item = itemIndex == -1 ? null : inventory[itemIndex];
  const potentialTitle = type == "normal" ? "잠재능력" : "에디셔널 잠재능력";
  const grade =
    type == "normal"
      ? item?.potential_option_grade ?? ""
      : item?.additional_potential_option_grade ?? "";
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
      guarantee[guaranteeIndex][gradeIndex]
    );
  const pickRandomPotentials = (grade: string) =>
    (type == "normal"
      ? PotentialService.pickRandomPotentials
      : PotentialService.pickRandomAdditionalPotentials)(
      item?.item_equipment_part ?? "",
      grade,
      item?.item_base_option.base_equipment_level ?? -1
    );
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

  const [newGrade, setNewGrade] = useState("");
  const [newOptions, setNewOptions] = useState<string[]>(DEFAULT_OPTIONS);

  useEffect(() => {
    setNewGrade("");
    setNewOptions(DEFAULT_OPTIONS);
  }, [item]);

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
      <Button
        size="xs"
        isDisabled={!item || (newGrade != "" && grade != newGrade)}
        onClick={() => {
          if (!item) return;

          // Add spent
          dispatch(addUserSpent(cost));

          // Next grade
          const nextGrade = pickNextGrade();

          // Set guarantee
          const currentGuarantee = guarantee[guaranteeIndex][gradeIndex];
          if (grade == nextGrade) {
            dispatch(
              setUserGuarantee({
                value: currentGuarantee + 1,
                i: guaranteeIndex,
                j: gradeIndex,
              })
            );
          } else {
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
                const rate = Math.round(
                  (currentGuarantee / guaranteeBound) * 100
                );
                toast({
                  colorScheme: "blue",
                  title: `${potentialTitle} 등급업 - ${nextGrade}`,
                  description:
                    gradeIndex == -1
                      ? `노멀 아이템에 ${potentialTitle}을 부여합니다.`
                      : `상승 보장: ${currentGuarantee} / ${guaranteeBound} (${rate}%)`,
                });
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
        }}
      >
        재설정하기
      </Button>
    </Stack>
  );
}

function OptionsButton({
  title,
  grade,
  options,
  isDisabled,
  onClick,
}: {
  title: string;
  grade: string;
  options: string[];
  isDisabled: boolean;
  onClick: () => void;
}) {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const potentialIndex = KOR_NAME.indexOf(grade);

  return (
    <Tooltip
      display={isDisabled ? "none" : undefined}
      fontSize="xs"
      label={options.map((option, i) => (
        <Text key={"option-" + i}>{option}</Text>
      ))}
    >
      <Button
        h="auto"
        p={1}
        flexDir="column"
        alignItems="stretch"
        textAlign="start"
        borderWidth={1}
        borderColor={
          potentialIndex == -1 ? undefined : BORDER_COLOR[potentialIndex]
        }
        isDisabled={isDisabled}
        onClick={onClick}
      >
        <Flex justify="space-between" mb={1}>
          <Heading pl={1} fontSize={12}>
            {title}
          </Heading>
          <Badge
            px={1}
            variant="solid"
            colorScheme={isDisabled ? "gray" : "orange"}
            borderRadius={4}
          >
            선택
          </Badge>
        </Flex>
        <Stack
          pb={1}
          gap={0}
          borderRadius={4}
          backgroundColor={dark ? "gray.800" : "gray.300"}
        >
          <Flex
            h={4}
            mb={1}
            gap={1}
            justify="center"
            align="center"
            borderTopRadius={4}
            backgroundColor={dark ? "gray.700" : "gray.400"}
          >
            {potentialIndex != -1 && (
              <Image
                src={PotentialService.getPotentialIconUrl(potentialIndex)}
                style={{ imageRendering: "pixelated" }}
              />
            )}
            <Text fontSize={12}>{grade}</Text>
          </Flex>
          <OptionText text={options[0]} />
          <OptionText text={options[1]} />
          <OptionText text={options[2]} />
        </Stack>
      </Button>
    </Tooltip>
  );
}

function OptionText({ text }: { text: string }) {
  return (
    <Text h={4} px={2} fontSize={12} overflow="hidden" textOverflow="ellipsis">
      {text}
    </Text>
  );
}
