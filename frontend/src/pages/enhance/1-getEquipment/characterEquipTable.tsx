import { SimpleGrid } from "@chakra-ui/react";
import { useItemEquipmentQuery } from "../../../stores/characterApi";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getCharacterEquipmentGrid } from "../../../utils/equipment";
import SlotButton from "../common/slotButton";
import { SLOT_GRID } from "../../../constants/enhance/equipment";
import { newInventory } from "../../../stores/userSlice";

export default function CharacterEquipTable({ preset }: { preset: number }) {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.name);
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
