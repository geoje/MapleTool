import {
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  MATERIAL_INFOS,
  MATERIAL_TYPE,
} from "../../../../constants/enhance/material";
import { useAppDispatch, useAppSelector } from "../../../../stores/hooks";
import OptionsButton from "./optionButton";
import { useEffect, useState } from "react";
import {
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
} from "../../../../services/potential";
import {
  addMaterials,
  setGuarantee,
  setInventoryPotential,
} from "../../../../stores/userSlice";
import { formatNumber } from "../../../../utils/formatter";
import MESO from "../../../../assets/item/meso/coin.png";
import { usePotentialQuery } from "../../../../stores/characterApi";
import { useWarningToast } from "../../../../hooks/useToast";
import PotentialResponse from "../../../../types/character/itemEquipment/potential/potentialResponse";

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
  const inventory = useAppSelector((state) => state.user.inventory);
  const guarantees = useAppSelector((state) => state.user.guarantees);

  const [newGrade, setNewGrade] = useState<POTENTIAL_GRADE>();
  const [newOptions, setNewOptions] = useState<PotentialResponse[]>([]);

  const item = inventory[inventoryIndex].after;
  const addi = isAddi(materialType);
  const selectable = isSelectable(materialType);
  const options = getOptions(item, addi);

  const level = item.item_base_option.base_equipment_level;
  const grade = parseGrade(
    addi ? item.additional_potential_option_grade : item.potential_option_grade
  );
  const costMaterials = calcRollingMaterials(materialType, level, addi, grade);

  const { data, isFetching } = usePotentialQuery({
    type: MATERIAL_INFOS[materialType].type,
    part: item.item_equipment_part,
    level,
  });

  useEffect(() => {
    clearNewOptions();
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

    const guarantee =
      grade && guarantees[materialType]
        ? guarantees[materialType][grade] ?? 0
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

  return (
    <Stack width={{ base: "100%", md: 60 }}>
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
          <Image src={item?.item_icon} />
        </Flex>
      </Flex>

      <OptionsButton
        title={selectable ? "BEFORE" : "RESULT"}
        grade={grade}
        options={options}
        isDisabled={!options[0]}
        onClick={selectable ? clearNewOptions : undefined}
      />
      {selectable && (
        <OptionsButton
          title="AFTER"
          grade={newGrade}
          options={formatOptions(newOptions)}
          isDisabled={!newOptions[0]}
          onClick={
            selectable ? () => applyOptions(newOptions, newGrade) : undefined
          }
        />
      )}
      <Flex
        justifyContent="space-between"
        align="center"
        bgColor={dark ? "gray.800" : "gray.50"}
        px={1}
        borderRadius={8}
      >
        <Image src={MESO} />
        <Text fontSize={12}>
          {formatNumber(
            costMaterials.find(({ name }) => name == "메소")?.value ?? 0
          )}{" "}
          메소
        </Text>
      </Flex>
      <Flex gap={2}>
        <Button
          flex={1}
          size="xs"
          isDisabled={!item || (selectable && newGrade && grade != newGrade)}
          isLoading={isFetching}
          loadingText="데이터 요청중"
          onClick={() => {
            const newPotential = rollPotential();
            if (!newPotential) return;

            if (selectable) {
              setNewGrade(newPotential.grade);
              setNewOptions(newPotential.options);
              return;
            }

            applyOptions(newPotential.options, newPotential.grade);
          }}
        >
          재설정
        </Button>
      </Flex>
    </Stack>
  );
}
