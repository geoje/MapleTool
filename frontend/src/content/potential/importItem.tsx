import { Grid, GridItem } from "@chakra-ui/react";
import { CharacterItemEquipment } from "../../domain/character/characterItemEquipment";
import ItemEquipmentService from "../../service/character/itemEquipment/itemEquipment";
import ItemButton from "./import/itemButton";
import { useAppDispatch } from "../../reducer/hooks";
import { pushUserInventory } from "../../reducer/userSlice";

export default function ImportItem({
  characterItemEquipment,
  preset,
}: {
  characterItemEquipment?: CharacterItemEquipment;
  preset: number;
}) {
  const dispatch = useAppDispatch();

  if (!characterItemEquipment) return <></>;

  const defaultItemGrid = ItemEquipmentService.itemGrid(
    characterItemEquipment,
    0
  );

  const presetItemGrid = ItemEquipmentService.itemGrid(
    characterItemEquipment,
    preset
  );

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={1}>
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
                  onClick={() => dispatch(pushUserInventory(item))}
                />
              )}
            </GridItem>
          );
        })
      )}
    </Grid>
  );
}
