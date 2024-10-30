import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useItemEquipmentQuery } from "../../../stores/characterApi";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getCharacterEquipmentGrid } from "../../../services/equipment";
import SlotButton from "../common/slotButton";
import { SLOT_GRID } from "../../../constants/enhance/equipment";
import { newInventory } from "../../../stores/userSlice";

export default function CharacterEquipTable({ preset }: { preset: number }) {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.name);

  if (!name) {
    return (
      <Flex justify="center" pt="1px">
        <Text size="md" textAlign="center" opacity={0.6}>
          캐릭터를 등록하거나 <br />
          기본 장비를 이용해주세요.
        </Text>
      </Flex>
    );
  }

  const { data } = useItemEquipmentQuery(name, { skip: !name });

  const defaultItemGrid = getCharacterEquipmentGrid(1, data);
  const presetItemGrid = getCharacterEquipmentGrid(preset, data);

  return (
    <SimpleGrid columns={5} px={1} gap={1}>
      {presetItemGrid.flatMap((row, i) =>
        row.flatMap((item, j) =>
          SLOT_GRID[i][j] ? (
            <SlotButton
              key={`item-${i}-${j}`}
              item={item}
              transparent={
                preset != 1 &&
                JSON.stringify(item) == JSON.stringify(defaultItemGrid[i][j])
              }
              onClick={item ? () => dispatch(newInventory(item)) : undefined}
            />
          ) : (
            <div key={`item-${i}-${j}`} />
          )
        )
      )}
    </SimpleGrid>
  );
}
