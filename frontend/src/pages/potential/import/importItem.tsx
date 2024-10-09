import { Button, Divider, Flex, Grid, GridItem, Stack } from "@chakra-ui/react";
import {
  ItemEquipment,
  ItemEquipmentDetail,
} from "../../../types/character/itemEquipment";
import ItemEquipmentService from "../../../service/character/itemEquipment/itemEquipment";
import ItemButton from "./itemButton";
import { useAppDispatch } from "../../../stores/hooks";
import { pushUserInventory } from "../../../stores/userSlice";
import { SLOT_GRID } from "../../../service/character/itemEquipment/itemEquipmentConst";
import { useEffect, useState } from "react";

export default function ImportItem({
  characterItemEquipment,
  preset,
}: {
  characterItemEquipment?: ItemEquipment;
  preset: number;
}) {
  const dispatch = useAppDispatch();
  const [, setItems] = useState<ItemEquipmentDetail[]>([]);

  useEffect(() => {
    setItems([]);
  }, [preset]);

  return (
    <Stack align="center" gap={4}>
      {characterItemEquipment ? (
        <ItemGrid
          characterItemEquipment={characterItemEquipment}
          preset={preset}
          onitemButtonClick={(item) => dispatch(pushUserInventory(item))}
        />
      ) : (
        <EmptyItemGrid />
      )}
      <Divider />
      <Flex gap={2}>
        <Button size="xs">카루타</Button>
        <Button size="xs">앱솔</Button>
        <Button size="xs">아케인</Button>
        <Button size="xs">에테</Button>
      </Flex>
    </Stack>
  );
}

function EmptyItemGrid() {
  return (
    <Grid templateColumns="repeat(5, 1fr)" px={1} gap={1}>
      {SLOT_GRID.flatMap((items, i) =>
        items.map((item, j) => (
          <GridItem key={"item-" + i + j}>{item && <ItemButton />}</GridItem>
        ))
      )}
    </Grid>
  );
}

function ItemGrid({
  characterItemEquipment,
  preset,
  onitemButtonClick,
}: {
  characterItemEquipment: ItemEquipment;
  preset: number;
  onitemButtonClick: (item: ItemEquipmentDetail) => void;
}) {
  const defaultItemGrid = ItemEquipmentService.itemGrid(
    characterItemEquipment,
    0
  );

  const presetItemGrid = ItemEquipmentService.itemGrid(
    characterItemEquipment,
    preset
  );

  return (
    <Grid templateColumns="repeat(5, 1fr)" px={1} gap={1}>
      {presetItemGrid.flatMap((items, i) =>
        items.flatMap((item, j) => {
          const appear =
            preset == 1 ||
            JSON.stringify(item) != JSON.stringify(defaultItemGrid[i][j]);
          return (
            <GridItem key={"item-" + i + j}>
              {item && (
                <ItemButton
                  item={item}
                  appear={appear}
                  onClick={() => onitemButtonClick(item)}
                />
              )}
            </GridItem>
          );
        })
      )}
    </Grid>
  );
}
