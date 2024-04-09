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
} from "@chakra-ui/react";
import { useAppSelector } from "../../reducer/hooks";
import { useDispatch } from "react-redux";
import {
  addUserSpent,
  setUserGuarantee,
  setUserInventoryPotentials,
} from "../../reducer/userSlice";
import { useEffect, useState } from "react";
import {
  BORDER_COLOR,
  KOR_NAME,
} from "../../service/character/itemEquipment/potentialConst";
import PotentialService from "../../service/character/itemEquipment/potential";

export default function ResetPotential({
  type,
  itemIndex,
}: {
  type: "normal" | "additional";
  itemIndex: number;
}) {
  const dispatch = useDispatch();
  const inventory = useAppSelector((state) => state.user.inventory);
  const guarantee = useAppSelector((state) => state.user.guarantee);
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const item = inventory[itemIndex];
  const grade = item
    ? type == "normal"
      ? item?.potential_option_grade
      : type == "additional"
      ? item?.additional_potential_option_grade
      : ""
    : "";
  const options = item
    ? type == "normal"
      ? [
          item?.potential_option_1,
          item?.potential_option_2,
          item?.potential_option_3,
        ]
      : type == "additional"
      ? [
          item?.additional_potential_option_1,
          item?.additional_potential_option_2,
          item?.additional_potential_option_3,
        ]
      : []
    : [];
  const cost = item
    ? type == "normal"
      ? PotentialService.getResetCost(
          item.item_base_option.base_equipment_level,
          KOR_NAME.indexOf(item.potential_option_grade)
        )
      : type == "additional"
      ? PotentialService.getAdditionalResetCost(
          item.item_base_option.base_equipment_level,
          KOR_NAME.indexOf(item.additional_potential_option_grade)
        )
      : 0
    : 0;

  const [newGrade, setNewGrade] = useState("");
  const [newOptions, setNewOptions] = useState<string[]>([]);

  useEffect(() => {
    setNewGrade("");
    setNewOptions([]);
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
        isDisabled={!options.length}
        onClick={() => {
          if (!options.length) return;
          dispatch(
            setUserInventoryPotentials({
              index: itemIndex,
              grade: grade,
              values: options,
            })
          );
          setNewGrade("");
          setNewOptions([]);
        }}
      />
      <OptionsButton
        title="AFTER"
        grade={newGrade}
        options={newOptions}
        isDisabled={!newOptions.length}
        onClick={() => {
          if (!options.length) return;
          dispatch(
            setUserInventoryPotentials({
              index: itemIndex,
              grade: newGrade,
              values: newOptions,
            })
          );
          setNewGrade("");
          setNewOptions([]);
        }}
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
          dispatch(addUserSpent(cost));
          if (type == "normal") {
            // Next grade
            const index = KOR_NAME.indexOf(item.potential_option_grade);
            const nextGrade = PotentialService.pickNextGrade(
              item.potential_option_grade,
              guarantee[0][index]
            );

            // Set guarantee
            if (item.potential_option_grade == nextGrade)
              dispatch(
                setUserGuarantee({
                  value: guarantee[0][index] + 1,
                  i: 0,
                  j: index,
                })
              );
            else dispatch(setUserGuarantee({ value: 0, i: 0, j: index }));

            // Next potentials
            PotentialService.pickRandomPotentials(
              item.item_equipment_part,
              nextGrade,
              item.item_base_option.base_equipment_level
            ).then((potentials) => {
              setNewGrade(nextGrade);
              setNewOptions(
                potentials.map((p) => p.name.replace("n", p.value.toString()))
              );
            });
          } else if (type == "additional") {
            // Next grade
            const index = KOR_NAME.indexOf(
              item.additional_potential_option_grade
            );
            const nextGrade = PotentialService.pickNextAdditionalGrade(
              item.additional_potential_option_grade,
              guarantee[1][index]
            );

            // Next potentials
            PotentialService.pickRandomAdditionalPotentials(
              item.item_equipment_part,
              item.additional_potential_option_grade,
              item.item_base_option.base_equipment_level
            ).then((potentials) => {
              setNewGrade(nextGrade);
              setNewOptions(
                potentials.map((p) => p.name.replace("n", p.value.toString()))
              );
            });
          }
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
      display={options.length ? "block" : "none"}
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
