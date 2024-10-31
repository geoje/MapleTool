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
import { useState } from "react";
import {
  POTENTIAL_GRADE,
  POTENTIAL_INFOS,
} from "../../../../constants/enhance/potential";
import {
  calcRollingMaterials,
  getOptions,
  isAddi,
  isSelectable,
  nextOptions,
  parseGrade,
} from "../../../../services/potential";
import { setInventoryPotential } from "../../../../stores/userSlice";
import { formatNumber } from "../../../../utils/formatter";
import MESO from "../../../../assets/item/meso.png";
import { usePotentialQuery } from "../../../../stores/characterApi";

export default function Potential({
  inventoryIndex,
  materialType,
}: {
  inventoryIndex: number;
  materialType: MATERIAL_TYPE;
}) {
  const dispatch = useAppDispatch();
  const dark = useColorMode().colorMode == "dark";
  const inventory = useAppSelector((state) => state.user.inventory);
  const guarantee = useAppSelector((state) => state.user.guarantee);

  const [newGrade, setNewGrade] = useState<POTENTIAL_GRADE>();
  const [newOptions, setNewOptions] = useState<string[]>(["", "", ""]);

  const item = inventory[inventoryIndex].after;
  const addi = isAddi(materialType);
  const selectable = isSelectable(materialType);
  const options = getOptions(item, addi);
  const level = item.item_base_option.base_equipment_level;
  const grade = parseGrade(
    addi ? item.potential_option_grade : item.additional_potential_option_grade
  );
  const costMaterials = calcRollingMaterials(materialType, level, addi, grade);

  const { data } = usePotentialQuery(
    {
      type: MATERIAL_INFOS[materialType].type,
      grade: POTENTIAL_INFOS[grade ?? POTENTIAL_GRADE.RARE].name,
      part: item.item_equipment_part,
      level,
    },
    {
      skip: !item,
      refetchOnMountOrArgChange: true,
    }
  );

  const clearNewOptions = () => {
    setNewGrade(undefined);
    setNewOptions(["", "", ""]);
  };
  const applyOptions = () => {
    dispatch(
      setInventoryPotential({
        index: inventoryIndex,
        addi,
        options: newOptions,
      })
    );
    clearNewOptions();
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
      {selectable && (
        <OptionsButton
          title={selectable ? "BEFORE" : "RESULT"}
          grade={grade}
          options={options}
          isDisabled={!options[0]}
          onClick={selectable ? clearNewOptions : undefined}
        />
      )}
      <OptionsButton
        title="AFTER"
        grade={newGrade}
        options={newOptions}
        isDisabled={!newOptions[0]}
        onClick={applyOptions}
      />
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
          isDisabled={!item || (newGrade && grade != newGrade)}
          onClick={
            data
              ? () =>
                  dispatch(
                    setInventoryPotential({
                      addi,
                      index: inventoryIndex,
                      options: nextOptions(options, data),
                    })
                  )
              : undefined
          }
        >
          재설정
        </Button>
      </Flex>
    </Stack>
  );
}
