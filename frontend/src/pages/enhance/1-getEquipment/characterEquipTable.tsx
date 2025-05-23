import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useItemEquipmentQuery } from "../../../stores/characterApi";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getCharacterEquipmentGrid } from "../../../services/enhance/equipment";
import SlotButton from "../common/slotButton";
import { SLOT_GRID } from "../../../constants/enhance/equipment";
import { newInventory } from "../../../stores/userSlice";
import RequiredText from "../../../components/content/requiredText";

export default function CharacterEquipTable({
  preset,
  onItemClick,
}: {
  preset: number;
  onItemClick: () => void;
}) {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.user.name);
  const { data } = useItemEquipmentQuery(name, { skip: !name });

  if (!name) {
    return (
      <Flex justify="center" pt="1px">
        <RequiredText>
          캐릭터를 등록하거나 <br />
          기본 장비를 이용해주세요.
        </RequiredText>
      </Flex>
    );
  }

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
              onClick={
                item
                  ? () => {
                      dispatch(newInventory(item));
                      onItemClick();
                    }
                  : undefined
              }
            />
          ) : (
            <div key={`item-${i}-${j}`} />
          )
        )
      )}
    </SimpleGrid>
  );
}
